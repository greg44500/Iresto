import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useState } from "react";
import Dropdown from "./Dropdown";
function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-16 bg-black text-white flex items-center justify-between px-1 shadow-lg">
      <p className="font-[Poppins] text-2xl text-brique2 tracking-wider font-semibold">
        MERCURIALE
      </p>
      {userInfo ? (
        <>
          <ul className="flex flew-row">
            <li className="flex items-center justify-center relative">
              {userInfo.firstname} {userInfo.lastname}
              <button
                onClick={toggleDropdown}
                size={10}
                className="ml-1 hover:text-brique3 hover:cursor-pointer transition-all"
              >
                {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-7 mt-2 w-40 bg-white/80 rounded-md shadow-lg text-black transition opacity-100 translate-y-0 duration-300">
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm transition duration-300 border-l-transparent hover:bg-brique2/50 font-[Roboto] hover:border-l-brique2 border-l-4"
                  >
                    Mon Profil
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm transition duration-300 border-l-transparent hover:bg-brique2/50 font-[Roboto] hover:border-l-brique2 border-l-4"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </li>
          </ul>
        </>
      ) : (
        <>
          <div>
            <FaRegUserCircle size={30} />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
