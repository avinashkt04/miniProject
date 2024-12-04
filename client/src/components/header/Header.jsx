import React, { useEffect } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "..";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "@/store/services/userAction";
import { resetUserState } from "@/store/features/userSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

function Header() {
  const { status, loading, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAPI());
  };

  useEffect(() => {
    return () => dispatch(resetUserState());
  }, [loading]);

  return (
    <div className="bg-[#020817c1]/90 border-b border-gray-700/30 px-8 py-4">
      <div className="flex justify-between items-center">
        <NavLink to={"/"}>
          <h2 className="mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Medi<span className="text-cyan-500">Bot</span>
          </h2>
        </NavLink>
        <div className="flex justify-end space-x-2">
          {!status && (
            <NavLink to={"login"}>
              <Button className="bg-blue-600 hover:bg-blue-800 text-white">
                Login
              </Button>
            </NavLink>
          )}
          {!status && (
            <NavLink to={"signup"}>
              <Button className="bg-green-600 hover:bg-green-800 text-white">
                Signup
              </Button>
            </NavLink>
          )}
          {status && (
            <NavLink to={"Assistant"}>
              <Button variant="secondary">Assistant</Button>
            </NavLink>
          )}
          {status && (
            <Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <AvatarImage src={userInfo?.displayImage}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="h-10 overflow-hidden">
                    <Button onClick={handleLogout} variant="ghost">
                      <LogOut className="mr-2" />
                      <span>Logout</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
