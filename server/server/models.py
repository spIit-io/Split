from django.db import models

class UserInfo(models.Model):
    UserID = models.CharField(max_length=30, primary_key=True, db_column='userid')  # Use lowercase 'userid'
    Username = models.CharField(max_length=30, db_column='username')  # Use lowercase 'username'

    class Meta:
        db_table = 'userinfo'  # Use lowercase 'userinfo'

class Transactions(models.Model):
    TransactionID = models.AutoField(primary_key=True, db_column='transactionid')  # Use lowercase 'transactionid'
    OutgoingUserID = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='outgoing_transactions', db_column='outgoinguserid')
    IncomingUserID = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='incoming_transactions', db_column='incominguserid')
    Amount = models.IntegerField(db_column='amount')
    PaymentDate = models.DateTimeField(auto_now_add=True, db_column='paymentdate')
    Description = models.CharField(max_length=100, db_column='description')

    class Meta:
        db_table = 'transactions'  # Use lowercase 'transactions'


