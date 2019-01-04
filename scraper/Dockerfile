FROM golang:1.11-alpine3.8
LABEL maintainer "Ian Harris <iankerriganharris@gmail.com>"

RUN mkdir /app
WORKDIR /app
COPY . /app

# Install git
RUN apk add git

# Build
RUN go get -u github.com/gocolly/colly
RUN go build ./main.go

# Run scraper
RUN ["./main", "example.com"]
# alternatively, ENTRYPOINT ["sh", "docker-entrypoint.sh"]