# coding: UTF-8
from naver_search import Naver

naver = Naver()
query = raw_input()
print naver.search(query)
