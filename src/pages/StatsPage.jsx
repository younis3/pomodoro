import styled from "styled-components";
import HistoryTable from "../components/HistoryTable";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const StatsPage = () => {
  const [userObj, setUserObj] = useState(null);

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
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  .tableTitle {
    padding-top: 10vh;
    margin-bottom: 3vh;
    color: #fff;
  }
`;

const StyledStatsTab = styled.div``;
