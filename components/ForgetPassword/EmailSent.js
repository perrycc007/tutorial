import { Card, CardContent, Typography } from "@mui/material";
import styles from "./EmailSent.module.css";

export default function EmailSent() {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            郵件已發送！
          </Typography>
          <Typography variant="body1">
            一封包含如何重置密碼說明的電子郵件已發送到您的電子郵件地址。
            請檢查您的收件箱並按照提供的說明進行操作。
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
