import ProfileButton from "./ProfileButton";

const WorkspaceNavBar = () => {
 
    return (
        <div className="workspace-nav-bar">
            <div className="workspace-nav-bar-right"></div>
            <div className="workspace-nav-bar-center">
                <div className="workspace-nav-bar-search"></div>
            </div>
            <div className="workspace-nav-bar-left"><ProfileButton /></div>
        </div>
    )
}

export default WorkspaceNavBar;