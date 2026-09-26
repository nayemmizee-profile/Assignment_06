"use client";

import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [myPlan, setMyPlan] = useState([]);

  // Add exercise to today's plan
  function addToPlan(exercise) {
    setMyPlan((previousPlan) => {
      // Don't add the same exercise twice
      const alreadyExists = previousPlan.some(
        (item) => item.DataID === exercise.DataID,
      );

      if (alreadyExists) {
        return previousPlan;
      }

      return [...previousPlan, exercise];
    });
  }

  // Remove one exercise
  function removeFromPlan(id) {
    setMyPlan((previousPlan) =>
      previousPlan.filter((exercise) => exercise.DataID !== id),
    );
  }

  // Remove everything
  function removeAll() {
    setMyPlan([]);
  }

  // Calculate statistics
  const stats = myPlan.reduce(
    (total, exercise) => ({
      exercises: total.exercises + 1,
      minutes: total.minutes + Number(exercise.duration || 0),
      calories: total.calories + Number(exercise.calories || 0),
    }),
    {
      exercises: 0,
      minutes: 0,
      calories: 0,
    },
  );

  return (
    <PlanContext.Provider
      value={{
        myPlan,
        addToPlan,
        removeFromPlan,
        removeAll,
        stats,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
