# coding=utf-8
import simplejson, re, urllib, urllib2, requests
# from scrapy.selector import Selector
from scrapy.selector import HtmlXPathSelector
import xmlrpclib
import re

class Naver():
    cate1_id = None
    cate1_name = None
    cate2_id = None
    cate2_name = None
    cate2_id = None
    cate2_name = None
    cate3_id = None
    cate3_name = None
    base_url = None
    query = None

    def __init__(self):
        self.base_url = "http://shopping.naver.com/search/all_search.nhn?query="

    def search(self, query):
        self.query = query
        query_seg_idx = 0
        url = self.base_url + query
        r = requests.get(url).text
        hxs = HtmlXPathSelector(text=r)
        info_list = []
        item_list = []
        model_list = hxs.select('//*[@id="_search_list"]/div[1]/ul/li')
        print 'len=',len(model_list)
        extract_dict = {'img':'./div[1]/a/img/@src','item_name':'./div[2]/a/@title','site_url':'./div[2]/a/@href',\
                        'price_row':'./div[2]/span[1]/em/span[@class="num _price_reload"]/text()',\
                        'price_high':'./div[2]/span[1]/strong/span/text()','cate1':'./div[2]/span[2]/a[1]/text()',\
                        'cate2':'./div[2]/span[2]/a[2]/text()','cate3':'./div[2]/span[2]/a[3]/text()'}

        for each_item in model_list:
            item = dict()
            for fld in extract_dict.keys():
                try:
                    item[fld] = each_item.select(extract_dict[fld]).extract()[0]
                except Exception,e:
                    pass


            # item_name = each_item.select('./div[2]/a/@title').extract()[0]
            site_url = each_item.select('./div[2]/a/@href').extract()[0]
            # price_row = each_item.select('./div[2]/span[1]/em/span[@class="num _price_reload"]/text()').extract()[0]
            # price_high = None
            # price_high = each_item.select('./div[2]/span[1]/strong/span/text()').extract()[0]
            # cate1 = each_item.select('./div[2]/span[2]/a[1]/text()').extract()[0]
            # cate2 = each_item.select('./div[2]/span[2]/a[2]/text()').extract()[0]
            # cate3 = each_item.select('./div[2]/span[2]/a[3]/text()').extract()[0]
            # item['item_name'] = item_name
            if(len(site_url.split("http://shopping.naver.com/"))>=2):
                item['site_url']=site_url.split("http://shopping.naver.com/")[1]
            if(len(site_url.split("http://"))<2):
                item['site_url']='http://shopping.naver.com'+ site_url
            else:
                item['site_url']=site_url
            item_list.append(item)
            continue 
        if len(item_list)<10:
            return item_list[:len(item_list)]
        return item_list[:10]

