from django.db import models
from django.contrib.auth.models import User

from kosh_backend.translation import STRINGS


class CreatedMixin(models.Model):
    """Mixin for created at and modified at."""
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_modified_by')

    class Meta:
        abstract = True


class BaseTransaction(CreatedMixin):
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
    transaction_method = models.CharField(max_length=15, choices=CHOICES_TRANSACTION_METHOD)
    transaction_for_month = models.DateField()  # Although date field only year and month will be used

    current_saving = models.DecimalField(max_digits=12, decimal_places=2)
    current_remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)

    remarks = models.TextField(blank=True)

    class Meta:
        abstract = True


class Member(CreatedMixin):
    name = models.CharField(max_length=256)
    contact = models.CharField(max_length=256)
    school_role = models.CharField(max_length=256, null=True, blank=True)
    total_saving = models.DecimalField(max_digits=12, decimal_places=2)
    remaining_loan = models.DecimalField(max_digits=12, decimal_places=2)
    remarks = models.TextField(blank=True)
    # member_since = models.DateField(null=True)

    def __str__(self):
        return self.name


class Loan(CreatedMixin):
    LOAN_TYPE_NORMAL = 'normal'
    LOAN_TYPE_SPECIAL = 'special'
    CHOICES_LOAN_TYPE = (
        (LOAN_TYPE_NORMAL, STRINGS.LOAN_NORMAL),
        (LOAN_TYPE_NORMAL, STRINGS.LOAN_SPECIAL),
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    loan_type = models.CharField(max_length=15, choices=CHOICES_LOAN_TYPE)

    remarks = models.TextField(blank=True)

    def __str__(self):
        return f'{self.amount} by {self.member} on {self.created_at}'


class LoanTransaction(BaseTransaction):
    TRANSACTION_TYPE_RETURN = 'return'  # loan returned to Kosh
    TRANSACTION_TYPE_INVEST = 'invest'  # loan taken from Kosh

    CHOICES_TRANASCTION_TYPE = (
        (TRANSACTION_TYPE_INVEST, STRINGS.INVESTMENT),
        (TRANSACTION_TYPE_RETURN, STRINGS.RETURN),
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
