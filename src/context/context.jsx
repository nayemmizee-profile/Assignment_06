"use client";

import { createContext, useState } from "react";

export const cardContext = createContext({});

export function PlanContext({ children }) {
  const [saveCard, setSaveCard] = useState([]);
  const [todayPlan, setTodayPlan] = useState([]);

  const shareData = { saveCard, setSaveCard, todayPlan, setTodayPlan };

  return (
    <cardContext.Provider value={shareData}>{children}</cardContext.Provider>
  );
}

export default PlanContext;
