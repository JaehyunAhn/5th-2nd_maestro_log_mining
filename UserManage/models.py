from django.db import models, IntegrityError
from django.contrib.auth.models import User
from django.contrib import admin
from datetime import date

class querySet(models.Model):
  username = models.CharField(max_length=63)
  content = models.TextField(blank=False, null=False)
  when = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering=('when',)


class PastInfo(models.Model):
    username = models.CharField(max_length=63)
    gender_ratio = models.IntegerField(null=False)
    ten_ratio = models.IntegerField(null=False)
    twy_ratio = models.IntegerField(null=False)
    trty_ratio= models.IntegerField(null=False)
    frty_ratio= models.IntegerField(null=False)
    etc_ratio = models.IntegerField(null=False)
    recent_keyword1 = models.CharField(max_length=255,null=False)
    recent_keyword2 = models.CharField(max_length=255,null=False)
    recent_keyword3 = models.CharField(max_length=255,null=False)
    recent_keyword4 = models.CharField(max_length=255,null=False)
    recent_keyword5 = models.CharField(max_length=255,null=False)

