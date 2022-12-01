import AdminDisplay from "../../components/AdminDisplay/AdminDisplay";
import axios from "axios";

const Result = (props) => {
  return (
    <>
      {props.cases.map((item) => (
        <AdminDisplay match={item ? item : []} />
      ))}
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/result`);
  // const result = response? response.data.result : []
  console.log(response.data, "result");
  return {
    props: {
      cases: response.data,
    },
    revalidate: 1,
  };
}

export default Result;
