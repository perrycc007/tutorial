import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function MiniSlider(props) {
  const [value1, setValue1] = React.useState([props.dmin, props.dmax]);
  const minDistance = props.minD;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const value = [Math.min(newValue[0], value1[1] - minDistance), value1[1]];
      setValue1(value);
    } else {
      const value = [value1[0], Math.max(newValue[1], value1[0] + minDistance)];
      setValue1(value);
    }
  };
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const value = [Math.min(newValue[0], value1[1] - minDistance), value1[1]];
      props.passValue(value);
    } else {
      const value = [value1[0], Math.max(newValue[1], value1[0] + minDistance)];
      props.passValue(value);
    }
  };

  return (
    <Box sx={{ width: { xs: 200, sm: 300 } }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        onChangeCommitted={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </Box>
  );
}
