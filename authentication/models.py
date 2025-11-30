from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

def validate_unal_email(value):
    if not value.endswith('@unal.edu.co'):
        raise ValidationError('El correo debe ser de la Universidad Nacional de Colombia (@unal.edu.co)')

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('superadmin', 'Superadmin'),
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    USER_TYPE_CHOICES = (
        ('student', 'Estudiante'),
        ('professor', 'Profesor'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    email = models.EmailField(unique=True, validators=[validate_unal_email])
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, blank=True, null=True)
    display_name = models.CharField(max_length=255, blank=True, null=True)

    # Student fields
    academic_program = models.CharField(max_length=255, blank=True, null=True)
    career = models.CharField(max_length=255, blank=True, null=True)
    semester = models.IntegerField(blank=True, null=True)

    # Professor fields
    job_title = models.CharField(max_length=255, blank=True, null=True)
    is_permanent = models.BooleanField(blank=True, null=True)  # True for planta, False for ocasional

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email is the username field, so no additional required fields

    @property
    def is_superadmin(self):
        return self.role == 'superadmin'

    def __str__(self):
        return self.email
