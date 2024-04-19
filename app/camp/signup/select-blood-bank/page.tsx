import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import SelectBloodBank from "@/components/pages/Camp/CampSignup/SelectBloodBank";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <SelectBloodBank />
    </div>
  );
};

export default page;