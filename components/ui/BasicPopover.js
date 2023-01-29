import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ProfileForm from "../Form/ProfileForm";

import Axios from "axios";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getProfile();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function getProfile() {
    const response = await Axios.get(
      `http://localhost:3001/profile/${props.userid}`
    );
    const tutor = await Axios.get(
      `http://localhost:3001/tutor/${props.userid}`
    );
    setProfile(response.data.result);
    setTutorProfile(tutor.data.result);
  }

  console.log(profile);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        個人資料
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ProfileForm
          profile={profile}
          tutor={tutorProfile}
          type={props.type}
          admin={true}
        />
      </Popover>
    </div>
  );
}
