import { Container, Card, CardContent, Typography } from "@mui/material";
import styles from "./ResetPassword.module.css";
import { useState } from 'react';
const ResetComplete = () => {
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            密碼重置完成
          </Typography>
          <Typography variant="body1">
            您的密碼已成功重置。請使用您的登錄 新密碼。
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetComplete;
