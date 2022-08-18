import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import GlobalStyle from "./globalStyles";
import HabitPage from "./pages/HabitPage";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage";
import TodayPage from "./pages/TodayPage";

export default function App(){
    return (
        <>
        <UserContextProvider>
            <BrowserRouter>
                <GlobalStyle/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/cadastro" element={<SignUpPage/>}/>
                    <Route path="/hoje" element={<TodayPage/>}/>
                    <Route path="/habitos" element={<HabitPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>        
        </>
    )
}