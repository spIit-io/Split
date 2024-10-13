from ninja import NinjaAPI
import pytesseract
from PIL import Image
import re

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
    else:
        return None

def extract_final_total(text):
    total_pattern = re.compile(r'total[:\s]*\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)', re.IGNORECASE)
    totals = total_pattern.findall(text)
    if totals:
        return totals[-1].replace(',', '')
    else:
        return None
    
def extract_location(text):
    lines = text.split('\n')
    lines = [line.strip() for line in lines if line.strip()]
    if lines:
        return lines[0]
    else:
        return None
    
if __name__ == "__main__":
    image_path = input("Enter the path to your receipt image: ")
    raw_text = extract_text_from_receipt(image_path)
    date = extract_date(raw_text)
    final_total_price = extract_final_total(raw_text)
    location = extract_location(raw_text)

    if final_total_price:
        print(f"Location: {location}")
        print(f"Date: {date}")
        print(f"Final Total: ${final_total_price}")
    else:
        print("Final total after tax not found.")


api = NinjaAPI()

@api.get("/hello")
def hello(request):
    return "Hello world"

@api.post("/new")
def newTransaction(request, username: str, amount:float, message: str):
    return

@api.post("/pay")
def payTransaction()

@api.get("/get")
def getTransaction():
    return


'''
POST /transaction (add new transaction)
PUT /transaction (resolve payment)
GET /debt?userId (get debts for userId)
GET /transaction?userId (get all transactions for a user)


'''