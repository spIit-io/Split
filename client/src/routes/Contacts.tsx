import { useEffect, useState } from "react";
import { getUserDebts } from "../services/Server/serverApi";
import {UserDebts, DebtSummary} from "../types/interfaces"
import { photoAlgorithm } from "../utils/photoUtils";

function Contacts() {
    const userID = "testuser1"
    const [userDebts, setUserDebts] = useState<UserDebts | null>(null);
  
    useEffect(() => {
      const fetchUserDebts = async () => {
        const data = await getUserDebts(userID);
        setUserDebts(data);
      };
      fetchUserDebts();
    }, [userID]);
  
    return (
      <div className="text-2xl text-[#222] p-20 no-scrollbar">
        <div className="text-center mb-10">Debts Summary</div>
  
        {/* Debts the user owes to others */}
        <div className="mb-10">
          <h2 className="text-xl mb-5">Debts You Owe</h2>
          <ul className="flex flex-col gap-5">
            {userDebts?.OwedToOthers.length ? (
              userDebts.OwedToOthers.map((debt) => (
                <li key={debt.UserID} className="border border-[#222] p-5 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <img
                        className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-[1px] px-[1px]"
                        src={photoAlgorithm(debt.UserID)}
                        alt="Profile"
                      />
                      <div className="text-xl">{debt.UserID}</div>
                    </div>
                    <div className="text-xl text-[#009a3b]">${debt.TotalDebt/100}</div>
                  </div>
                </li>
              ))
            ) : (
              <li>No debts to others.</li>
            )}
          </ul>
        </div>
  
        {/* Debts others owe to the user */}
        <div>
          <h2 className="text-xl mb-5">Debts Owed to You</h2>
          <ul className="flex flex-col gap-16">
            {userDebts?.OwedByOthers.length ? (
              userDebts.OwedByOthers.map((debt) => (
                <li key={debt.UserID} className="border border-[#222] p-5 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <img
                        className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-[1px] px-[1px]"
                        src={photoAlgorithm(debt.UserID)}
                        alt="Profile"
                      />
                      <div className="text-xl">{debt.UserID}</div>
                    </div>
                    <div className={`text-xl ${debt.TotalDebt < 0 ? 'text-[#009a3b]' : 'text-[#f00]'}`}>${debt.TotalDebt/100}</div>
                  </div>
                </li>
              ))
            ) : (
              <li>No one owes you anything.</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  
export default Contacts;