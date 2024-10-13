export interface Transaction {
    TransactionID: number;
    OutgoingUserID: string;
    IncomingUserID: string;
    Amount: number;
    PaymentDate: string;
    Description: string;
}