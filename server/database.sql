CREATE TABLE UserInfo (
    UserID VARCHAR(30),
    Username VARCHAR(30)
);

CREATE TABLE Transactions (
	TransactionID SERIAL PRIMARY KEY,
	OutgoingUserID VARCHAR(30),
    IncomingUserID VARCHAR(30),
    Amount INT,
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Description VARCHAR(100)
);
