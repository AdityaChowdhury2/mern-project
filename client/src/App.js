import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Home from "./pages/Home/Home.js";
import { Header } from "./component/Header/Header";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);
	return (
		<BrowserRouter>
			<div className={`App ${theme}`}>
				<Header toggleTheme={toggleTheme} theme={theme} />
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
