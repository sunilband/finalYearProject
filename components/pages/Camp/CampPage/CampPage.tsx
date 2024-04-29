"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getBloodbank } from "@/lib/apiCalls/bloodbank/getBloodBank";
import { getCamp } from "@/lib/apiCalls/camp/getCamp";
import Aside from "./AsideForCamp";
import { BackgroundBeams } from "@/components/Backgrounds/Beams/BackgroundBeams";
import DonorManegement from "./DonorManagement/DonorManagement";
import DonationsManagement from "./DonationsManagement/DonationsManagement";
import { ChatLayout } from "../Chat/chat-layout";
type Props = {};

const CampPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getCamp().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data);
          } else {
            router.push("/camp/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated">
      {/* left sidebar */}
      {user && user.organizationName && user.status == "Approved" ? (
        <>
          <Aside
            {...{
              selectedLink,
              setSelectedLink,
            }}
          />
          {/* View */}
          <div className="border relative w-full h-[90%] ml-2 sm:ml-20 mr-4 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center bg-opacity-80 bg-background">
            {/* Background */}
            <BackgroundBeams />
            {selectedLink === "Dashboard" && <div>Dashboard</div>}
            {selectedLink === "Donors" && <DonorManegement />}
            {selectedLink === "Donations" && <DonationsManagement />}
            {selectedLink === "Chat" && (
              <ChatLayout defaultLayout={undefined} navCollapsedSize={8} />
            )}
            {selectedLink === "Analytics" && <div>Analytics</div>}
            {selectedLink === "Settings" && <div>Settings</div>}
          </div>
        </>
      ) : (
        <p>Approval Pending by Affiliated Blood Bank</p>
      )}
    </div>
  );
};

export default CampPage;
