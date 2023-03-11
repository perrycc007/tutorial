import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useRouter } from "next/router";

import styles from "./LandingPage.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>快速並免費搜找你的導師</h1>
          <div className={styles.heroButtons}>
            <Button variant="contained" onClick={() => router.push("/about")}>
              尋找導師
            </Button>
            <Button variant="contained" onClick={() => router.push("/contact")}>
              成為導師
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoImage}>
          <img src="JohnSin.jpg" alt="Information Image" />
        </div>
        <div className={styles.infoText}>
          <h3>我們是誰</h3>
          <p>
            xxx
            補習介紹平台由本地大學生創立。我們認為現時大部分補習介紹平台的中介費過高
            (介乎首星期至三星期的全數學費)
            ，並且質素參差。因此我們創立了只收首堂中介費的補習介紹平台，
            從而吸引更多高質導師加入我們平台。 xxx的宗旨為提供專業
            、可靠而且性比價最高的補習介紹服務給家長/學生及導師。
          </p>
        </div>
      </div>
      <div className={styles.cardSection}>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image="/path/to/image1.jpg"
            alt="Card Image 1"
          />
          <CardContent>
            <h3>中學教師 Kwan sir</h3>
            <p>
              本人現為香港科技大學 Year
              4學生。有四年豐富私補經驗，亦有一年到中學做實習老師的經驗，
              為成為全職教師而作準備。希望能以自己的經驗和能力幫助同學在Dse取得佳績，2023
              Dser 加油 !
            </p>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image="/path/to/image2.jpg"
            alt="Card Image 2"
          />
          <CardContent>
            <h3>香港理工大學屋宇設備工程生 Calvin Sir</h3>
            <p>
              現就讀香港理工大學。有三年為傳統名校、地區名校中、小學生的補習經驗。本人教學有耐性，
              用心，會提供自製筆記給學生，並樂意於課餘時間以WhatsApp解答學生問題。
            </p>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image="/path/to/image3.jpg"
            alt="Card Image 3"
          />
          <CardContent>
            <h3>香港城市大學工商管理學生 Perry sir</h3>
            <p>
              專補中小學生英文、中學物理和生物科。本人於 DSE
              英文科Reading分卷取得 5**，另外於物理和生物科皆取得 5
              的佳績。本人教學方式靈活
              、有趣，會以自製精華筆記和分享個人心得來幫助不同程度的學生。
            </p>
          </CardContent>
        </Card>
      </div>
      <section className={styles.pinContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.circle}></div>成績認證
            </li>
            <li className={styles.listItem}>
              <div className={styles.circle}></div>立即處理
            </li>
            <li className={styles.listItem}>
              <div className={styles.circle}></div>演算法配對
            </li>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <button className={styles.button}>成為導師</button>
          <button className={styles.button}>尋找導師</button>
        </div>
      </section>
    </div>
  );
}
