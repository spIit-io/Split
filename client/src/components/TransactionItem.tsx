import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { photoAlgorithm } from "../utils/photoUtils";

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
      className="border border-[#222] pt-5 px-5 rounded-md text-lg transition-all w-full"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 justify-between pb-5">
          <img
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-[1px] px-[1px]"
            src={photoAlgorithm(person)}
            alt="Profile"
          />
          <div className="text-xl">{person}</div>
        </div>
        <div
          className={`text-xl ${amount < 0 ? 'text-[#009a3b]' : 'text-[#f00]'} ${resolved && "line-through"}`}
        >
          ${amount}
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col mt-5">
          <div className="self-start">Note: {message}</div>
          <hr className="border border-dotted border-[#222] m-2" />
          <div className="flex items-center justify-center gap-5 h-16 py-4">
              <PayPalScriptProvider options={{ clientId: "test" }}>
                  <PayPalButtons style={{ layout: "horizontal", "color": "black", height: 45}} />
                  <PayPalButtons fundingSource="venmo" style={{ layout: "horizontal", "color": "black", height: 45 }} />
              </PayPalScriptProvider>
          </div>
        </div>
      )}
    </button>
  );
}

export default TransactionItem;