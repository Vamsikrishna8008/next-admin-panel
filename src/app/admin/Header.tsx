"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MenuIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { getCookies, deleteCookie } from "cookies-next";

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const cookies = getCookies();
  const userDetails = JSON.parse(
    decodeURIComponent(cookies["userDetails"] ?? "") ?? "{}" ?? {}
  );

  const handleLogout = () => {
    deleteCookie("userDetails");
    router.replace("/login");
  };
  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-md p-4 ">
        <div className="flex items-center flex-row justify-between pr-10  w-screen">
          <div className="text-2xl font-semibold text-gray-800">
            Admin Panel
          </div>
          <div className="flex items-center gap-3 ">
            {isSidebarOpen ? (
              <Button
                variant={"outline"}
                size={"icon"}
                className="md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XIcon size={24} />
              </Button>
            ) : (
              <Button
                variant={"outline"}
                size={"icon"}
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuIcon size={24} />
              </Button>
            )}

            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-3 cursor-pointer ">
                  <Avatar className="bg-slate-200 rounded-full ">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="w-12 h-12 rounded-full"
                    />
                  </Avatar>
                  <div className="hidden md:flex">
                    <h1>{userDetails.username}</h1>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col bg-gray-100 w-56 p-2 gap-2 ">
                  <Button className="bg-sky-200 w-full rounded">Profile</Button>
                  <Button
                    className="bg-red-400 w-full rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
