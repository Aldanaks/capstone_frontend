import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        
          <div className="flex items-center">
            <Link to="/">
              <span className="font-semibold text-2xl text-white ml-3">
             
                Fluid
              </span>
            </Link>

            <NavLink
                    to="/ourMission"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </NavLink>
          </div>
          
            </div>
          </div>    
    </nav>
  );
};

export default Navbar;
