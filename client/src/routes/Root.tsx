import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <div className="flex grow">
          <div className="bg-[#222] w-1/6">
            <div className="text-center flex flex-col gap-16">
              <div className="pt-10 text-2xl font-bold text-[#00b4d8]">
                split.io
              </div>
              <ul className="flex flex-col gap-5 ">
                <li>
                  <Link to="">Dashboard</Link>
                </li>
                <li>
                  <Link to="contacts">Contacts</Link>
                </li>
                <li>
                  <Link to="transactions">Transactions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-[#fae6e0] w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
