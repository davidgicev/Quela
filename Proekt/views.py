from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from Proekt.models import Lecture, ExamplesContainer, Exercise, Example


def homePage(request):
    return render(request, "home.html")


def learnPage(request):
    return render(request, "learn.html", {
        "lectures": Lecture.objects.all()
    })


def lecturePage(request, id):
    lecture = Lecture.objects.get(id=id)
    container = ExamplesContainer.objects.get(lecture_id=id)
    examples = Example.objects.filter(container_id=container.id)
    exercises = Exercise.objects.filter(lecture_id=id)
    return render(request, "lecture.html", {
        "lecture": lecture,
        "examples": {
            "container": container,
            "objects": examples
        },
        "exercises": exercises,
        "lectures": Lecture.objects.all()
    })


def getExamplesDatabase(request, id):
    data = ExamplesContainer.objects.get(lecture_id=id)
    return HttpResponse(data.database_model)


def getExercisesDatabases(request, id):
    data = Exercise.objects.filter(lecture_id=id)
    return JsonResponse([{"model": d.database_model, "solution": d.solution} for d in data], safe=False)


def loginPage(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("/")

    return render(request, 'login.html')


def logoutAction(request):
    logout(request)
    return redirect('/login')

