import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [date_range, setDate_range] = useState(null);

  return (
    <DataContext.Provider value={{ date_range, setDate_range }}>
      {children}
    </DataContext.Provider>
  );
};
