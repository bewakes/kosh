from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.conf.settings import STRINGS


class CreatedDateMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseTransaction(CreatedDateMixin):
    TRANSACTION_METHOD_CASH = 'cash'
    TRANSACTION_METHOD_CHEQUE = 'cheque'

    CHOICES_TRANSACTION_METHOD = (
        (TRANSACTION_METHOD_CASH, STRINGS.txn.CASH),
        (TRANSACTION_METHOD_CHEQUE, STRINGS.txn.CHEQUE),
    )

    # Member to whom the transaction belongs
    member = models.ForeignKey('Member', on_delete=models.CASCADE)
    # In general, transaction is made by the member itself, but sometimes might be
    # done by other member on behalf of the actual member
    transaction_by = models.ForeignKey(
            'member', on_delete=models.SET_NULL, null=True)
    transaction_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tranasction_method = models.CharField(max_digits=15, choices=CHOICES_TRANSACTION_METHOD)
    transaction_for = ArrayField(models.DateField())

    current_collected_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        abstract = True


class Member(CreatedDateMixin):
    name = models.CharField(max_length=256)
    total_collected = models.DecimalField(max_digits=12, decimal_places=2)
    remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)


class LoanTransaction(BaseTransaction):
    TRANSACTION_TYPE_RETURN = 'return'  # loan returned to Kosh
    TRANSACTION_TYPE_INVEST = 'invest'  # loan taken from Kosh

    CHOICES_TRANASCTION_TYPE = (
        (TRANSACTION_TYPE_INVEST, STRINGS.txn.INVESTMENT),
        (TRANSACTION_TYPE_INVEST, STRINGS.txn.RETURN),
    )
    transaction_type = models.CharField(max_length=15, CHOICES=CHOICES_TRANASCTION_TYPE)


class SavingTransaction(CreatedDateMixin):
    TRANSACTION_TYPE_INSTALLMENT = 'installment'
    TRANSACTION_TYPE_PRINCIPAL = 'principal'

    CHOICES_TRANASCTION_TYPE = (
        (TRANSACTION_TYPE_INSTALLMENT, STRINGS.txn.INSTALLMENT),
        (TRANSACTION_TYPE_PRINCIPAL, STRINGS.txn.PRINCIPAL),
    )
    transaction_type = models.CharField(max_length=15, CHOICES=CHOICES_TRANASCTION_TYPE)
