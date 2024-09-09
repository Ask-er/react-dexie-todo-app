import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "./Sidebar";
import Warning from "./Warning";
import TopNavigation from "./TopNavigation";

export default function Layout() {
  return (
    //bg-[radial-gradient(circle_farthest-side_at_bottom_left,rgba(0,149,255,0.6)_0%,rgba(0,124,226,0.6)_10%,rgba(0,99,198,0.6)_20%,rgba(0,76,170,0.6)_30%,rgba(0,54,143,0.6)_40%,rgba(0,35,116,0.6)_50%,rgba(0,11,91,0.6)_60%,rgba(0,7,67,0.6)_70%,rgba(0,3,44,0.6)_80%,rgba(0,1,22,0.6)_100%)]
    <>
      <div className="hidden md:flex dark:bg-background bg-white transition-colors duration-300">
        <Sidebar />
        <main className="content-container">
          {/* <Blob /> */}
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
