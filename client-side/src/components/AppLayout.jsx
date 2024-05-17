import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex flex-1 w-full flex-col items-center gap-[15px] bg-gray-100 overflow-y-auto">
      {/* header section */}
      <Header className="fixed w-full top-0 flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs z-50" />
      <Outlet />

      <footer className="bg-gray-200 text-center py-4 w-full">
        <p className="text-sm text-gray-600">© 2024 Oncology MS. All rights reserved to Codeless.</p>
      </footer>
    </div>
  );
}
export default AppLayout;
