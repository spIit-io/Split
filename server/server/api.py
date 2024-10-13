from ninja import NinjaAPI, File
from ninja.files import UploadedFile
from typing import List
from django.db.models import Sum
from pydantic import BaseModel
from django.contrib.auth.models import User
from datetime import datetime
from .models import Transactions, UserInfo
from .schemas import TransactionSchema, TransactionResponseSchema, DebtSummarySchema, UserDebtsResponseSchema
from django.db import models
from django.db.models import Q
from PIL import Image
import pytesseract
import re

api = NinjaAPI()

@api.post("/transactions", response=TransactionResponseSchema)
def new_transaction(request, transaction: TransactionSchema):
    # Fetch the UserInfo objects for the given IDs
    outgoing_user = UserInfo.objects.get(UserID=transaction.OutgoingUserID)
    incoming_user = UserInfo.objects.get(UserID=transaction.IncomingUserID)

    # Create a new transaction record in the database
    new_transaction = Transactions.objects.create(
        OutgoingUserID=outgoing_user,
        IncomingUserID=incoming_user,
        Amount=transaction.Amount,
        Description=transaction.Description
    )

    # Convert PaymentDate to string
    payment_date_str = new_transaction.PaymentDate.strftime('%Y-%m-%d %H:%M:%S')

    # Return the transaction details in the response
    return TransactionResponseSchema(
        TransactionID=new_transaction.TransactionID,
        OutgoingUserID=new_transaction.OutgoingUserID.UserID,
        IncomingUserID=new_transaction.IncomingUserID.UserID,
        Amount=new_transaction.Amount,
        PaymentDate=payment_date_str,  # Convert datetime to string
        Description=new_transaction.Description
    )

@api.get("/transactions", response=List[TransactionResponseSchema])
def get_transactions(request, user_id: str):
    # Get all transactions where the user is either the outgoing or incoming user
    transactions = Transactions.objects.filter(
        models.Q(OutgoingUserID__UserID=user_id) | models.Q(IncomingUserID__UserID=user_id)
    )

    # Return the list of transactions
    return [
        TransactionResponseSchema(
            TransactionID=transaction.TransactionID,
            OutgoingUserID=transaction.OutgoingUserID.UserID,
            IncomingUserID=transaction.IncomingUserID.UserID,
            Amount=transaction.Amount,
            PaymentDate=transaction.PaymentDate.strftime('%Y-%m-%d %H:%M:%S'),
            Description=transaction.Description
        )
        for transaction in transactions
    ]

@api.get("/user-debts/{user_id}", response=UserDebtsResponseSchema)
def get_user_debts(request, user_id: str):
    # Get debts the user owes to others (outgoing)
    owed_to_others = Transactions.objects.filter(OutgoingUserID__UserID=user_id).values('IncomingUserID__UserID').annotate(
        TotalDebt=Sum('Amount')
    )

    # Get debts others owe to the user (incoming)
    owed_by_others = Transactions.objects.filter(IncomingUserID__UserID=user_id).values('OutgoingUserID__UserID').annotate(
        TotalDebt=Sum('Amount')
    )

    # Format the results to match the schemas
    debts_owed_to_others = [
        DebtSummarySchema(UserID=debt['IncomingUserID__UserID'], TotalDebt=debt['TotalDebt'])
        for debt in owed_to_others
    ]

    debts_owed_by_others = [
        DebtSummarySchema(UserID=debt['OutgoingUserID__UserID'], TotalDebt=debt['TotalDebt'])
        for debt in owed_by_others
    ]

    return UserDebtsResponseSchema(
        OwedToOthers=debts_owed_to_others,
        OwedByOthers=debts_owed_by_others
    )
### User Account API ###

@api.get("/username")
def uniqueUsernameCheck(request, username: str):
    return 

@api.post("/accountCreate")
def accountCreate(request):
    # Add new user
    return

@api.post("/accountLogin")
def accountLogin(request):
    # Verify user login
    return


### Transaction API ###


@api.post("/pay/automatic")
def payTransactionAuto(request):
    # Dummy automatic payment logic (customize as needed)
    return

@api.post("/getContacts")
def getContactAmount(request, user_id: int):
    return

### Receipt Parsing API ###

@api.post("/parseReceipt")
def parse_receipt(request, receiptFile: UploadedFile):
    raw_text = extract_text_from_receipt(receiptFile)
    date = extract_date(raw_text)
    final_total_price = extract_final_total(raw_text)
    location = extract_location(raw_text)

    if final_total_price:
        return {
            "location": location,
            "date": date,
            "final_total": final_total_price
        }
    return {"error": "Final total not found"}, 400

### Helper Functions ###

def extract_text_from_receipt(image_path):
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img)
    return text

def extract_date(text):
    date_pattern = re.compile(
        r'\b(\d{2}/\d{2}/\d{4})\b|\b(\d{4}-\d{2}-\d{2})\b'
    )
    dates = date_pattern.findall(text)
    dates = [date for group in dates for date in group if date]
    if dates:
        return dates[0]
    return None

def extract_final_total(text):
    total_pattern = re.compile(r'total[:\s]*\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)', re.IGNORECASE)
    totals = total_pattern.findall(text)
    if totals:
        return totals[-1].replace(',', '')
    return None
    
def extract_location(text):
    lines = text.split('\n')
    lines = [line.strip() for line in lines if line.strip()]
    if lines:
        return lines[0]
    return None
