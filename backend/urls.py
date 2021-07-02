from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from base.views import (
    get_notes,
    get_important_notes,
    get_completed_notes,
    register_user,
    create_note,
    delete_note,
    complete_note,
    edit_note,
    MyTokenObtainPairView
)

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/register/', register_user),
    path('api/create/', create_note),
    path('api/delete/', delete_note),
    path('api/complete/', complete_note),
    path('api/edit/', edit_note),
    path('admin/', admin.site.urls),
    path('api/', get_notes),
    path('api/important/', get_important_notes),
    path('api/completed/', get_completed_notes)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)