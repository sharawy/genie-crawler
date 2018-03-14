from bs4 import BeautifulSoup as Soup


def add_base_tag(html, url):
    soup = Soup(html)

    head = soup.find('head')
    base = soup.new_tag('base')
    base['href'] = url
    head.insert(1, base)
    return soup
