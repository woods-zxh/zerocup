# -*- coding:utf-8 -*-
from .models import TeamInfo, Member,Files
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse, Http404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.utils import timezone

#from django.views.decorators.csrf import csrf_exempt
import json
import csv, codecs


@login_required(login_url='/pass/')
def index(request):
    team = TeamInfo.objects.all()
    for x in team:
        x.teamnum = 0
        x.save()

    team = TeamInfo.objects.all().order_by('id')
    for (x, y) in zip(team, list(range(len(team)))):
        x.teamnum = y+1
        x.save()

    memb = Member.objects.all().order_by('-created')

    return render(request, 'account/index.html', {'memb': memb})
    #raise Http404

#判断队伍名是否存在
def Isteamname(request):
    try:
        teamnames = request.POST['teamName']
    except:
        teamnames = request.POST['teamNameM']
    if TeamInfo.objects.filter(teamname=teamnames):
        result = "0"
      #  print(json.dumps(result))
        return HttpResponse(json.dumps(result), content_type='application/json')

    else:
        result = "1"
        #print(json.dumps(result))
        return HttpResponse(json.dumps(result), content_type='application/json')


#判断队长是否已担任其他队伍的队长
def Iscaptain(request):
    try:
        cstunums = request.POST['leaderId']
    except:
        cstunums = request.POST['leaderIdM']
    if TeamInfo.objects.filter(cstunum=cstunums):
        result = "0"
        return HttpResponse(json.dumps(result), content_type='application/json')
    else:
        result = "1"
        return HttpResponse(json.dumps(result), content_type='application/json')

#报名函数
def info_post(request):
    if request.method == 'POST':
        try:
            teamnames = request.POST['teamName']
            try:
                teamtype = request.POST['zero']
            except:
                teamtype = request.POST['one']
            cnames = request.POST['leaderName']
            cstunums = request.POST['leaderId']
            cschools = request.POST['leaderInstitute']
            clianxis = request.POST['leaderContact']
            othermembers = request.POST['teamerName']
            otherstunums = request.POST['teamerId']
            otherschools = request.POST['teamInstitute']
        except:
            teamnames = request.POST['teamNameM']
            try:
                teamtype = request.POST['zero']
            except:
                teamtype = request.POST['one']
            cnames = request.POST['leaderNameM']
            cstunums = request.POST['leaderIdM']
            cschools = request.POST['leaderInstituteM']
            clianxis = request.POST['leaderContactM']
            othermembers = request.POST['teamerNameM']
            otherstunums = request.POST['teamerIdM']
            otherschools = request.POST['teamInstituteM']
        try:
            nownum = len(TeamInfo.objects.all())+1
            teams = TeamInfo.objects.create(teamname=teamnames, cname=cnames, teamtype=teamtype,
                                            cstunum=cstunums, cschool=cschools,
                                            clianxi=clianxis, teamnum=nownum)
            Member.objects.create(team=teams, othermember=othermembers,
                                  otherschool=otherschools, otherstunum=otherstunums)
            return HttpResponse(json.dumps("1"), content_type='application/json')

        except:
            return HttpResponse(json.dumps("0"), content_type='application/json')
    else:
       return render(request, 'account/报名官网.html')
       # raise Http404



#查看当前报名队伍
def see_result(request):
    if request.method == 'POST':
        username = 'buzhidao'
        pwd = request.POST['pwd']
        user = authenticate(username=username, password=pwd)
        if user:
            login(request, user)
            return HttpResponseRedirect('/result')
        else:
            return HttpResponse(json.dumps("wrong"), content_type='application/json')
    else:
       return render(request, 'account/pass.html')
       # raise Http404



#把报名信息储存进csv文件以供下载
def build_csv(request):
    response = HttpResponse(content_type='text/csv')
    response.write(codecs.BOM_UTF8)
    response['Content-Disposition'] = 'attachment; filename=teamlist.csv'

    writer = csv.writer(response)
    list = ['队伍名称', '队伍组别', '队长姓名', '队长学号', '队长学院', '队长联系方式', '队员姓名', '队员学号', '队员学院','报名时间']
    writer.writerow(list)
    member = Member.objects.all()
    for x in member:
        listx = [x.team.teamname, x.team.teamtype, x.team.cname, x.team.cstunum, x.team.cschool,
                 x.team.clianxi, x.othermember, x.otherstunum, x.otherschool, x.created]
        writer.writerow(listx)
    return response

#上传文件
def submit(request):
    if request.method == 'POST':
        teamName = request.POST["teamName"]
        if request.FILES.get("file"):
            file = request.FILES["file"]
            print("asdsada")
            if(Files.objects.filter(teamName = teamName)):

                file1 = Files.objects.get(teamName=teamName)
                file1.delete()
                Files.objects.create(file=file, teamName=teamName, fileName=file.name)
            else:
                Files.objects.create(file = file,teamName = teamName,fileName = file.name)
        return render(request, 'account/submit_success.html')
    else:
        return render(request, 'account/submit.html')
#
# #下载文件
def download(request):
    try:
        files = Files.objects.all()
        a = 0
        for file in files:
            a =a +1

    except:
        pass
    return render(request, 'account/files.html',{"files":files,"a":a})



