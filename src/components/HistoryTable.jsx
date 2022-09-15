import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { capitalizeFirstLetter } from "../helper_functions";

const HistoryTable = ({ user }) => {
  const [userSessionsArr, setUserSessionsArr] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (userSessionsArr.length === 0) {
      getSessionsData();
    }
  }, []);

  const getSessionsData = async (userID = user.uid) => {
    const userDocReference = doc(db, "users", userID);
    const docSnap = await getDoc(userDocReference);
    if (docSnap.exists()) {
      const data = docSnap.data().sessions.reverse();
      setUserSessionsArr(data);
    } else {
      console.log("No such document!");
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
            sessions: arrayRemove(objToDel),
          });
          getSessionsData(); //update table data
          setTimeout(() => {
            //removes element smoother (prevent flashing item back after animation over)
            elm.classList.remove("deletedRow");
          }, 200);
        }
      });
    }, 500);
  };

  return (
    <div>
      <StyledOuterDiv>
        {user && (
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
              {userSessionsArr.map((session, i) => {
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
  animation-duration: 2.5s;
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
