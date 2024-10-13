import Transactions from "./Transactions";
import NewPayment from "./NewPayment";
import Contacts from "./Contacts";
function Dashboard() {
  return (
    <>
      <div className="flex flex-col items-center pt-10 w-full">
        <div className = "text-4xl text-[#222] items-center">
          Split
        </div>
      </div>
      <div className="flex flex-col items-center p-10 h-full">
        <div className="grid grid-cols-2 gap-4 w-full ">
          <div className="shadow-2xl  bg-[#e6d3cd] text-[#222] w-full h-full rounded-md overflow-auto">
            <Transactions></Transactions>
          </div>
          <div className="grid gap-4 grid-row-2">
            <div className="shadow-2xl  bg-[#e6d3cd] text-[#222] w-full h-full rounded-md">
              <Contacts></Contacts>
            </div>
            <div className="border border-solid border-[#222] text-[#222] w-full h-full rounded-md">
              hi
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
