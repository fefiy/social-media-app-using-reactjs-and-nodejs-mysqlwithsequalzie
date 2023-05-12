import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState( JSON.parse(localStorage.getItem("darkMode")) || false)
  //localStorage.setItem('hello', true) 
  localStorage.removeItem('hello')
  console.log(JSON.parse(localStorage.getItem('darkMode')))
// if(JSON.parse(localStorage.getItem("darkMode")));

 //console.log(JSON.parse(localStorage.getItem("darkMode")))
  const toggle = () => {
    setDarkMode(!darkMode);
  };
  //console.log(darkMode)

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};