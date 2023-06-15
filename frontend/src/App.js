// import SessionPage from "./components/SessionPage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import './reset.css'
import NavBar from "./components/NavBar";

function App() {
	return (
		<Switch>
			<Route path="/signin">
				<SigninPage />
			</Route>
			<Route path="/get-started/createnew">
				<SignupPage />
			</Route>

			<NavBar />
		</Switch>
	);
}

export default App;
