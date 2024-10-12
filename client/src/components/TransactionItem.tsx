interface TransactionItemProps {
  sender: string;
  date: string;
  amount: number;
}

function TransactionItem({ sender, date, amount }: TransactionItemProps) {
  return (
    <>
      <div className="rounded-md text-lg flex gap-10">
        <div>{date}</div>
        <div>{sender}</div>
        <div>${amount}</div>
      </div>
    </>
  );
}

export default TransactionItem;
