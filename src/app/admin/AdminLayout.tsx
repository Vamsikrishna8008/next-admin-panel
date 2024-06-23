"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
const AdminLayout = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const windowResize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex h-full w-full">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="ml-0 md:ml-[220px] lg:ml-[300px]  overflow-y-auto py-8 px-8 pb-32 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
