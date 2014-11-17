# -*- coding: utf-8 -*-
# Naver Search
# coding: utf-8
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.decorators import login_required
#from django.views.decorators.cache import cache_page
from UserManage.models import *
# Requests for Buzz API
import requests
import urllib
# Naver
import naver_search

# Analyze each product, 상품검색페이지
def analyze_product(request):
    input_title = ''
    result_data = ''
    if request.GET:
        input_title = request.GET.get('title')
        web_addr = 'http://soma2.jhjh.pe.kr:8123/api?'
        url = urllib.urlencode({
            'func':'newitem',
            'name':input_title.encode('utf-8')
            })
        web_addr += url
        result = requests.get(web_addr)
        result_data = result.json()
        return render_to_response('product_analyzer.html', {'user':request.user, 
            'input_title':input_title, 'result_data':result_data })
    return render_to_response('product_analyzer.html', {'user':request.user, 
        'input_title':input_title, 'result_data':result_data })

# show kibana for DH 31.Oct.2014
def show_kibana4(request):
    return render_to_response('kibana4.html', {'user':request.user })

def show_kibana2(request):
    return render_to_response('kibana2.html', {'user':request.user })

def show_kibana3(request):
    return render_to_response('kibana3.html', {'user':request.user })

# get client ip, added at 1.Sep.2014
# finally got answer at https://djangosnippets.org/snippets/2575/
def get_client_ip(request):
  # proxy server's supported client ip
  x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
  if x_forwarded_for:
    ip = x_forwarded_for.split(',')[0]
  else:
    # request get behind proxy
    ip = request.META.get('REMOTE_ADDR')
  return ip

def main_page(request):
  return render_to_response('main.html')

def logout_user(request):
  logout(request)
  return HttpResponseRedirect('/user/')

@csrf_exempt
def register_user(request):
  state = ''
  if request.POST:
    username = request.POST.get('username')
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    if password1 == '':
      state = '패스워드를 입력하셔야 합니다'
      return HttpResponseRedirect('/')
    if password1 != password2:
      state = '패스워드가 다릅니다'
      return HttpResponseRedirect('/')
    try:
      find = User.objects.get(username=username)
    # 없으면 생성
    except User.DoesNotExist:
      user = User.objects.create_user(username=username, password=password1)
      user.save()
      state = '등록이 완료되었습니다. 로그인해주세요.'
      return HttpResponseRedirect('/')
    # 중복되면 문제
    else:
      state = '이미 가입된 아이디입니다.'
      return HttpResponseRedirect('/')
  return HttpResponseRedirect('/')

def search_request(variable, page, count, account):
    """
    web_addr = 'http://17.buzzni.com:91/search/metaSearch?'
    url = urllib.urlencode({ 
        'query': variable,
        'page': page,
        'num': count,
        'is_web':1
        })
    web_addr += url
    search_reuslt = []
    search_result = requests.get(web_addr)
    jsonned = search_result.json()
    data = jsonned['result']['data']
    """
    naver = naver_search.Naver()
    data = naver.search(variable)
    #post request to Jinhyun's classifier
    jh_addr = 'http://106.185.24.52:8123/api?'
    url = urllib.urlencode({
        'func':'search',
        'user_id':account,
        'query':variable
        })
    jh_addr += url
    requests.get(jh_addr)
    return data

#@cache_page(1000000)
@csrf_exempt
def user_page(request):
  state = ''
  # post면 로그인
  if request.POST:
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
      if user.is_active:
        state = '로그인됨'
        login(request, user)
        return render_to_response('loggedon.html',{'state':state, 'user':request.user})
      else:
        state = "your account is not active"
        return render_to_response('loggedon.html',{'state':state})
    else:
      state = "your id and/or password are incorrect"
      return render_to_response('loggedon.html',{'state':state})

  # get이면 쿼리 저장
  content = ''
  current = ''
  searchBox = ''
  ip = ''
  if request.GET:
    # if username exists,  
    if request.user is not None:
      username = request.user.username
    if username == '':
        #username = get_client_ip(request)
        username = 'unknown'
    # do requests
    content = request.GET.get('content')
    current = request.GET.get('current')
    searchBox = request.GET.get('searchBox')
    if searchBox == u'prev':
        if int(current) is not 1:
            current -= 1
    elif searchBox == u'next':
        if int(current) is not 1:
            current += 1
    # 실제 데모페이지에서 움직이는 모듈
    print type(content), repr(content)
    if content:
        result = search_request(content.encode('utf-8'), current, 10, username)
        # 카테고리 예측
        for item in result:
            url = 'http://soma2.jhjh.pe.kr:8123/api?'
            addr = urllib.urlencode({
                'func':'newitem',
                'name':item['item_name'].encode('utf-8')
                })
            url += addr
            data = requests.get(url).json()
            item['ncate1'] = data['ncate1']
            item['ncate2'] = data['ncate2']
            item['ncate3'] = data['ncate3']
            print item['site_url']
    # requests over
    if not content:
      state = 'please type anything'
      return render_to_response('loggedon.html',{'state':state, 'user':request.user})
    else:
      # 본격적인 모듈, 쿼리를 저장하고 점수를 받아낸다
      query = querySet(username=username, content=content)
      query.save()
      #state = 'query saved!'
      return render_to_response('loggedon.html',{'state':state,'result':result, 'content':content,
                                                 'current':current, 'user':request.user, 'user_ip': username,
                                                  })
  return render_to_response('loggedon.html',{'state':state,'user':request.user })

def get_query(request):
  username = get_client_ip(request)
  content = ''
  current = ''
  searchBox = ''
  state = ''
  if request.GET:
    content = request.GET.get('content')
    current = request.GET.get('current')
    searchBox = request.GET.get('searchBox')
    if searchBox == u'prev':
        if int(current) is not 1:
            current -= 1
    elif searchBox == u'next':
        if int(current) is not 1:
            current += 1
    if not content:
      state = 'please type anything'
      return render_to_response('loggedon.html',{'state':state})
    else:
      # do requests
      result = search_request(content.encode('utf-8'), current, 10, username)
      query = querySet(username=username, content=content)
      query.save()
      state = 'query saved!'
      return render_to_response('noUserQuery.html',{'state':state,'result':result, 'content':content,
                                                    'current':current, 'user_ip': username })
  return render_to_response('noUserQuery.html')
