import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/sideBar";
import  Footer  from "../components/ui/footer";

interface BaseLayoutProps {}

export const tokenCTX = createContext<string>("");

const BaseLayout: React.FC<BaseLayoutProps> = () => {
  const token: string = localStorage.getItem("token") || "";

  return (
    <tokenCTX.Provider value={token}>
      <div className="w-[100%] h-[100vh]">
        <SidebarLayout></SidebarLayout>
		<Footer></Footer>
		<Outlet></Outlet>
      </div>
    </tokenCTX.Provider>
  );
};

export default BaseLayout;
