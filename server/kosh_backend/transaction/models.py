from django.db import models
from django.contrib.postgres.fields import ArrayField

from kosh_backend.translation import STRINGS


class CreatedDateMixin(models.Model):
    """Mixin for created at and modified at."""
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseTransaction(CreatedDateMixin):
    TRANSACTION_METHOD_CASH = 'cash'
    TRANSACTION_METHOD_CHEQUE = 'cheque'

    CHOICES_TRANSACTION_METHOD = (
        (TRANSACTION_METHOD_CASH, STRINGS.CASH),
        (TRANSACTION_METHOD_CHEQUE, STRINGS.CHEQUE),
    )

    # Member to whom the transaction belongs
    member = models.ForeignKey('Member', on_delete=models.CASCADE, related_name='%(class)s_member')
    # In general, transaction is made by the member itself, but sometimes might be
    # done by other member on behalf of the actual member
    transaction_by = models.ForeignKey(
            'member', on_delete=models.SET_NULL,
            null=True, related_name='%(class)s_transaction_by')
    transaction_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tranasction_method = models.CharField(max_length=15, choices=CHOICES_TRANSACTION_METHOD)
    transaction_for = ArrayField(models.DateField())


    current_collected_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        abstract = True


class Member(CreatedDateMixin):
    name = models.CharField(max_length=256)
    total_collected = models.DecimalField(max_digits=12, decimal_places=2)
    remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.name


class Loan(CreatedDateMixin):
    LOAN_TYPE_NORMAL = 'normal'
    LOAN_TYPE_SPECIAL = 'special'
    CHOICES_LOAN_TYPE = (
        (LOAN_TYPE_NORMAL, STRINGS.LOAN_NORMAL),
        (LOAN_TYPE_NORMAL, STRINGS.LOAN_SPECIAL),
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    loan_type = models.CharField(max_length=15, choices=CHOICES_LOAN_TYPE)

    def __str__(self):
        return f'{self.amount} by {self.member} on {self.created_at}'


class LoanTransaction(BaseTransaction):
    TRANSACTION_TYPE_RETURN = 'return'  # loan returned to Kosh
    TRANSACTION_TYPE_INVEST = 'invest'  # loan taken from Kosh

    CHOICES_TRANASCTION_TYPE = (
        (TRANSACTION_TYPE_INVEST, STRINGS.INVESTMENT),
        (TRANSACTION_TYPE_INVEST, STRINGS.RETURN),
    )
    transaction_type = models.CharField(max_length=15, choices=CHOICES_TRANASCTION_TYPE)

    def __str__(self):
        return f'{self.transaction_type} {self.transaction_amount} by {self.member}'


class SavingTransaction(BaseTransaction):
    TRANSACTION_TYPE_INSTALLMENT = 'installment'
    TRANSACTION_TYPE_PRINCIPAL = 'principal'

    CHOICES_TRANASCTION_TYPE = (
        (TRANSACTION_TYPE_INSTALLMENT, STRINGS.INSTALLMENT),
        (TRANSACTION_TYPE_PRINCIPAL, STRINGS.PRINCIPAL),
    )
    transaction_type = models.CharField(max_length=15, choices=CHOICES_TRANASCTION_TYPE)

    def __str__(self):
        return f'{self.transaction_type} {self.transaction_amount} by {self.member}'
