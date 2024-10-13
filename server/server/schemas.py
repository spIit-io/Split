from ninja import Schema

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