import { darkColors, lightColors } from "@/config/theme";
import { getData, storeData } from "@/lib/localStorage";
import { ColorScheme } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

export const ThemeContext = createContext<undefined | ThemeContextType>(
  undefined,
);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await storeData("darkMode", JSON.stringify(newMode));
  };

  useEffect(() => {
    (async () => {
      const value = await getData("darkMode");
      if (value) setIsDarkMode(JSON.parse(value));
    })();
  }, []);

  const colors = isDarkMode ? darkColors : lightColors;
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
