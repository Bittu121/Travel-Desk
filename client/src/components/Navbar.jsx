import { useEffect, useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IoLogOutOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getUserData, logout } from "../action/authAction.js";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUserDetails = async () => {
    try {
      await dispatch(getUserData());
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const { authData: user } = useSelector((state) => state.auth);

  const logOutHandler = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-end p-4 bg-white shadow-md max-md:justify-between">
        {/* Hamburger menu for mobile */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleSidebar} className="text-xl">
            <FiMenu />
          </button>
        </div>

        {/* Profile dropdown */}
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
            sx={{
              textTransform: "none",
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.user?.fullName?.charAt(0) || "U"}
            </Avatar>
            <span className="ml-2 text-gray-600">
              {user?.user?.fullName || "Profile"}
            </span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100"
            >
              <div
                onClick={logOutHandler}
                className="flex items-center space-x-1"
              >
                <IoLogOutOutline size={25} className="text-gray-500" />
                <span className="text-gray-700">Logout</span>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
