import { useState } from "react";

interface TransactionItemProps {
  person: string;
  date: string;
  amount: number;
  message?: string;
  resolved?: boolean;
}

function TransactionItem({
  person,
  date,
  amount,
  message = "No message provided",
  resolved = false,
}: TransactionItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      className="border border-[#222] p-5 rounded-md text-lg transition-all w-full"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 justify-between">
          <img
            className="h-12 w-12 rounded-full"
            src={"https://media.tenor.com/Tw8FiJa_KWsAAAAe/alpha-wolf.png"}
            alt="Profile"
          />
          <div className="text-xl">{person}</div>
        </div>
        <div
          className={`text-xl text-[#009a3b] ${resolved && "line-through"}`}
        >
          ${amount}
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col mt-5">
          <div className="self-start">Note: {message}</div>
          <hr className="border border-dotted border-[#222] m-2" />
          <button className="bg-[#fac0af] w-16 self-center rounded-md">
            Pay
          </button>
        </div>
      )}
    </button>
  );
}

export default TransactionItem;