from django.conf.urls import url
from account import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^result$', views.index, name='index'),
    url(r'^$', views.info_post, name='submit'),
    url(r'^pass/', views.see_result, name='pass'),
    url(r'^csv/', views.build_csv, name='csv'),
    url(r'^isteamname/', views.Isteamname, name='Isteamname'),
    url(r'^iscaptain/', views.Iscaptain, name='Iscaptain'),
    url(r'^submit/', views.submit, name='submit'),
    url(r'^download/', views.download, name='download'),

   # url(r'^phonepost/', views.infoM_post, name='submitM'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
