from django.http.response import Http404
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db.models import Q

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Note
from .serializers import NoteSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(user=user).order_by('-date')

    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def get_important_notes(request):
    user = request.user
    notes = Note.objects.filter(user=user).filter(important=True).order_by('-date')

    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def get_completed_notes(request):
    user = request.user
    notes = Note.objects.filter(user=user).filter(completed=True).order_by('-date')

    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['POST'])
def create_note(request):
    user = request.user
    data = request.data

    try:
        note = Note.objects.create(
            user=user,
            content=data['content'],
            important=data['important'],
            completed=data['completed']
        )
    except:
        message = {'detail': 'there was an error creating this note!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['DELETE'])
def delete_note(request):
    user = request.user
    data = request.data

    try:
        note = Note.objects.get(id=data['note'])
        if note.user.username == data['user']:
            note.delete()
    except:
        message = {'detail': 'there was an error deleting this note!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    return Response('note deleted')

@permission_classes(['IsAuthenticated'])
@api_view(['PUT'])
def complete_note(request):
    user = request.user
    data = request.data
    note_id = data['note_id']
    note = Note.objects.get(id=note_id)

    try:
        if note.user == user:
            if note.completed == True:
                note.completed = False
            else:
                note.completed = True
            note.save()
    except:
        message = {'detail': 'unable to change this notes completed status!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['PUT'])
def edit_note(request):
    user = request.user
    data = request.data
    print(data)
    note = Note.objects.get(id=data['id'])

    try:
        if note.user == user:
            note.content = data['content']
            note.important = data['important']
            note.completed = data['completed']
            note.save()
    except:
        message = {'detail': 'unable to edit this note!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)
    
@api_view(['POST'])
def register_user(request):
    data = request.data

    try:
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password'])
        )
    except:
        message = {'detail': 'user with this username already exists!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)