package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"

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
		colly.MaxDepth(1),
	)

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
}

// DownloadImg downloads all images from a site
func (Site *Site) DownloadImg(images []string) {
	defer downloaders.Done()

	os.Mkdir(Site.folder, os.FileMode(0777))

	Site.images = SliceUniq(images)

	for _, url := range Site.images {
		fmt.Printf("\n%s\n", url)
		if url[0:2] == "//" {
			url = "http://" + url[2:len(url)]
		} else if url[:4] != "http" && url[:4] != "https" {
			url = "http://" + Site.host + url
		}
		fmt.Printf("\n%s\n", url)
		parts := strings.Split(url, "/")
		name := parts[len(parts)-1]
		file, _ := os.Create(string(Site.folder + "/" + name))
		resp, _ := http.Get(url)
		if resp.StatusCode >= 200 && resp.StatusCode <= 299 {
			io.Copy(file, resp.Body)
			file.Close()
			resp.Body.Close()
		} else {
			fmt.Printf("Non-2xx HTTP Status for %s", url)
		}
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

// func MakeCrawlers(urls []string) {
// 	Site := make([]Sites, len(urls))

// 	// Crawl concurrently
// 	for i, name := range urls {
// 		if name[:4] != "http" && name[:4] != "https" {
// 			name = "http://" + name
// 		}
// 		u, err := url.Parse(name)
// 		if err != nil {
// 			fmt.Printf("could not fetch page - %s %v", name, err)
// 		}
// 		Site[i].folder = u.Host
// 		Site[i].host = u.Host
// 		Site[i].url = name
// 		crawlers.Add(1)
// 		go Site[i].Crawl()
// 	}
// }

func SliceUniq(s []string) []string {
	for i := 0; i < len(s); i++ {
		for i2 := i + 1; i2 < len(s); i2++ {
			if s[i] == s[i2] {
				// delete
				s = append(s[:i2], s[i2+1:]...)
				i2--
			}
		}
	}
	return s
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
