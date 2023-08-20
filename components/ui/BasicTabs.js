import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import classes from "./BasicTabs.module.css";
import Box from "@mui/material/Box";
import ToggleButton from "../InputTool/ToggleButton";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      biggerMobile: 400,
      tablet: 500,
      laptop: 700,
      desktop: 1200,
    },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    props.passValue && setSelected(props.passValue);
  }, [props.passValue]);

  console.log(selected);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buttonHandler = (id) => {
    const existed = (id) => {
      return selected.findIndex((item) => item === id);
    };
    // updating
    if (existed(id) > -1) {
      const list = selected.filter((item) => item !== id);
      setSelected(list);
      props.listHandler(list);
    } else {
      // adding
      const newlist = [...selected, id];
      setSelected(newlist);
      props.listHandler(newlist);
    }
  };

  const inTheList = (id) => {
    const checked = selected.some((item) => item === id);
    return checked;
  };

  const cat = Object.entries(props.category).map(([key, value]) => {
    return value;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            maxWidth: {
              mobile: props.type == "AccordFliter" ? 1 : 250,
              biggerMobile: props.type == "AccordFliter" ? 1 : 100,
              tablet: props.type == "AccordFliter" ? 1 : 500,
              desktop: props.type == "AccordFliter" ? "350px" : 700,
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {cat.map((item) => (
              <Tab
                className={classes.tabs}
                key={item.cat}
                label={item.cat}
                {...a11yProps(item.index)}
              />
            ))}
          </Tabs>
        </Box>
        {/* {props.place.map((item)=> (<TabPanel value={value} index={item.index}> {item.items.map((item)=><button id={item} key={item} onclick={buttonHandler(item)}>{item}</button>)} </TabPanel>))} */}
        {props.category.map((item) => (
          <TabPanel
            sx={{
              display: "flex-wrap",
              margin: "auto",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            value={value}
            key={item.index}
            index={item.index}
          >
            {item.items.map((item) => (
              <ToggleButton
                id={item}
                key={item}
                value={inTheList(item)}
                Click={buttonHandler}
              />
            ))}
          </TabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
}
