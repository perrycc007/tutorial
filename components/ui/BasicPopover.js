import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ProfileForm from "../Form/ProfileForm";
import LoadingScreen from "../Layout/LoadingScreen";
import Axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  borderRadois: 20,
  p: 4,
};

export default function BasicPopover(props) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    getProfile();
  };
  const handleClose = () => setOpen(false);

  async function getProfile() {
    const response = await Axios.get(
      `http://localhost:3001/profile/${props.userid}`
    );
    const tutor = await Axios.get(
      `http://localhost:3001/tutor/${props.userid}`
    );
    setProfile(response.data.result);
    setTutorProfile(tutor.data.result);
    if (response.status == 200) {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>個人資料</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && <LoadingScreen />}
          {!loading && (
            <ProfileForm
              profile={profile}
              tutor={tutorProfile}
              type={props.type}
              admin={true}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
