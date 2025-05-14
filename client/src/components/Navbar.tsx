import { useEffect, useRef, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { toast } from "sonner";
import { LogOut, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/Redux/features/auth/authSlice";
import { cn } from "@/lib/utils";
import menuItems from "@/data/menuItems";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile nav if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsNavOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={cn(
        "fixed px-12 top-0 left-0 right-0 z-[100] max-w-7xl mx-auto transition-colors duration-300",
        {
          "bg-gray-800 shadow-md":
            isScrolled ||
            (location.pathname !== "/" && location.pathname !== "/about"),
        }
      )}
    >
      <div className="w-full px-4 md:px-8 max-w-[1440px] mx-auto flex justify-between items-center py-4 md:py-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-400">
          Cycle Mart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12 text-[14px] font-normal font-questrial">
          {menuItems.map((menu, idx) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu.path}
                className={`${
                  isActive ? "text-teal-600 font-semibold" : "text-white"
                } hover:text-teal-600 transition-all duration-300`}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-white hover:text-primary transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 cursor-pointer rounded-full transition"
              >
                <User className="w-6 h-6 text-white" />
                <MdKeyboardArrowDown className="h-5 w-5 text-gray-300" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-4 z-30">
                  <div className="flex items-center gap-3 px-4">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <h3 className="font-medium text-black">{user?.name}</h3>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard/my-profile")}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 text-sm text-black"
                  >
                    <FiUser className="h-4 w-4 text-main" />
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 text-sm text-black"
                  >
                    <RxDashboard className="h-4 w-4 text-main" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                      toast.success("Log out Successful");
                      navigate("/login");
                    }}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 text-sm text-black"
                  >
                    <BiLogOut className="h-4 w-4 text-main" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center text-white">
          {isNavOpened ? (
            <IoClose
              className="text-primary"
              onClick={() => setIsNavOpened(false)}
              size={30}
            />
          ) : (
            <IoMenu
              className="text-primary"
              onClick={() => setIsNavOpened(true)}
              size={30}
            />
          )}
        </div>

        {/* Mobile Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-screen bg-gray-800 z-50 transform transition-transform duration-500 ease-in-out ${
            isNavOpened ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "70%" }}
        >
          <div className="flex flex-col px-6 py-8 gap-6">
            <Link to="/" className="font-semibold text-white text-xl">
              Cycle Mart
            </Link>
            <div className="flex flex-col gap-4">
              {menuItems.map((menu, idx) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link
                    key={idx}
                    to={menu.path}
                    onClick={() => setIsNavOpened(false)}
                    className={`${
                      isActive ? "text-primary" : "text-white"
                    } text-[16px]`}
                  >
                    {menu.name}
                  </Link>
                );
              })}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => setIsNavOpened(false)}
                  className="text-white"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsNavOpened(false)}
                    className="text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                      toast.success("Log out Successful");
                      navigate("/login");
                      setIsNavOpened(false);
                    }}
                    className="flex items-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
