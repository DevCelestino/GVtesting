import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Cookies from 'js-cookie';

export const ThemeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    Cookies.set('ThemeMode', `${!darkMode}`, { expires: 30 });
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const ThemeMode = Cookies.get('ThemeMode')
      ? (Cookies.get('ThemeMode') === 'true')
      : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    Cookies.set('ThemeMode', `${ThemeMode}`, { expires: 30 });
    setDarkMode(ThemeMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Button
      className="!absolute bottom-5 right-5 ToggleTheme"
      style={{
        minWidth: '50px',
        minHeight: '50px'
      }}
      onClick={toggleDarkMode}
      startIcon={
        darkMode
          ? <Brightness7 />
          : <Brightness4 />
      }
    />
  )
}
