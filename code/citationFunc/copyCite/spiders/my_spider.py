import scrapy

class MySpider(scrapy.Spider):
    name = 'my_spider'
    start_urls = ['https://example.com']  # Replace with the URL you want to scrape

    def parse(self, response):
        # Extract data using XPath or CSS selectors
        title = response.xpath('//title/text()').get()
        yield {'title': title}

        # Follow links to scrape additional pages (if needed)
        # for next_page in response.css('a.next::attr(href)').getall():
        #     yield response.follow(next_page, self.parse)
