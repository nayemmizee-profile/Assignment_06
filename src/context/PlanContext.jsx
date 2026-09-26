"use client";

import { createContext, useContext, useMemo, useState } from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [myPlan, setMyPlan] = useState([]);

  function addToPlan(exercise) {
    setMyPlan((previous) => {
      // Prevent duplicate exercises
      const alreadyExists = previous.some(
        (item) => item.DataID === exercise.DataID,
      );

      if (alreadyExists) {
        return previous;
      }

      return [...previous, exercise];
    });
  }

  function removeFromPlan(id) {
    setMyPlan((previous) =>
      previous.filter((exercise) => exercise.DataID !== id),
    );
  }

  function removeAll() {
    setMyPlan([]);
  }

  const stats = useMemo(() => {
    return myPlan.reduce(
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
  }, [myPlan]);

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
