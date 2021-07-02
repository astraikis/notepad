from django.db import models

from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    content = models.CharField(max_length=250)
    important = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content