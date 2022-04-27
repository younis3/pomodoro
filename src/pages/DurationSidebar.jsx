import React, { useState } from "react";
import InputSlider from "../components/InputSlider";

const DurationSideBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <InputSlider />
    </div>
  );
};

export default DurationSideBar;
