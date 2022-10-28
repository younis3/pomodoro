import styled, { keyframes } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { convertDate } from "../helper_functions";
import PieChart from "./PieChart";
import { useUpdateEffect } from "react-use";

const Stats = ({ user, pageMode }) => {
  const [userSessionsArr, setUserSessionsArr] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [statsMode, setStatsMode] = useState("lastweek");

  const [pieData, setPieData] = useState([]);

  const lastWeekModeRef = useRef();
  const lastMonthModeRef = useRef();
  const allTimeModeRef = useRef();

  useEffect(() => {
    lastWeekModeRef.current?.classList.remove("clickedPage");
    lastMonthModeRef.current?.classList.remove("clickedPage");
    allTimeModeRef.current?.classList.remove("clickedPage");

    if (statsMode === "lastweek") {
      lastWeekModeRef.current?.classList.add("clickedPage");
    } else if (statsMode === "lastmonth") {
      lastMonthModeRef.current?.classList.add("clickedPage");
    } else {
      allTimeModeRef.current?.classList.add("clickedPage");
    }
  }, [statsMode, pageMode, user]);

  useEffect(() => {
    if (!userSessionsArr) {
      getSessionsData()
        .then((res) => {
          setUserSessionsArr(res);
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const getSessionsData = async (userID = user.uid) => {
    const userDocReference = doc(db, "users", userID);
    const docSnap = await getDoc(userDocReference);
    if (docSnap.exists()) {
      const dataArr = docSnap.data().sessions;
      return dataArr;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  useUpdateEffect(() => {
    //skip first render
    if (statsMode === "alltime") {
      setPieData(getPieDataAllTime());
    } else if (statsMode === "lastweek") {
      setPieData(getPieDataLastWeek());
    } else if (statsMode === "lastmonth") {
      setPieData(getPieDataLastMonth());
    }
  }, [statsMode]);

  const getTotal = () => {
    let sessionCounter = 0;
    let totalMinutesCounter = 0;

    let sessionCounterThisWeek = 0;
    let TotalMinutesCounterThisWeek = 0;

    let sessionCounterThisMonth = 0;
    let TotalMinutesCounterThisMonth = 0;

    if (userSessionsArr) {
      userSessionsArr.map((session) => {
        sessionCounter++;
        totalMinutesCounter += session.sessionDuration;

        if ((Date.now() - convertDate(session.sessionDate)) / 1000 / 60 / 60 / 24 < 7) {
          sessionCounterThisWeek++;
          TotalMinutesCounterThisWeek += session.sessionDuration;
        }
        if (new Date().getMonth() === new Date(convertDate(session.sessionDate)).getMonth()) {
          sessionCounterThisMonth++;
          TotalMinutesCounterThisMonth += session.sessionDuration;
        }
      });
    }
    const totalHoursCounter = (totalMinutesCounter / 60).toFixed();
    return {
      totalSessions: sessionCounter,
      totalMinutes: totalMinutesCounter,
      totalHours: totalHoursCounter,
      thisWeekSessions: sessionCounterThisWeek,
      thisWeekMinutes: TotalMinutesCounterThisWeek,
      thisMonthSessions: sessionCounterThisMonth,
      thisMonthMinutes: TotalMinutesCounterThisMonth,
    };
  };

  const getPieDataAllTime = () => {
    const ctgDict = [];
    let maxMinutesCounterAllTime = 0;
    let maxCategoryAllTime = "";

    if (userSessionsArr) {
      userSessionsArr.map((session) => {
        const checkCtg = (obj) => obj.id === session.sessionCtg;
        const objFound = ctgDict.find(checkCtg);
        if (objFound) {
          //if category exist in pie data array, count++ else insert new category in the pie data arr
          // const count = objFound.count + 1;
          objFound.count++;
          objFound.value += session.sessionDuration;
          // objFound.value = (count / userSessionsArr.length).toFixed(2) * 100;

          if (objFound.value > maxMinutesCounterAllTime) {
            //get most used category
            maxMinutesCounterAllTime = objFound.value;
            maxCategoryAllTime = objFound.id;
          }

          // console.log(objFound);
        } else {
          ctgDict.push({
            key: session.sessionCtg,
            id: session.sessionCtg,
            label: session.sessionCtg,
            color: session.ctgColor,
            count: 1,
            value: session.sessionDuration,
            // value: (1 / userSessionsArr.length).toFixed(2) * 100,
          });
          maxMinutesCounterAllTime = ctgDict[0].value;
          maxCategoryAllTime = ctgDict[0].id;
        }
      });
    }
    return [ctgDict, maxMinutesCounterAllTime, maxCategoryAllTime];
  };

  const getPieDataLastWeek = () => {
    const ctgDict = [];
    let maxMinutesCounterLastWeek = 0;
    let maxCategoryLastweek = "";

    if (userSessionsArr) {
      userSessionsArr.map((session) => {
        if ((Date.now() - convertDate(session.sessionDate)) / 1000 / 60 / 60 / 24 < 7) {
          const checkCtg = (obj) => obj.id === session.sessionCtg;
          const objFound = ctgDict.find(checkCtg);
          if (objFound) {
            //if category exist in pie data array, count++ else insert new category in the pie data arr
            // const count = objFound.count + 1;
            objFound.count++;
            objFound.value += session.sessionDuration;
            // objFound.value = (count / userSessionsArr.length).toFixed(2) * 100;

            if (objFound.value > maxMinutesCounterLastWeek) {
              //get most used category
              maxMinutesCounterLastWeek = objFound.value;
              maxCategoryLastweek = objFound.id;
            }

            // console.log(objFound);
          } else {
            ctgDict.push({
              key: session.sessionCtg,
              id: session.sessionCtg,
              label: session.sessionCtg,
              color: session.ctgColor,
              count: 1,
              value: session.sessionDuration,
              // value: (1 / userSessionsArr.length).toFixed(2) * 100,
            });
            maxMinutesCounterLastWeek = ctgDict[0].value;
            maxCategoryLastweek = ctgDict[0].id;
          }
        }
      });
    }
    return [ctgDict, maxMinutesCounterLastWeek, maxCategoryLastweek];
  };

  const getPieDataLastMonth = () => {
    const ctgDict = [];
    let maxMinutesCounterLastMonth = 0;
    let maxCategoryLastMonth = "";

    if (userSessionsArr) {
      userSessionsArr.map((session) => {
        if (new Date().getMonth() === new Date(convertDate(session.sessionDate)).getMonth()) {
          const checkCtg = (obj) => obj.id === session.sessionCtg;
          const objFound = ctgDict.find(checkCtg);
          if (objFound) {
            //if category exist in pie data array, count++ else insert new category in the pie data arr
            // const count = objFound.count + 1;
            objFound.count++;
            objFound.value += session.sessionDuration;
            // objFound.value = (count / userSessionsArr.length).toFixed(2) * 100;

            if (objFound.value > maxMinutesCounterLastMonth) {
              //get most used category
              maxMinutesCounterLastMonth = objFound.value;
              maxCategoryLastMonth = objFound.id;
            }

            // console.log(objFound);
          } else {
            ctgDict.push({
              key: session.sessionCtg,
              id: session.sessionCtg,
              label: session.sessionCtg,
              color: session.ctgColor,
              count: 1,
              value: session.sessionDuration,
              // value: (1 / userSessionsArr.length).toFixed(2) * 100,
            });
            maxMinutesCounterLastMonth = ctgDict[0].value;
            maxCategoryLastMonth = ctgDict[0].id;
          }
        }
      });
    }
    return [ctgDict, maxMinutesCounterLastMonth, maxCategoryLastMonth];
  };

  const totalStats = getTotal();
  const lastWeekPieData = getPieDataLastWeek();

  return (
    <div style={{ height: "80vh" }}>
      <StyledStatsContainer>
        <StyledStatsModesTabs>
          <div className="modesContainer">
            <div className="modes">
              <div ref={lastWeekModeRef} onClick={() => setStatsMode("lastweek")}>
                Last Week
              </div>
              <div ref={lastMonthModeRef} onClick={() => setStatsMode("lastmonth")}>
                Last Month
              </div>
              <div ref={allTimeModeRef} onClick={() => setStatsMode("alltime")}>
                All Time
              </div>
            </div>
          </div>
        </StyledStatsModesTabs>
        {statsMode === "lastweek" && (
          <div>
            <h3>
              Sessions <p>{totalStats.thisWeekSessions}</p>
            </h3>
            <h3>
              Hours <p>{(totalStats.thisWeekMinutes / 60).toFixed()}</p>
            </h3>
            <h3>
              Minutes <p>{totalStats.thisWeekMinutes}</p>
            </h3>
          </div>
        )}
        {statsMode === "lastmonth" && (
          <div>
            <h3>
              Sessions <p>{totalStats.thisMonthSessions}</p>
            </h3>
            <h3>
              Hours <p>{(totalStats.thisMonthMinutes / 60).toFixed()}</p>
            </h3>
            <h3>
              Minutes <p>{totalStats.thisMonthMinutes}</p>
            </h3>
          </div>
        )}
        {statsMode === "alltime" && (
          <div>
            <h3>
              Total Sessions:<p>{totalStats.totalSessions}</p>
            </h3>
            <h3>
              Total Hours:<p>{totalStats.totalHours}</p>
            </h3>
            <h3>
              Total Minutes:<p>{totalStats.totalMinutes}</p>
            </h3>
          </div>
        )}

        {(pieData.length > 0 || lastWeekPieData.length > 0) && (
          <h2 style={{ marginTop: "3vh" }}>
            Most Used Category:{" "}
            {statsMode === "lastweek" && (
              <p>
                {lastWeekPieData[2] +
                  " (" +
                  ((lastWeekPieData[1] / totalStats.thisWeekMinutes) * 100).toFixed() +
                  "%)"}
              </p>
            )}
            {statsMode === "lastmonth" && (
              <p>
                {pieData[2] +
                  " (" +
                  ((pieData[1] / totalStats.thisMonthMinutes) * 100).toFixed() +
                  "%)"}
              </p>
            )}
            {statsMode === "alltime" && (
              <p>
                {pieData[2] +
                  " (" +
                  ((pieData[1] / totalStats.totalMinutes) * 100).toFixed() +
                  "%)"}
              </p>
            )}
          </h2>
        )}
      </StyledStatsContainer>

      <StyledPieContainer>
        <PieChart data={!pieData[0] ? lastWeekPieData[0] : pieData[0]} />
      </StyledPieContainer>
    </div>
  );
};

export default Stats;
//
//
//
//
//
/****************** styles ******************/
const StyledStatsContainer = styled.div`
  h3 {
    margin-top: 1.5vh;
    p {
      margin-top: 0.5vh;
    }
  }
`;

const StyledStatsModesTabs = styled.div`
  width: 70vw;
  max-width: 900px;
  margin: auto;
  padding: auto;
  @media only screen and (max-width: 650px) {
    width: 98vw;
  }
  display: flex;
  justify-content: center;

  .modesContainer {
    margin-top: 3vh;
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
    font-size: smaller;
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
`;

const StyledPieContainer = styled.div`
  height: 50vh;
  width: 88vw;
  margin: auto;
  margin-top: 1vh;
  opacity: 0.9;
  /* filter: saturate(10); */
`;
