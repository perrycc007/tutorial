import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen() {
  return (
    <div className="CircularProgress" >
        <CircularProgress color="inherit" />
    </div>
  );
}
