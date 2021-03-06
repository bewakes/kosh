# Generated by Django 3.0.6 on 2020-06-18 06:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=256)),
                ('contact', models.CharField(max_length=256)),
                ('school_role', models.CharField(blank=True, max_length=256, null=True)),
                ('total_saving', models.DecimalField(decimal_places=2, max_digits=12)),
                ('remaining_loan', models.DecimalField(decimal_places=2, max_digits=12)),
                ('remarks', models.TextField(blank=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_created_by', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_modified_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SavingTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('transaction_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('transaction_method', models.CharField(choices=[('cash', 'Cash'), ('cheque', 'Cheque')], max_length=15)),
                ('transaction_for_month', models.DateField()),
                ('current_saving', models.DecimalField(decimal_places=2, max_digits=12)),
                ('current_remaining_loan', models.DecimalField(decimal_places=2, max_digits=12)),
                ('remarks', models.TextField(blank=True)),
                ('transaction_type', models.CharField(choices=[('installment', 'Installment'), ('principal', 'Principal')], max_length=15)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='savingtransaction_created_by', to=settings.AUTH_USER_MODEL)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='savingtransaction_member', to='transaction.Member')),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='savingtransaction_modified_by', to=settings.AUTH_USER_MODEL)),
                ('transaction_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='savingtransaction_transaction_by', to='transaction.Member')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LoanTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('transaction_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('transaction_method', models.CharField(choices=[('cash', 'Cash'), ('cheque', 'Cheque')], max_length=15)),
                ('transaction_for_month', models.DateField()),
                ('current_saving', models.DecimalField(decimal_places=2, max_digits=12)),
                ('current_remaining_loan', models.DecimalField(decimal_places=2, max_digits=12)),
                ('remarks', models.TextField(blank=True)),
                ('transaction_type', models.CharField(choices=[('invest', 'Investment'), ('return', 'Return')], max_length=15)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loantransaction_created_by', to=settings.AUTH_USER_MODEL)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loantransaction_member', to='transaction.Member')),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loantransaction_modified_by', to=settings.AUTH_USER_MODEL)),
                ('transaction_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='loantransaction_transaction_by', to='transaction.Member')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('loan_type', models.CharField(choices=[('normal', 'Normal'), ('normal', 'Special')], max_length=15)),
                ('remarks', models.TextField(blank=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loan_created_by', to=settings.AUTH_USER_MODEL)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transaction.Member')),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loan_modified_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
