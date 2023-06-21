// import SessionPage from "./components/SessionPage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Welcome from "./components/Welcome";
import Workspace from "./components/Workspace";
import './reset.css'

function App() {
	return (
		<Switch>
			<Route path="/signin">
				<SigninPage />
			</Route>
			<Route path="/get-started/createnew">
				<SignupPage />
			</Route>
			<Route path="/client/:clientId/get-started/landing">
				<Welcome />
			</Route>
			<Route path="/client/:clientId/:workspaceId">
				<Workspace />
			</Route>
			
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default App;
