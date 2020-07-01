from django.db.models import Count, Sum
from django.contrib.auth import login, authenticate, logout

from rest_framework import viewsets, permissions, response, exceptions
from rest_framework.views import APIView

from .serializers import (
    Loan, LoanSerializer,
    LoanTransaction, LoanTransactionSerializer,
    SavingTransaction, SavingTransactionSerializer,
    Member, MemberSerializer, SummarySerializer,
    UserSerializer
)


class LoanViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()


class SavingTransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SavingTransactionSerializer
    queryset = SavingTransaction.objects.all()


class LoanTransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoanTransactionSerializer
    queryset = LoanTransaction.objects.all()


class MemberViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MemberSerializer
    queryset = Member.objects.all()


class SummaryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, *args, **kwargs):
        summary = Member.objects.all().aggregate(
            total_members=Count('id'),
            total_collected=Sum('total_saving'),
            total_loan=Sum('remaining_loan'),
        )
        return response.Response(SummarySerializer(summary).data)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return response.Response(serializer.data, status=200)

        else:
            raise exceptions.AuthenticationFailed('Invalid Credentials')


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return response.Response({})


class MeView(APIView):
    def get(self, request):
        return response.Response({})
