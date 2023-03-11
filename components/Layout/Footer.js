import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__column}>
        <h3>Column 1</h3>
        <ul className={styles.footer__list}>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </div>
      <div className={styles.footer__column}>
        <h3>Column 2</h3>
        <ul className={styles.footer__list}>
          <li><a href="#">Link 4</a></li>
          <li><a href="#">Link 5</a></li>
          <li><a href="#">Link 6</a></li>
        </ul>
      </div>
      <div className={styles.footer__column}>
        <h3>Column 3</h3>
        <ul className={styles.footer__list}>
          <li><a href="#">Link 7</a></li>
          <li><a href="#">Link 8</a></li>
          <li><a href="#">Link 9</a></li>
        </ul>
      </div>
      <div className={styles.footer__copy}>
        &copy; 2023 My Website Name
      </div>
    </footer>
  );
};

export default Footer;
