import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons(props) {
  const [type, setType] = useState("Cases");

  const handleType = (event, type) => {
    setType(type);
    props.typeHandler(type)
  };

  return (
    <ToggleButtonGroup
      value={type}
      exclusive
      onChange={handleType}
      aria-label="type"
    >
      <ToggleButton value="Cases" aria-label="left aligned">
        補習個案
      </ToggleButton>
      <ToggleButton value="Tutor" aria-label="centered">
        補習導師
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
