import Link from "next/link";
import classes from "./MainNavigation.module.css";
import userStore from "../../stores/stores";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

const MainNavigation = () => {
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

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Tutor Elite</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link href="/auth">登入</Link>
            </li>
          )}
          {/* {isLoggedIn && (
            <li>
              <Link to='/changepassword'>Change Password</Link>
            </li>
          )} */}
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

          {/* <IconButton
            className={classes.IconButton}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {isLoggedin && (
            <>
              <Button variant="outlined" onClick={toggleIstutorHandler}>
                {isTutor ? "導師模式" : "學生模式"}
              </Button>
              <Button variant="contained" onClick={logoutHandler}>登出</Button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
