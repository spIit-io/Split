from ninja import NinjaAPI
from pydantic import BaseModel
import pytesseract
from PIL import Image
import re

api = NinjaAPI()

# Schemas
class TransactionSchema(BaseModel):
    user_id: int
    amount: float
    description: str

class UserSchema(BaseModel):
    username: str
    password: str

# Dummy in-memory storage for demonstration
users = []
transactions = []

### User Account API ###

@api.get("/username")
def uniqueUsernameCheck(request, username: str):
    return 

@api.post("/accountCreate")
def accountCreate(request, user: UserSchema):
    # Add new user
    return

@api.post("/accountLogin")
def accountLogin(request, user: UserSchema):
    # Verify user login
    return


### Transaction API ###
@api.post("/new")
def newTransaction(request, transaction: TransactionSchema):
    # Add new transaction
    
    return

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

@api.post("/parse")
def parse_receipt(request):
    image_path = request.data.get("image_path")  # Replace this with actual file input handling
    raw_text = extract_text_from_receipt(image_path)
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
