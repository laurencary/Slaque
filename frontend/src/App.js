// import SessionPage from "./components/SessionPage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import './reset.css'
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
	return (
		<Switch>
			<Route path="/signin">
				<SigninPage />
			</Route>
			<Route path="/get-started/createnew">
				<SignupPage />
			</Route>
			<Route path="/welcome">
				<NavBar />
			</Route>
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default App;
