"use client";

import { createContext, useState } from "react";

export const CardContext = createContext({});

export function PlanContext({ children }) {
  const [saveCard, setSaveCard] = useState([]);
  const [todayPlan, setTodayPlan] = useState([]);

  const shareData = { saveCard, setSaveCard, todayPlan, setTodayPlan };

  return (
    <CardContext.Provider value={shareData}>{children}</CardContext.Provider>
  );
}

export default PlanContext;
