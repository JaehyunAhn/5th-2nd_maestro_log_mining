# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
import os.path
admin.autodiscover()

site_media = os.path.join(
    os.path.dirname(__file__), 'site_media'
)

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    # url 선택가능 (logged on / no login mode)
    url(r'^$', 'UserManage.views.user_page'),
    # user/가 들어가면 logged on mode
    url(r'^user/$', 'UserManage.views.user_page'),
    url(r'^user/logout/$', 'UserManage.views.logout_user'),
    url(r'^user/register/$', 'UserManage.views.register_user'),
    url(r'^register/$', 'UserManage.views.register_user'),
    # guessing/ 이 들어가면 no login mode
    url(r'^guessing/$', 'UserManage.views.get_query'),
    url(r'^kibana/$', 'UserManage.views.show_kibana'),
    url(r'^kibana2/$', 'UserManage.views.show_kibana2'),
    url(r'^kibana3/$', 'UserManage.views.show_kibana3'),
	url(r'^kibana4/$', 'UserManage.views.show_kibana4'),
    # 개별상품분석
    url(r'^analyze/$', 'UserManage.views.analyze_product'),
    # staticfiles
    url(r'^site_media/(?P<path>.*)$','django.views.static.serve',
        { 'document_root':site_media,}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT,}),
)

if settings.DEBUG:
    urlpatterns += patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT,
        }),
    url(r'^site_media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.STATIC_ROOT,
        }),
)
