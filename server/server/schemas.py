from ninja import Schema
from typing import List

class TransactionSchema(Schema):
    OutgoingUserID: str
    IncomingUserID: str
    Amount: int
    Description: str

class TransactionResponseSchema(Schema):
    TransactionID: int
    OutgoingUserID: str
    IncomingUserID: str
    Amount: int
    PaymentDate: str
    Description: str

class DebtSummarySchema(Schema):
    UserID: str
    TotalDebt: int

class UserDebtsResponseSchema(Schema):
    OwedToOthers: List[DebtSummarySchema]
    OwedByOthers: List[DebtSummarySchema]