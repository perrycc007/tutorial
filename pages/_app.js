import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import classes from "./_app.module.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className={classes.component}>
        <Component  {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
