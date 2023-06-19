import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceUsers } from "../../store/workspaceUsers";
import WorkspaceNavBar from "./WorkspaceNavBar";


const Workspace = () => {
    const {workspaceId} = useParams();
    const dispatch = useDispatch();
    // const workspaceUsers = useSelector(getWorkspaceUsers);
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    return (
        <>
            <WorkspaceNavBar />
            <div>{workspace.name}</div>
        </>
    )
}

export default Workspace;