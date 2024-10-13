import { Outlet, Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

function Root() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <div className="flex grow">
          <div className="bg-[#222] w-64 shadow-lg fixed h-full top-0">
            <div className="text-center flex flex-col gap-8">
              <div className="pt-8 text-2xl font-bold text-[#00b4d8] pl-14">
                <Link to="">
                  <img className="w-32" src={Logo} />
                </Link>
              </div>
              <ul className="flex flex-col gap-5 ">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive, isPending }) =>
                      isActive && "underline"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="transactions"
                    className={({ isActive, isPending }) =>
                      isActive && "underline"
                    }
                  >
                    Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="contacts"
                    className={({ isActive, isPending }) =>
                      isActive && "underline"
                    }
                  >
                    Contacts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className={({ isActive, isPending }) =>
                      isActive && "underline"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <button className="bg-[#fae6e0] text-black py-2 px-4 border rounded">
                    <Link to="new">New Payment</Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-[#fae6e0] ml-64 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
