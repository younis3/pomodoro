import styled from "styled-components";
import HistoryTable from "../components/HistoryTable";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const StatsPage = () => {
  const [userObj, setUserObj] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        if (auth.currentUser) {
          //user signed in
          setUserObj(auth.currentUser);
        }
      }
    });
  });

  return (
    <div>
      {userObj && (
        <StyledHistoryTab>
          <h3 className="tableTitle">History Table</h3>
          <HistoryTable user={userObj} />
          <div className="clearBtnWrapper">
            <button>Clear History</button>
          </div>
        </StyledHistoryTab>
      )}

      <StyledStatsTab></StyledStatsTab>
    </div>
  );
};

export default StatsPage;
//
//
//
//
//
/****************** styles ******************/
const StyledHistoryTab = styled.div`
  .clearBtnWrapper {
    button {
      padding: 8px 6px;
      width: 98%;
      font-size: 18px;
      color: rgb(255, 255, 255);
      background-color: rgb(29, 24, 28);
      border: none;
      border-radius: 2px;
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        background-color: rgb(86, 116, 161);
      }
    }
  }

  .tableTitle {
    padding-top: 10vh;
    margin-bottom: 3vh;
    color: #fff;
  }
`;

const StyledStatsTab = styled.div``;
