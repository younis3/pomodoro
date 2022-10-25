import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, increment } from "firebase/firestore";
import {
  capitalizeFirstLetter,
  convertDateToStringWithHour,
  convertDate,
} from "../helper_functions";
import { Timestamp } from "firebase/firestore";
import PieChart from "./PieChart";

const Stats = ({ user }) => {
  const [userSessionsArr, setUserSessionsArr] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
          //   const timeStamp = new Timestamp(
          //     session.sessionDate.seconds,
          //     session.sessionDate.nanoseconds
          //   );
          //   let dateX = timeStamp.toDate();
          //   console.log(dateX);
        }
        if (new Date().getMonth() === new Date(convertDate(session.sessionDate)).getMonth()) {
          sessionCounterThisMonth++;
          TotalMinutesCounterThisMonth += session.sessionDuration;
        }
      });
    }
    const totalHoursCounter = (totalMinutesCounter / 60).toFixed(0);
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

  // {
  //   id: "go",
  //   label: "go",
  //   value: userSessionsArr.length
  //   color: session.ctgColor,
  // },
  const getPieData = () => {
    const ctgDict = [];
    let maxMinutesCounter = 0;
    let maxCategory = "";

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

          if (objFound.value > maxMinutesCounter) {
            //get most used category
            maxMinutesCounter = objFound.value;
            maxCategory = objFound.id;
          }

          // console.log(objFound);
        } else {
          ctgDict.push({
            key: session.sessionCtg,
            id: session.sessionCtg,
            label: session.sessionCtg,
            color: session.ctgColor,
            count: 1,
            value: 0,
            // value: (1 / userSessionsArr.length).toFixed(2) * 100,
          });
        }
      });
    }
    return [ctgDict, maxMinutesCounter, maxCategory];
  };

  const pieData = getPieData();
  const totalStats = getTotal();

  return (
    <div style={{ height: "80vh" }}>
      <StyledStatsContainer>
        <h3>
          Sessions Last 7 Days:<p>{totalStats.thisWeekSessions}</p>
        </h3>
        <h3>
          Minutes Last 7 Days<p>{totalStats.thisWeekMinutes}</p>
        </h3>
        <h3>
          Sessions This Month<p>{totalStats.thisMonthSessions}</p>
        </h3>
        <h3>
          Minutes This Month<p>{totalStats.thisMonthMinutes}</p>
        </h3>
        <h3>
          Total Sessions:<p>{totalStats.totalSessions}</p>
        </h3>
        <h3>
          Total Hours:<p>{totalStats.totalHours}</p>
        </h3>
        <h3>
          Total Minutes:<p>{totalStats.totalMinutes}</p>
        </h3>
        <h2 style={{ marginTop: "3vh" }}>
          Most Used Category:{" "}
          <p>
            {pieData[2] + " (" + ((pieData[1] / totalStats.totalMinutes) * 100).toFixed() + "%)"}
          </p>
        </h2>
      </StyledStatsContainer>

      <StyledPieContainer>
        <PieChart data={pieData[0]} />
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

const StyledPieContainer = styled.div`
  height: 50vh;
  width: 88vw;
  margin: auto;
  margin-top: 1vh;
  opacity: 0.9;
  /* filter: saturate(10); */
`;
