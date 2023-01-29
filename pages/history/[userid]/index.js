import CasesList from "../../../components/Case/CasesList";
import axios from "axios";
const Cases = (props) => {
  console.log(props.cases);
  async function toggleCaseStatusHandler(id, status) {
    console.log(id,status)
    const response = await axios.patch(
      `http://localhost:3001/history/updateCaseStatus`,
      {
        studentid: id,
        status: status,
      }
    );
    response.data.result;
  }

  return (
    <div>
      <h2>補習申請歷史</h2>
      {props.cases?<CasesList
        cases={props.cases}
        favourite={[]}
        type="edit"
        toggleStatusHandler={toggleCaseStatusHandler}
      />:''}
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // fetch data from an API
  const response = await axios.get(
    `http://localhost:3001/history/${params.userid}`
  );
  return {
    props: {
      cases: response.data.result,
    },
    revalidate: 1,
  };
}

export default Cases;
