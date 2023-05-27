import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage"; //this is whole reason for jsconfig.json. itstead of having to put './scenes/homePage
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); //grabs mode we have from our state 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //sets up theme, but have to pass in material ui in ThemeProvider below in return statement
  const isAuth = Boolean(useSelector((state) => state.token)); //if the token exists, we are authorised. so add it to routes -> But can't user just create a token like in local storage? Is this the most secure. -> he says it doesn't really matter if they do that

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* resets css to basic css for material ui */}
          <CssBaseline /> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            {/* Before auth */}
            {/* <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
