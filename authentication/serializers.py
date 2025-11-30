from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'role', 'user_type', 'display_name', 'academic_program', 'career', 'semester', 'job_title', 'is_permanent')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'role', 'user_type', 'display_name', 'academic_program', 'career', 'semester', 'job_title', 'is_permanent')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        user_type = data.get('user_type')
        if user_type == 'student':
            if not data.get('career') or not data.get('semester'):
                raise serializers.ValidationError("Para estudiantes, se requieren carrera y semestre.")
        elif user_type == 'professor':
            if not data.get('job_title') or data.get('is_permanent') is None:
                raise serializers.ValidationError("Para profesores, se requieren cargo y tipo de contratación.")
        return data

    def create(self, validated_data):
        # Since USERNAME_FIELD is 'email', create_user expects email as first parameter
        user = CustomUser.objects.create_user(
            validated_data['email'],  # This is the username field (email)
            email=validated_data['email'],
            password=validated_data['password']
        )
        # Set additional fields
        if 'username' in validated_data:
            user.username = validated_data['username']
        user.role = validated_data.get('role', 'user')
        user.user_type = validated_data.get('user_type')
        user.display_name = validated_data.get('display_name')
        user.academic_program = validated_data.get('academic_program')
        user.career = validated_data.get('career')
        user.semester = validated_data.get('semester')
        user.job_title = validated_data.get('job_title')
        user.is_permanent = validated_data.get('is_permanent')
        user.save()
        return user
