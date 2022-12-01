import CaseItem from "../Case/CaseItem";
import CasesList from "../Case/CasesList";
import Axios from "axios";

export default function AdminDisplay(props) {
  let {
    tutor,
    notavailtutor,
    favouritetutorid,
    availtutor,
    checked,
    checking,
    idmatch,
    ...studentInfo
  } = props.match;
  console.log(tutor);
  const adminInfo = {
    notavailtutor,
    favouritetutorid,
    checked,
    checking,
  };
  const url = "http://localhost:3001/admin/toggleCheck";
  async function toggleCheck(idmatch, checked, checking) {
    const res = await Axios.patch(url, {
      idmatch: idmatch,
      checked: checked,
      checking: checking,
    });
    // console.log(res.data.result);
    return res;
  }
  async function toggleAvail(idmatch, notavailtutor) {
    const res = await Axios.patch("http://localhost:3001/admin/toggleAvail", {
      idmatch: idmatch,
      notavailtutor: notavailtutor,
    });
    // console.log(res.data.result);
    return res;
  }

  return (
    <div>
      <CaseItem cases={studentInfo} adminInfo={adminInfo} admin="admin" />
      <CasesList
        cases={tutor}
        idmatch={idmatch}
        toggleCheckHandler={toggleCheck}
        toggleAvailHandler={toggleAvail}
        adminInfo={adminInfo}
        type="tutor"
        admin="adminTutor"
      />
    </div>
  );
}
