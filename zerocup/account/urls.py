from django.conf.urls import url
from account import views


urlpatterns = [
    url(r'^result$', views.index, name='index'),
    url(r'^$', views.info_post, name='submit'),
    url(r'^pass/', views.see_result, name='pass'),
    url(r'^csv/', views.build_csv, name='csv'),
    url(r'^isteamname/', views.Isteamname, name='Isteamname'),
    url(r'^iscaptain/', views.Iscaptain, name='Iscaptain'),
   # url(r'^phonepost/', views.infoM_post, name='submitM'),
]
