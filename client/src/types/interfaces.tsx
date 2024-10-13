export interface Transaction {
    TransactionID: number;
    OutgoingUserID: string;
    IncomingUserID: string;
    Amount: number;
    PaymentDate: string;
    Description: string;
}

export interface DebtSummary {
    UserID: string;
    TotalDebt: number;
}
  
export interface UserDebts {
    OwedToOthers: DebtSummary[];
    OwedByOthers: DebtSummary[];
}