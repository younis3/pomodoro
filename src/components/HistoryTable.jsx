import styled from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HistoryTable = ({ user }) => {
  const [userSessionsArr, setUserSessionsArr] = useState([]);

  useEffect(() => {
    if (userSessionsArr.length === 0) {
      getSessionsData();
    }
  }, []);

  const getSessionsData = async (userID = user.uid) => {
    const userDocReference = doc(db, "users", userID);
    const docSnap = await getDoc(userDocReference);
    if (docSnap.exists()) {
      let data = docSnap.data().sessions;
      setUserSessionsArr(data);
    } else {
      console.log("No such document!");
    }
  };

  const deleteSessionHanlder = (i) => {
    console.log(userSessionsArr[i]);
  };

  return (
    <div>
      {user && (
        <StyledTable>
          <thead>
            <tr>
              <th>
                <div className="headTh">Category</div>
              </th>
              <th>
                <div className="headTh">Duration (min)</div>
              </th>
              <th>
                <div className="headTh">Session Date</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {userSessionsArr.map((session, i) => {
              return (
                <tr key={i}>
                  <td>{session.sessionCtg}</td>
                  <td>{session.sessionDuration}</td>
                  <td style={{ fontSize: "14px" }}>{session.sessionDate}</td>
                  <td>
                    <div className="deleteBtnWrapper">
                      <DeleteOutlineIcon onClick={() => deleteSessionHanlder(i)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      )}
    </div>
  );
};

export default HistoryTable;
//
//
//
//
//
/****************** styles ******************/
const StyledTable = styled.table`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-collapse: separate;
  border-spacing: 0 6px;
  @media only screen and (max-width: 650px) {
    width: 90%;
  }

  thead {
    .headTh {
      font-size: smaller;
      padding: 12px;
    }
    tr {
    }
    tr th {
      border-bottom: 1px solid #ffffff7f;
      color: #eaeaeac0;
    }
  }
  tbody {
    .deleteBtnWrapper {
      margin-left: 8px;
      margin-top: 2px;
      padding: 1px;
      font-size: smaller;
      cursor: pointer;
    }
    tr td {
      color: #f0e9e9;
    }
  }
`;
