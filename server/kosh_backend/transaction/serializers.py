from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Loan, LoanTransaction, SavingTransaction, Member


class CreatedBySerializerMixin:
    def create(self, data):
        data['created_by'] = self.context['request'].user
        data['modified_by'] = self.context['request'].user
        return super().create(data)

    def update(self, instance, data):
        data['modified_by'] = self.context['request'].user
        return super().update(instance, data)


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'name')


class LoanSerializer(CreatedBySerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = ('created_at', 'modified_at', 'created_by', 'modified_by')


class LoanTransactionSerializer(CreatedBySerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = LoanTransaction
        fields = '__all__'
        read_only_fields = (
            'created_at', 'modified_at', 'created_by', 'modified_by',
            'current_remaining_loan', 'current_saving',
        )

    def create(self, data):
        member = data['member']
        if data['transaction_type'] == LoanTransaction.TRANSACTION_TYPE_RETURN:
            member.remaining_loan -= data['transaction_amount']
        elif data['transaction_type'] == LoanTransaction.TRANSACTION_TYPE_INVEST:
            member.remaining_loan += data['transaction_amount']
        member.save()
        data['current_remaining_loan'] = member.remaining_loan
        data['current_saving'] = member.total_saving
        return super().create(data)


class SavingTransactionSerializer(CreatedBySerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = SavingTransaction
        fields = '__all__'
        read_only_fields = (
            'created_at', 'modified_at', 'created_by', 'modified_by',
            'current_remaining_loan', 'current_saving',
        )

    def create(self, data):
        member = data['member']
        if data['transaction_type'] == SavingTransaction.TRANSACTION_TYPE_PRINCIPAL:
            member.total_saving += data['transaction_amount']
        elif data['transaction_type'] == SavingTransaction.TRANSACTION_TYPE_INSTALLMENT:
            member.total_saving += data['transaction_amount']
        member.save()
        data['current_remaining_loan'] = member.remaining_loan
        data['current_saving'] = member.total_saving
        return super().create(data)


class MemberSerializer(CreatedBySerializerMixin, serializers.ModelSerializer):
    loan_transactions = LoanTransactionSerializer(source='loantransaction_member', many=True)
    saving_transactions = LoanTransactionSerializer(source='savingtransaction_member', many=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.context['request'].query_params.get('_expand'):
            self.fields.pop('loan_transactions')
            self.fields.pop('saving_transactions')

    class Meta:
        model = Member
        fields = '__all__'
        read_only_fields = ('created_at', 'modified_at', 'created_by', 'modified_by')


class SummarySerializer(serializers.Serializer):
    total_members = serializers.IntegerField()
    total_collected = serializers.IntegerField()
    total_loan = serializers.IntegerField()
