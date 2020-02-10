from .models import Todo
from .serializers import TodoSerializer, UserSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .permissions import IsOwner
from django.contrib.auth.models import User

class TodoViewset(viewsets.ModelViewSet):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer
  permission_classes = [permissions.IsAuthenticated, IsOwner]

  def perform_create(self, serializer):
    serializer.save(owner = self.request.user)

class UserViewset(viewsets.ReadOnlyModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
