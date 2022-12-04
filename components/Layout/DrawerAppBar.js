import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import userStore from "../../stores/stores";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const getUserid = userStore((state) => state.userId);
  const isLoggedin = userStore((state) => state.isLoggedin);
  const logOutAction = userStore((state) => state.logoutUserid);
  const cleanFavourite = userStore((state) => state.cleanFavourite);
  const toggleIstutor = userStore((state) => state.toggleIstutor);
  const isTutor = userStore((state) => state.isTutor);
  const logoutHandler = () => {
    logOutAction();
    cleanFavourite();
    // optional: redirect the user
  };
  const toggleIstutorHandler = () => {
    toggleIstutor(!isTutor);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isLoggedinItem = { apply: "申請補習", favourite: "我的最愛" };
  const isNotLoggedinItem = { cases: "補習個案", tutor: "精英導師" };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TutorElite
      </Typography>
      <Divider />
      <List>
        {isLoggedin &&
          Object.entries(isLoggedinItem).map(([key, value]) => (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link href={`/${key}`}>{value}</Link>
              </ListItemButton>
            </ListItem>
          ))}
        {Object.entries(isNotLoggedinItem).map(([key, value]) => (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link href={`/${key}`}>{value}</Link>
            </ListItemButton>
          </ListItem>
        ))}

        {isLoggedin && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link href={`/profile/${getUserid}`}>個人資料</Link>
            </ListItemButton>
          </ListItem>
        )}
        {isLoggedin && (
          <Button variant="outlined" onClick={toggleIstutorHandler}>
            {isTutor ? "導師模式" : "學生模式"}
          </Button>
        )}
        {isLoggedin && (
          <Button variant="contained" onClick={logoutHandler}>
            登出
          </Button>
        )}
        {!isLoggedin && (
          <Button variant="contained">
            <Link href="/auth">登入</Link>
          </Button>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TutorElite
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoggedin && (
              <Button>
                <Link href="/apply">申請補習</Link>
              </Button>
            )}
            <Button>
              <Link href="/cases">補習個案</Link>
            </Button>
            <Button>
              <Link href="/tutor">精英導師</Link>
            </Button>
            {isLoggedin && (
              <Button>
                <Link href={`/profile/${getUserid}`}>個人資料</Link>
              </Button>
            )}
            {isLoggedin && (
              <Button>
                <Link href="/favourite">我的最愛</Link>
              </Button>
            )}
            {isLoggedin && (
              <Button variant="outlined" onClick={toggleIstutorHandler}>
                {isTutor ? "導師模式" : "學生模式"}
              </Button>
            )}
            {isLoggedin && (
              <Button variant="contained" onClick={logoutHandler}>
                登出
              </Button>
            )}
            {!isLoggedin && (
              <Button variant="contained">
                <Link href="/auth">登入</Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
