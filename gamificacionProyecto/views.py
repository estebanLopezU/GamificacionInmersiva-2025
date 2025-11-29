from django.shortcuts import render

# Vista para la página de inicio
def index(request):
    return render(request, 'index.html')

def register(request):
    return render(request, 'register.html')

# Vista para la página de login
# Django ya provee vistas de login, así que esta podría no ser necesaria
# a menos que quieras personalizarla mucho.
# from django.contrib.auth.views import LoginView
# class CustomLoginView(LoginView):
#     template_name = 'login.html'
