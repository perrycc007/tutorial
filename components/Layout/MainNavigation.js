import Link from "next/link";
import classes from "./MainNavigation.module.css";
import userStore from "../../stores/stores";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const MainNavigation = () => {
  const getUserid = userStore((state) => state.userId);
  const Loggedin = userStore((state) => state.isLoggedin);
  const logOutAction = userStore((state) => state.logoutUserid);
  const cleanFavourite = userStore((state) => state.cleanFavourite);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const logoutHandler = () => {
    logOutAction();
    cleanFavourite();
    // optional: redirect the user
  };
  const toggleIstutorHandler = () => {
    toggleIstutor(!isTutor);
  };
  const menuHandler = () => {
    setMenuState((prev) => !prev);
  };

  useEffect(() => {
    setIsLoggedin(Loggedin);
  }, [Loggedin]);

  if (!isLoggedin) {
    return null;
  }

  return (
    <div>
      <nav className={classes.nav}>
        <Link href="/">
          <div className={classes.logo}>Tutor Elite</div>
        </Link>

        <ul className={!menuState ? classes.navbar : classes.navbarActive}>
          {isLoggedin && (
            <li className={classes.navbarli}>
              <Link href="/apply">
                <div className={classes.navbarliLink}>申請補習</div>
              </Link>
            </li>
          )}
          <li className={classes.navbarli}>
            <Link href="/cases">
              <div className={classes.navbarliLink}>補習個案</div>
            </Link>
          </li>
          <li className={classes.navbarli}>
            <Link href="/tutor">
              <div className={classes.navbarliLink}>精英導師</div>
            </Link>
          </li>
          {isLoggedin && (
            <li className={classes.navbarli}>
              <Link href={`/profile/${getUserid}`}>
                <div className={classes.navbarliLink}>個人資料</div>
              </Link>
            </li>
          )}
          {isLoggedin && (
            <li className={classes.navbarli}>
              <div className={classes.navbarliLink}>
                <Link href="/favourite">
                  <div className={classes.navbarliLink}>我的最愛</div>
                </Link>
              </div>
            </li>
          )}
          {isLoggedin && (
            <li className={classes.navbarli}>
              <div className={classes.navbarliLink}>
                <Link href={`/history/${getUserid}`}>
                  <div className={classes.navbarliLink}>申請歷史</div>
                </Link>
              </div>
            </li>
          )}

          {isLoggedin && (
            <li className={classes.navbarli} onClick={logoutHandler}>
              <div className={classes.navbarliLink}>登出</div>
            </li>
          )}
          {!isLoggedin && (
            <li className={classes.navbarli}>
              <Link href="/auth">
                <div className={classes.navbarliLink}>登入</div>
              </Link>
            </li>
          )}
        </ul>

        <div className={classes.mobile} onClick={menuHandler}>
          {menuState ? (
            <CloseIcon className={classes.icon} />
          ) : (
            <MenuIcon className={classes.icon} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainNavigation;
