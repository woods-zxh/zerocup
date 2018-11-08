# -*- coding:utf-8 -*-
from django.db import models
from django.utils import timezone
# Create your models here.


class TeamInfo(models.Model):
    teamname = models.CharField(max_length=16, unique=True, blank=False, verbose_name='teamname')
    teamtype = models.CharField(max_length=2, default=0, blank=False, verbose_name='teamname')
    cname = models.CharField(max_length=16, blank=False, verbose_name='cname')
    cstunum = models.CharField(max_length=16, unique=True, blank=False, verbose_name='cstunum')
    cschool = models.CharField(max_length=16, blank=False, verbose_name='cschool')
    clianxi = models.CharField(max_length=32, blank=False, verbose_name='clianxi')
    teamnum = models.IntegerField(default=0)

    def __str__(self):
        return self.teamname


class Member(models.Model):
    team = models.OneToOneField(TeamInfo,on_delete=models.CASCADE)
    othermember = models.CharField(max_length=128, blank=True, verbose_name='othermember')
    otherstunum = models.CharField(max_length=128, blank=True, verbose_name='otherstunum')
    otherschool = models.CharField(max_length=64, blank=True, verbose_name='otherschool')
    created = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return self.team.teamname

class Files(models.Model):
    file = models.FileField(default=timezone.now)
    fileName = models.CharField(max_length=64, blank=True)
    created = models.DateTimeField(default=timezone.now)
    teamName = models.CharField(max_length=64, blank=True)
