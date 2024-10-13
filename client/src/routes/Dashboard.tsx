import Transactions from "./Transactions";
import NewPayment from "./NewPayment";
import Contacts from "./Contacts";
import { PieChart } from '@mui/x-charts/PieChart';

function Dashboard() {
  return (
    <div className="max-h-screen">
      <div className="flex flex-col items-center pt-8 w-full">
        <div className = "text-4xl text-[#222] items-center font-semibold">
          Dashboard
        </div>
      </div>
      <div className="flex items-start p-10 justify-between gap-10 h-full">
        <div className="shadow-2xl  bg-[#fae8e3] text-[#222] rounded-md overflow-auto no-scrollbar w-1/2 h-[650px]">
          <Transactions></Transactions>
        </div>
        <div className="text-[#222] rounded-md no-scrollbar w-1/2 flex flex-col justify-between h-[650px] ">
          <div className="bg-[#fae8e3] h-[300px] overflow-auto shadow-xl no-scrollbar">
            <Contacts></Contacts>
          </div>
          <div className="bg-[#fae8e3] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] h-[300px] flex flex-col items-center justify-center py-5">
            <div className="text-xl">Your Expenses</div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Misc', color:'#fbb4ae'},
                    { id: 1, value: 15, label: 'Clothes', color:'#b3cde3' },
                    { id: 2, value: 20, label: 'Food', color:'#ccebc5' },
                    { id: 3, value: 20, label: 'Life', color:'#decbe4' },
                  ],
                  innerRadius: '30%',
                  outerRadius: '100%',
                  paddingAngle: 5,
                  cornerRadius: 5,
                },
              ]}
              width={400}
              height={200}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
