import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "./Sidebar";
import Warning from "./Warning";
import TopNavigation from "./TopNavigation";

export default function Layout() {
  return (
    <>
      <div className="hidden md:flex dark:bg-background bg-white transition-colors duration-300 overflow-hidden">
        <Sidebar />
        <main className="content-container">
          <TopNavigation />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Warning />
    </>
  );
}
