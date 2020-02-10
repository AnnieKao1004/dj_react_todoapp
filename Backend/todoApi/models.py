from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

class Todo(models.Model):
  owner = models.ForeignKey('auth.User', related_name='todos', on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  date = models.DateField(blank=True, null=True)
  comment = models.TextField(blank=True)
  important = models.BooleanField(default = False)
  complete = models.BooleanField(default = False)

  class Meta:
    ordering = ['date']

  def __str__(self):
    return self.title

# Automatically create token once the User instance is create
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)


