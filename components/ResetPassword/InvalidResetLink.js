import { Container, Card, CardContent, Typography } from "@mui/material";
import classes from "./ResetPassword.module.css";

export default function InvalidResetLink() {
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            重置鏈接無效
          </Typography>
          <Typography variant="body1">
            您使用的重置鏈接無效或已過期。請請求一個新的重置鏈接並重試。{" "}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
