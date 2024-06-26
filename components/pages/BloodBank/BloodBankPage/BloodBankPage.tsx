"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getBloodbank } from "@/lib/apiCalls/bloodbank/getBloodBank";
import Aside from "./AsideForBloodBank";
import { BackgroundBeams } from "@/components/Backgrounds/Beams/BackgroundBeams";
import CampManagement from "./CampManagement/CampManagement";
import DonationManagement from "./DonationManagement/DonationManagement";
import { ChatLayout } from "@/components/Chat/chat-layout";
import { bloodBankChat } from "@/lib/apiCalls/Chat/boodBankChat";
type Props = {};

const BloodBankPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getBloodbank().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data);
          } else {
            router.push("/bloodbank/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated drop-shadow-md px-2">
      {user && user.name && user.status == "Approved" ? (
        <>
          {/* left sidebar */}
          <Aside
            {...{
              selectedLink,
              setSelectedLink,
            }}
          />
          {/* View */}
          <div className="sm:border relative w-full h-[90%] sm:ml-20 sm:mr-2 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center sm:bg-opacity-80 bg-opacity-0 sm:bg-background">
            {selectedLink === "Dashboard" && <div>Dashboard</div>}
            {selectedLink === "Donation Camps" && <CampManagement />}
            {selectedLink === "Donations" && <DonationManagement />}
            {selectedLink === "Chat" && (
              <ChatLayout
                defaultLayout={undefined}
                navCollapsedSize={8}
                chatFunction={bloodBankChat}
              />
            )}
            {selectedLink === "Analytics" && <div>Analytics</div>}
            {selectedLink === "Settings" && <div>Settings</div>}
          </div>
        </>
      ) : (
        <p>Approval Pending By Admin or unauthorized</p>
      )}
    </div>
  );
};

export default BloodBankPage;
