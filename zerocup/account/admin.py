from django.contrib import admin
from .models import TeamInfo, Member
# Register your models here.

class TeamInfoAdmin(admin.ModelAdmin):
  list_display = ('teamname', 'teamnum')
   



admin.site.register(TeamInfo, TeamInfoAdmin)
admin.site.register(Member)
