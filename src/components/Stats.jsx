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

  const totalStats = getTotal();

  return (
    <div>
      <div className="statsContainer">
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
      </div>
    </div>
  );
};

export default Stats;
