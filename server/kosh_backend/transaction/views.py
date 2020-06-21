from django.db.models import Count, Sum
from rest_framework import viewsets, permissions, response

from .serializers import (
    Loan, LoanSerializer,
    LoanTransaction, LoanTransactionSerializer,
    SavingTransaction, SavingTransactionSerializer,
    Member, MemberSerializer, SummarySerializer
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
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = MemberSerializer
    queryset = Member.objects.all()


class SummaryViewSet(viewsets.ViewSet):
    def list(self, *args, **kwargs):
        summary = Member.objects.all().aggregate(
            total_members=Count('id'),
            total_collected=Sum('total_saving'),
            total_loan=Sum('remaining_loan'),
        )
        return response.Response(SummarySerializer(summary).data)
