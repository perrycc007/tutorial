import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ProfileForm from "../Form/ProfileForm";
import LoadingScreen from "../Layout/LoadingScreen";
import Axios from "axios";
import classes from "./BasicPopover.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  padding: "0",
  maxHeight: "99vh",
  overflow: "auto",
  borderRadius: "10px",
  bgcolor: "background.paper",
};

export default function BasicPopover(props) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    document.body.style.overflow = "hidden";
    getProfile();
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  async function getProfile() {
    try {
      const response = await Axios.get(
        `http://localhost:3001/profile/${props.userid}`
      );
      const tutor = await Axios.get(
        `http://localhost:3001/tutor/${props.userid}`
      );
      setProfile(response.data.result);
      setTutorProfile(tutor.data.result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const handleCloseModal = () => {
    handleClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>個人資料</Button>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClick={handleBackdropClick}
      >
        <Box
          sx={{
            ...style,
            overflowY: "scroll", // Enable vertical scrolling inside the modal box
          }}
          className={classes.scrollContainer}
        >
          {loading ? (
            <LoadingScreen />
          ) : (
            <div>
              <ProfileForm
                profile={profile}
                tutor={tutorProfile}
                type={props.type}
                admin={true}
                closeModal={handleCloseModal}
              />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
