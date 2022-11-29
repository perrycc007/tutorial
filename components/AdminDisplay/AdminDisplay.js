import CaseItem from "../Case/CaseItem";
import CasesList from "../Case/CasesList";

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
    availtutor,
    checked,
    checking,
  };
  return (
    <div>
      <CaseItem cases={studentInfo} />
      <CasesList cases={tutor} adminInfo={adminInfo} type="tutor" admin="admin" />
    </div>
  );
}
