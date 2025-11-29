from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import RegisterSerializer, UserSerializer
from .models import CustomUser

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Automatically log in the user after registration
            login(request, user)
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            # Return JSON with redirect URL
            if user.role == 'admin':
                redirect_url = f"http://localhost:3000/admin?token={access_token}"
            else:
                redirect_url = f"http://localhost:3000/page?token={access_token}"
            return Response({
                'success': True,
                'redirect_url': redirect_url,
                'role': user.role,
                'tokens': {
                    'access': access_token,
                    'refresh': str(refresh)
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.request.method == 'POST':
            return []  # Disable CSRF for POST requests to this view
        return super().get_permissions()

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if user exists
        try:
            CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not registered. Please register first.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            # Return JSON with redirect URL
            if user.role == 'admin':
                redirect_url = f"http://localhost:3000/admin?token={access_token}"
            else:
                redirect_url = f"http://localhost:3000/page?token={access_token}"
            return Response({
                'success': True,
                'redirect_url': redirect_url,
                'role': user.role,
                'tokens': {
                    'access': access_token,
                    'refresh': str(refresh)
                }
            })
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserView(views.APIView):
    # Temporarily disable authentication to debug
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        # Check manually for now
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        print(f"UserView: Auth header: {auth_header}")

        if not auth_header.startswith('Bearer '):
            print("UserView: No Bearer token found")
            return Response({'error': 'No token provided'}, status=401)

        token = auth_header.split(' ')[1]
        print(f"UserView: Token: {token[:20]}...")

        try:
            from rest_framework_simplejwt.tokens import AccessToken
            access_token = AccessToken(token)
            user_id = access_token.payload.get('user_id')
            print(f"UserView: Decoded user_id: {user_id}")

            from .models import CustomUser
            user_obj = CustomUser.objects.get(id=user_id)
            print(f"UserView: Found user: {user_obj.username}")

            return Response(UserSerializer(user_obj).data)
        except Exception as e:
            print(f"UserView: Token decode error: {e}")
            import traceback
            traceback.print_exc()
            return Response({'error': 'Invalid token'}, status=401)

class UserCountView(views.APIView):
    # Use default authentication and check admin role
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if user is admin
        if request.user.role == 'admin':
            total_users = CustomUser.objects.count()
            return Response({'total_users': total_users})
        else:
            return Response({'error': 'Not Authorized'}, status=status.HTTP_403_FORBIDDEN)
