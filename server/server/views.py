from ninja import Schema
from typing import List

class DebtSchema(Schema):
    name: str
    amount: float

debts = []

@api.post("/debts/")
def add_debt(request, payload: DebtSchema):
    debts.append(payload.dict())
    return {"msg": "Debt added successfully", "debts": debts}

@api.get("/debts/", response=List[DebtSchema])
def list_debts(request):
    return debts
