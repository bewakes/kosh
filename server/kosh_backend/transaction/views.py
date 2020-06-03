from rest_framework import viewsets, permissions

from .serializers import (
    Loan, LoanSerializer,
    LoanTransaction, LoanTransactionSerializer,
    SavingTransaction, SavingTransactionSerializer,
    Member, MemberSerializer,
)


class LoanViewSet(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()


class SavingTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = SavingTransactionSerializer
    queryset = SavingTransaction.objects.all()


class LoanTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = LoanTransactionSerializer
    queryset = LoanTransaction.objects.all()


class MemberViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MemberSerializer
    queryset = Member.objects.all()
