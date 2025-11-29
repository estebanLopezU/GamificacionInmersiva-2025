from django.urls import path
from .views import LoginView, LogoutView, RegisterView, UserView, UserCountView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('user-count/', UserCountView.as_view(), name='user_count'),
]
