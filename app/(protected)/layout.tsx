
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { auth } from "@clerk/nextjs/server";
import React from "react"


const getRoleServerSide = async (): Promise<string> => {
    const { sessionClaims } = await auth();
    return sessionClaims?.metadata?.role?.toLowerCase() || "patient";
};
const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {

    const role = await getRoleServerSide();
    // return <div className="w-full flex bg-gray-200">
    //     <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">  <Sidebar role={role} />  </div>
    //     <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
    //         <Navbar />
    //         <div className="h-full w-full p-2 overflow-y-scroll">{children}</div>
    //     </div>
    // </div >
    return (
        <div className="w-full flex bg-gray-200">
            {/* Sidebar */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] fixed top-0 left-0 bottom-0 bg-white z-10">
                <Sidebar role={role} />
            </div>

            {/* Main Content */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] bg-[#F7F8FA] flex flex-col">
                {/* Navbar */}

                <Navbar />


                {/* Scrollable Children */}
                <div className="pt-[60px] overflow-y-auto flex-1 p-2">
                    {children}
                </div>
            </div>
        </div>
    );


};

export default ProtectedLayout;