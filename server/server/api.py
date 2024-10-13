from ninja import NinjaAPI, File
from ninja.files import UploadedFile
from typing import List
from pydantic import BaseModel
from django.contrib.auth.models import User
from datetime import datetime
from .models import Transactions, UserInfo
from .schemas import TransactionSchema, TransactionResponseSchema

api = NinjaAPI()

@api.post("/new", response=TransactionResponseSchema)
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

@api.get("/get")
def getTransaction(request, user_id: int):
    # Get all transactions for a specific user
    return

@api.post("/getContacts")
def getContactAmount(request, user_id: int):
    return

### Receipt Parsing API ###

@api.post("/parseReceipt")
def parse_receipt(request, file: UploadedFile):
    raw_text = extract_text_from_receipt(file)
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
