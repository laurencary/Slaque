// import SessionPage from "./components/SessionPage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninPage from "./components/Session/SigninPage";
import SignupPage from "./components/Session/SignupPage";
import HomePage from "./components/HomePage";
import Welcome from "./components/Welcome";
import WorkspacePrimaryView from "./components/Workspace/WorkspacePrimaryView";
import './reset.css'
import WorkspaceWelcome from "./components/Workspace/WorkspaceWelcome";
import NewDirectMessage from "./components/Workspace/NewDirectMessage";
import ChannelsIndex from "./components/Workspace/ChannelsIndex";

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
			<Route path="/client/:clientId/:workspaceId/create-direct-message">
				<NewDirectMessage />
			</Route>
			<Route path="/client/:clientId/:workspaceId/all-channels">
				<ChannelsIndex />
			</Route>
			<Route path="/client/:clientId/:workspaceId/:messageableCode">
				<WorkspacePrimaryView />
			</Route>
			<Route path="/client/:clientId/:workspaceId">
				<WorkspaceWelcome />
			</Route>
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default App;
