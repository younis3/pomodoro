import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, increment } from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  capitalizeFirstLetter,
  convertDateToStringWithHour,
  convertDate,
} from "../helper_functions";
import { useUpdateEffect } from "react-use";

const HistoryTable = ({ user, tableMode, refreshParent, setDisableClearHistoryBtn }) => {
  const [userSessionsArr, setUserSessionsArr] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (userSessionsArr?.length === 0) {
      if (tableMode === "trash") {
        setMsg("Trash is empty!");
      } else if (tableMode === "default") {
        setMsg("No data :/");
      }
    } else {
      setMsg("");
    }
  }, [userSessionsArr]);

  useEffect(() => {
    if (tableMode === "trash") {
      if (msg !== "") {
        setDisableClearHistoryBtn(true);
      }
    }
  }, [msg]);

  useEffect(() => {
    if (!userSessionsArr) {
      getSessionsData()
        .then((res) => {
          if (res.length > 0 && tableMode === "trash") {
            setDisableClearHistoryBtn(false);
          }
          setUserSessionsArr(res);
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useUpdateEffect(() => {
    //useupdateeffect skips first run
    //this function triggered when 'clear history' button in trash table clicked in parent 'stats page'
    getSessionsData()
      .then((res) => {
        // console.log(res);
        setUserSessionsArr(res);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshParent]);

  const getSessionsData = async (userID = user.uid) => {
    const userDocReference = doc(db, "users", userID);
    const docSnap = await getDoc(userDocReference);
    if (docSnap.exists()) {
      let dataArr = [];
      if (tableMode === "default") {
        dataArr = docSnap.data().sessions;
      } else if (tableMode === "trash") {
        dataArr = docSnap.data().trashSessions;
      }
      if (dataArr?.length > 0) {
        dataArr.sort((a, b) => {
          //sort array by date
          //turn strings into dates then subtract them to get a value for sort
          return new Date(b.sessionDate) - new Date(a.sessionDate);
        });
        // dataArr = dataArr.reverse();
      }
      return dataArr;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  const deleteSessionHanlder = (i) => {
    const elm = document.getElementById(`${i}`);
    elm.classList.add("redBeforeDelete"); //make row appear red before removing it
    setTimeout(() => {
      //when timeout complete continue removing

      //remove animation
      elm.classList.add("deletedRow");
      elm.style.animationPlayState = "running"; //trigger remove animation

      elm.addEventListener("animationend", async () => {
        //when 'remove animation' end continue to remove the item
        elm.classList.remove("redBeforeDelete"); //remove red background

        // handle delete in firestore db
        const objToDel = userSessionsArr[i];
        const userDocReference = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocReference);
        if (docSnap.exists()) {
          await updateDoc(userDocReference, {
            sessionsCount: increment(-1),
            sessions: arrayRemove(objToDel),
            trashSessions: arrayUnion(objToDel),
          });
          getSessionsData()
            .then((res) => {
              // console.log(res);
              setUserSessionsArr(res);
              elm.classList.remove("deletedRow");
              setRefresh(!refresh);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }, 600);
  };

  const undoSessionHandler = async (i) => {
    // handle adding data in firestore db
    const objToAdd = userSessionsArr[i];
    const userDocReference = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocReference);
    if (docSnap.exists()) {
      await updateDoc(userDocReference, {
        sessionsCount: increment(1),
        sessions: arrayUnion(objToAdd),
        trashSessions: arrayRemove(objToAdd),
      });
      getSessionsData()
        .then((res) => {
          // console.log(res);
          setUserSessionsArr(res);
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <StyledOuterDiv>
        {msg !== "" && <h4 style={{ marginTop: "3vh", color: "#fff", opacity: "0.65" }}>{msg}</h4>}
        {user && userSessionsArr?.length > 0 && (
          <StyledTable id="table">
            <thead>
              <tr>
                <th></th>
                <th style={{ textAlign: "left" }}>
                  <div className="headTh">Category</div>
                </th>
                <th>
                  <div className="headTh">Duration (min)</div>
                </th>
                <th>
                  <div className="headTh">Session Date</div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userSessionsArr?.map((session, i) => {
                return (
                  <tr key={i} id={`${i}`}>
                    <td></td>

                    <td
                      id="tdCtg"
                      style={{
                        fontSize: "smaller",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        padding: "6px",
                      }}
                    >
                      <div>
                        <button
                          className="ctgBtn"
                          style={{
                            color: `${session.ctgColor}`,
                            backgroundColor: `${session.ctgColor}`,
                          }}
                        />
                      </div>
                      {capitalizeFirstLetter(session.sessionCtg)}
                    </td>
                    <td>{session.sessionDuration}</td>
                    <td style={{ fontSize: "14px" }}>
                      {convertDateToStringWithHour(convertDate(session.sessionDate))}
                    </td>
                    <td>
                      <div className="deleteBtnWrapper">
                        {tableMode === "default" && (
                          <DeleteOutlineIcon onClick={() => deleteSessionHanlder(i)} />
                        )}
                        {tableMode === "trash" && (
                          <ReplayIcon onClick={() => undoSessionHandler(i)} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        )}
      </StyledOuterDiv>
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
const addTable = keyframes`
  0% {
    opacity: 0.0;
  }
  94% {
    opacity: 0.96;
  }
  100% {
    opacity: 1;
  }
`;

const remove = keyframes`
  0% {
    opacity: 0.98;
    height: 100%;
    min-height: 1.8rem;
  }
  94% {
    opacity: 0;
    height: 100%;
    min-height: 1.8rem;
  }
  100% {
    opacity: 0.0;
    height: 0%;
    min-height: 0.0rem;
    /* display: none; */
  }
`;

const StyledOuterDiv = styled.div`
  height: 69vh;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* hides scrollbar */
    width: 0;
    height: 0;
  }
`;

const StyledTable = styled.table`
  /* position: sticky; */
  width: 70vw;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border-collapse: separate;
  border-spacing: 0 6px;

  /* render table animation */
  animation-name: ${addTable};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @media only screen and (max-width: 650px) {
    width: 94vw;
  }

  thead {
    .headTh {
      font-size: smaller;
      padding: 9px;
    }
    tr {
    }
    tr th {
      border-bottom: 1px solid #ffffff7f;
      color: #eaeaeac0;
    }
  }
  tbody {
    tr {
    }
    .deleteBtnWrapper {
      margin-left: 2px;
      margin-top: 2px;
      padding: 1px;
      font-size: smaller;
      cursor: pointer;
    }

    .redBeforeDelete {
      background-color: #ec4e4e55;
    }
    .deletedRow {
      /* remove row animation */
      animation-name: ${remove};
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      animation-play-state: paused;
    }
    tr td {
      color: #f0e9e9;
    }
    #tdCtg {
      margin-left: auto;
      margin-right: auto;
    }
    .ctgBtn {
      font-size: 14px;
      border-radius: 50%;
      border: none;
      width: 9px;
      height: 9px;
      margin-right: 8px;
      margin-top: 4.7px;
    }
  }
`;
