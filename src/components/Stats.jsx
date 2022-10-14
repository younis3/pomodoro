import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, increment } from "firebase/firestore";
import { capitalizeFirstLetter } from "../helper_functions";

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

    if (userSessionsArr) {
      userSessionsArr.map((session) => {
        sessionCounter++;
        totalMinutesCounter += session.sessionDuration;

        console.log(new Date(session.sessionDate));

        if ((Date.now() - new Date(session.sessionDate)) / 1000 / 60 / 60 / 24 < 7) {
          console.log(session.sessionDate);
        }
      });
    }
    const totalHoursCounter = (totalMinutesCounter / 60).toFixed(0);
    return {
      totalSessions: sessionCounter,
      totalMinutes: totalMinutesCounter,
      totalHours: totalHoursCounter,
    };
  };

  const totalStats = getTotal();

  return (
    <div>
      <div className="statsContainer">
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
