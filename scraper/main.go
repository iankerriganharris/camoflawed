package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gocolly/colly"
)

// Site represents a site we're downloading images from.
type Site struct {
	url    string   // The url of the site
	host   string   // The site's hostname
	images []string // The images found on the site
	folder string   // The output folder we download images to
}

var crawlers sync.WaitGroup
var downloaders sync.WaitGroup

// Crawl a site and add its images to the Sites.images array
func (Site *Site) Crawl() {
	defer crawlers.Done()

	fmt.Printf("Crawling: %s\n", Site.url)

	// Instantiate default collector
	c := colly.NewCollector(
		// AllowedDomains needs to be a hostname rather than absolute url
		colly.AllowedDomains(Site.host),
		colly.MaxDepth(5),
		// Turn on asynchronous requests
		colly.Async(true),
	)

	c.Limit(&colly.LimitRule{
		DomainGlob:  "*" + Site.host + "*",
		Parallelism: 2,
		Delay:       2 * time.Second,
	})

	// On every a element which has img attribute, append img src to images array
	c.OnHTML("img[src]", func(e *colly.HTMLElement) {
		link := e.Attr("src")

		if link != "" {
			Site.images = append(Site.images, link)
		}
	})

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		// Print link
		fmt.Printf("Link found: %q -> %s\n", e.Text, link)
		// Visit link found on page
		// Only those links are visited which are in AllowedDomains
		c.Visit(e.Request.AbsoluteURL(link))
		// c.Visit(link)
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	c.OnScraped(func(r *colly.Response) {
		fmt.Println("Scraped!")

		pool := len(Site.images) / 3
		if pool != 0 {
			if pool > 10 {
				pool = 10
			}
			l := 0
			counter := len(Site.images) / pool

			for i := counter; i < len(Site.images); i += counter {
				downloaders.Add(1)
				go Site.DownloadImg(Site.images[l:i])
				l = i
			}
		}

		downloaders.Wait()
	})

	// Start scraping images from Site.url
	c.Visit(Site.url)

	c.Wait()
}

// DownloadImg downloads all images from a site
func (Site *Site) DownloadImg(imgs []string) {
	defer downloaders.Done()

	type Image struct {
		OriginalURL string `json:"originalUrl"`
	}

	type Request struct {
		Images []Image
	}

	var uniqImgs []string
	m := map[string]bool{}

	for _, v := range imgs {
		if !m[v] {
			m[v] = true
			uniqImgs = append(uniqImgs, v)
		}
	}

	Site.images = uniqImgs

	var tmpImages []Image

	// images := make([]string, 0)

	for _, u := range Site.images {
		fmt.Printf("\n%s\n", u)
		if strings.Contains(u, "base64") {
			continue
		} else if u[0:2] == "//" {
			u = "http://" + u[2:len(u)]
		} else if u[:4] != "http" && u[:4] != "https" {
			u = "http://" + Site.host + u
		}
		fmt.Printf("\n%s\n", u)
		u, err := url.ParseRequestURI(u)
		if err != nil {
			continue
		}
		// parts := strings.Split(url, "/")
		// name := parts[len(parts)-1]
		// file, _ := os.Create(string(Site.folder + "/" + name))
		resp, err := http.Get(u.String())
		if err != nil {
			panic(err)
		} else if resp.StatusCode >= 200 && resp.StatusCode <= 299 {
			size, err := strconv.Atoi(resp.Header.Get("Content-Length"))
			if err != nil {
				continue
				// panic(err)
			} else {
				downloadSize := int64(size)
				if downloadSize > 5000 {
					image := Image{OriginalURL: u.String()}
					tmpImages = append(tmpImages, image)
				}
			}
		} else {
			fmt.Printf("Non-2xx HTTP Status for %s", u)
		}

		if len(tmpImages) > 0 {
			file, err := os.OpenFile(Site.folder+"/results.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
			checkError("couldn't open file", err)
			defer file.Close()

			writer := csv.NewWriter(file)
			defer writer.Flush()

			for _, value := range tmpImages {
				err := writer.Write([]string{value.OriginalURL})
				checkError("Cannot write to file", err)
			}

			req := Request{Images: tmpImages}
			bytesRepresentation, err := json.Marshal(req)
			if err != nil {
				panic(err)
			} else {
				fmt.Printf(string(bytesRepresentation))
				r, err := http.NewRequest("PATCH", "http://localhost:5000/companies/5", bytes.NewBuffer(bytesRepresentation))
				r.Header.Set("Content-Type", "application/json")
				if err != nil {
					panic(err)
				}
				client := &http.Client{}
				resp, err := client.Do(r)
				if err != nil {
					panic(err)
				}
				defer resp.Body.Close()
				fmt.Printf(resp.Status)
			}
		}

		// data := Request{Images: images}

		// io.Copy(file, resp.Body)
		// file.Close()
		// resp.Body.Close()
	}
}

func checkError(message string, err error) {
	if err != nil {
		log.Fatal(message, err)
	}
}

func MakeCrawler(name string) *Site {
	if name[:4] != "http" && name[:4] != "https" {
		name = "https://" + name
	}
	u, err := url.Parse(name)
	if err != nil {
		fmt.Printf("could not parse name - %s %v", name, err)
	}
	site := new(Site)
	site.folder = u.Host
	site.host = u.Host
	site.url = name
	return site
}

func main() {

	var seedUrls []string

	seedUrls = os.Args[1:]

	Sites := make([]*Site, len(seedUrls))

	// Crawl concurrently
	for i, name := range seedUrls {
		Sites[i] = MakeCrawler(name)
		crawlers.Add(1)
		go Sites[i].Crawl()
	}

	crawlers.Wait()

	fmt.Printf("\n\nScraped succesfully\n\n")
}
