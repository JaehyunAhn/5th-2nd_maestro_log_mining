from django.contrib import admin
from UserManage.models import *

# Register your models here.
class querySetAdmin(admin.ModelAdmin):
    list_display = ('username','content','when')
    list_filter = ('when',)
    ordering = ('-when',)

admin.site.register(querySet, querySetAdmin)

class pastInfoAdmin(admin.ModelAdmin):
    list_display = ('username', 'gender_ratio', 'ten_ratio',
            'twy_ratio', 'trty_ratio', 'frty_ratio', 'etc_ratio',
            'recent_keyword1', 'recent_keyword2', 'recent_keyword3',
            'recent_keyword4', 'recent_keyword5')
    list_filter = ('username',)
    ordering = ('username',)

admin.site.register(PastInfo, pastInfoAdmin)
