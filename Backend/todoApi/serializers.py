from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.HyperlinkedModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username') # override default field

  class Meta:
    model = Todo
    fields = ('id', 'url', 'owner', 'title', 'date', 'comment', 'important', 'complete')

class UserSerializer(serializers.HyperlinkedModelSerializer):
  todos = serializers.HyperlinkedRelatedField(many=True, view_name='todo-detail', read_only=True) # 新增的field

  class Meta:
    model = User
    fields = ('id', 'url', 'username', 'todos')