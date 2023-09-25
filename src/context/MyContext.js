import React, { createContext, useState, useContext } from "react";

// Create a context
const MyContext = createContext();

// Create a custom provider for the context
export function MyContextProvider({ children }) {
  const [name, setName] = useState(""); // Initial name value
  const [totalTime, setTotalTime] = useState(0); // Initial total time value
  const [checkedList, setCheckedList] = useState([]); // Initial checked list value
  const [PerQuesTime, setPerQuesTime] = useState([]);
  const [timeUsedForEachQuestion, setTimeUsedForEachQuestion] = useState([]);

  return (
    <MyContext.Provider
      value={{
        name,
        setName,
        totalTime,
        setTotalTime,
        checkedList,
        setCheckedList,
        PerQuesTime,
        setPerQuesTime,
        timeUsedForEachQuestion,
        setTimeUsedForEachQuestion,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

// Create a custom hook to use the context values
export function useMyContext() {
  return useContext(MyContext);
}
