from django.shortcuts import render

def index_view(request):
    """
    Esta vista se encarga de renderizar y mostrar la página principal.
    """
    return render(request, 'index.html')