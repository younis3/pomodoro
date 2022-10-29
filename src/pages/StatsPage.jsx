import styled from "styled-components";
import HistoryTable from "../components/HistoryTable";
import Stats from "../components/Stats";
import { auth, db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const StatsPage = () => {
  const [userObj, setUserObj] = useState(null);
  const [pageMode, setPageMode] = useState("stats");
  const [tableMode, setTableMode] = useState("default");
  const [refreshParent, setRefreshParent] = useState(false);
  const [disableClearHistoryBtn, setDisableClearHistoryBtn] = useState(true);

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

  const historyPageRef = useRef();
  const statsPageModeRef = useRef();

  useEffect(() => {
    historyPageRef.current?.classList.remove("clickedPage");
    statsPageModeRef.current?.classList.remove("clickedPage");

    if (pageMode === "history") {
      historyPageRef.current?.classList.add("clickedPage");
    } else {
      statsPageModeRef.current?.classList.add("clickedPage");
    }
  }, [pageMode, userObj]);

  const historyModeRef = useRef();
  const trashModeRef = useRef();

  useEffect(() => {
    historyModeRef.current?.classList.remove("clickedPage");
    trashModeRef.current?.classList.remove("clickedPage");

    if (tableMode === "default") {
      historyModeRef.current?.classList.add("clickedPage");
    } else {
      trashModeRef.current?.classList.add("clickedPage");
    }
  }, [tableMode, pageMode, userObj]);

  const clearHistoryHanlder = async () => {
    if (window.confirm("Are you sure to delete all items in trash? they will be gone forever!")) {
      const userDocReference = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDocReference);
      if (docSnap.exists()) {
        await updateDoc(userDocReference, {
          trashSessions: [],
        })
          .then(() => {
            setRefreshParent(!refreshParent);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("No such document!");
      }
    }
  };

  return (
    <div>
      <StyledOuter>
        {!userObj && (
          <div>
            <p style={{ color: "#ffffffbe", marginTop: "14vh" }}>You're not signed in yet!</p>
            <p style={{ color: "#ffffffbe", marginTop: "1vh", fontSize: "smaller" }}>
              Please login/register in order to save & view your data
            </p>
          </div>
        )}

        {userObj && (
          <div className="pageModes">
            <div ref={statsPageModeRef} onClick={() => setPageMode("stats")}>
              Statistics
            </div>
            <div ref={historyPageRef} onClick={() => setPageMode("history")}>
              History
            </div>
          </div>
        )}
        {userObj && (
          <div>
            {pageMode === "history" && (
              <StyledHistoryTab>
                <div className="modesContainer">
                  <div className="modes">
                    <div ref={historyModeRef} onClick={() => setTableMode("default")}>
                      History
                    </div>
                    <div ref={trashModeRef} onClick={() => setTableMode("trash")}>
                      Trash
                    </div>
                  </div>
                  {tableMode === "trash" && (
                    <button
                      className="clearBtnWrapper"
                      onClick={clearHistoryHanlder}
                      disabled={disableClearHistoryBtn}
                    >
                      Empty Trash
                    </button>
                  )}
                </div>
                {tableMode === "default" && (
                  <HistoryTable
                    user={userObj}
                    tableMode={"default"}
                    refreshParent={refreshParent}
                    setDisableClearHistoryBtn={setDisableClearHistoryBtn}
                  />
                )}
                {tableMode === "trash" && (
                  <HistoryTable
                    user={userObj}
                    tableMode={"trash"}
                    refreshParent={refreshParent}
                    setDisableClearHistoryBtn={setDisableClearHistoryBtn}
                  />
                )}
              </StyledHistoryTab>
            )}

            {pageMode === "stats" && (
              <StyledStatsTab>
                {/* {"❤" + process.env.REACT_APP_HABAL} */}
                <Stats user={userObj} pageMode={pageMode} />
              </StyledStatsTab>
            )}
          </div>
        )}
      </StyledOuter>
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
const StyledOuter = styled.div`
  /* min-height: 100vh; */
  padding-top: 11vh;
  .pageModes {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    .clickedPage {
      color: #7399ca;
      opacity: 0.98;
      font-weight: 500;
    }
  }
  .pageModes div {
    color: whitesmoke;
    opacity: 0.5;
    padding: 2px 16px;
    cursor: pointer;
    font-weight: 400;
    &:hover {
      color: #fff;
      opacity: 0.8;
    }
    &:first-child {
      border-right: 2px solid #64a1b1;
    }
  }
`;

const StyledHistoryTab = styled.div`
  width: 70vw;
  max-width: 900px;
  margin: auto;
  padding: auto;

  @media only screen and (max-width: 650px) {
    width: 98vw;
  }

  .modesContainer {
    margin-top: 2.5vh;
    margin-left: 4vw;
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modes {
    display: flex;
    justify-content: left;
    align-items: center;
    .clickedPage {
      color: #7399ca;
      opacity: 0.98;
      font-weight: 500;
    }
  }
  .modes div {
    color: whitesmoke;
    border: none;
    margin: 3px;
    padding: 3px 12px;
    border-radius: 12%;
    background-color: #6b93b82b;
    cursor: pointer;
    font-weight: 400;
    opacity: 0.45;
    &:hover {
      background-color: #6b93b8a9;
      color: #fff;
      opacity: 0.7;
    }
  }

  .clearBtnWrapper {
    margin-right: 6vw;
    color: whitesmoke;
    border: none;
    padding: 3px 12px;
    background-color: #b648516a;
    cursor: pointer;
    border-radius: 10%;
    font-size: smaller;
    padding: 6px 10px;
    font-weight: 400;
    opacity: 0.7;
    &:hover {
      background-color: #b6485199;
      color: #fff;
      opacity: 0.8;
    }
    :disabled {
      opacity: 0.4;
    }
  }
`;

const StyledStatsTab = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* hides scrollbar */
    width: 0;
    height: 0;
  }
  /* margin-top: 5vh; */
  color: #fff;
`;
