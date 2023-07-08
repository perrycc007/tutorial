import CaseList from "../../components/Case/CaseList";
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../../stores/stores";

const Cases = () => {
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserid = userStore((state) => state.userId);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/history/${getUserid}`
        );
        setCases(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function toggleCaseStatusHandler(id, status) {
    console.log(id, status);
    try {
      const response = await axios.patch(
        `http://localhost:3001/history/updateCaseStatus`,
        {
          studentid: id,
          status: status,
        }
      );
      response.data.result;
    } catch (error) {
      console.error("Error toggling case status:", error);
    }
  }

  return (
    <div>
      <h1>補習申請歷史</h1>
      {loading && <p>Loading...</p>}

      {!loading && (
        <div>
          {cases ? (
            <CaseList
              cases={cases}
              favourite={[]}
              type="edit"
              toggleStatusHandler={toggleCaseStatusHandler}
            />
          ) : (
            <p>並沒有任何歷史</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cases;
