import './WorkspaceOptions.css'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../../../store/session';
import { getUserWorkspaces } from '../../../../store/userWorkspaces';
import { useState } from 'react';
import { NavLink, useParams, Link } from 'react-router-dom';
import DunderLogo from '../../../Welcome/WorkspaceItem/DunderMifflinLogo';
import WickedLogo from '../../../Welcome/WorkspaceItem/WickedLogo';

const WorkapceOptionsDropdown = ({workspace}) => {
    const {clientId} = useParams();
    const userWorkspaces = useSelector(getUserWorkspaces)
    const dispatch = useDispatch();
    const [showOtherWorkspaces, setShowOtherWorkspaces] = useState(false)

    return (
        <>
            <div className="workspace-options-dropdown-container">
                <div className='workspace-options-workspace'>
                    <div className='current-workspace-logo'>
                        {workspace.name.startsWith("D") ? <DunderLogo /> : <WickedLogo />}
                    </div>
                    <div className='workspace-options-bold-text'>{workspace.name}</div>
                </div>
                <hr className="actions-modal-hr workspaces-hr" />
                <Link to={{ pathname: "https://github.com/laurencary" }} target="_blank" className="workspace-options-text">GitHub</Link>
                <Link to={{ pathname: "https://www.linkedin.com/in/laurengcary/" }} target="_blank" className="workspace-options-text">LinkedIn</Link>
                <hr className="actions-modal-hr workspaces-hr" />
                <NavLink to={`/client/${clientId}/get-started/landing`} className="workspace-options-text">Back to welcome</NavLink>
                <div onClick={() => dispatch(sessionActions.logout())} className='workspace-options-text'>Sign out of Slaque</div>
                <hr className="actions-modal-hr workspaces-hr" />
                {userWorkspaces.length > 1 && <button onMouseEnter={() => setShowOtherWorkspaces(true)} 
                    onMouseLeave={() => setShowOtherWorkspaces(false)}
                    className='workspace-options-button unstyled-button'>
                    <div className='switch-workspace-option-container'>
                        <div className='workspace-options-text white-text'>Switch Workspaces</div>
                        <span className="workspace-options-arrow">
                            <svg viewBox='0 0 20 20'>
                                <path fill="currentColor" d="M7.72 5.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06L10.94 10 7.72 6.78a.75.75 0 0 1 0-1.06Z"></path>
                            </svg>
                        </span>
                    </div>
                </button>}
            </div>
            {showOtherWorkspaces && (
                <div onMouseEnter={() => setShowOtherWorkspaces(true)} 
                    onMouseLeave={() => setShowOtherWorkspaces(false)}
                    className='other-workspaces-list-container' >
                    <header className='other-workspaces-header'>Your other workspaces</header>
                    {userWorkspaces.filter(ws => ws.id !== workspace.id).map((ws) => (
                        // <div className='other-workspace-item' key={`ow${ws.id}`}><strong>{ws.name}</strong></div>
                        <NavLink 
                            to={`/client/${clientId}/${ws.id}`}
                            className='other-workspace-item' 
                            key={`ow${ws.id}`}>
                                <div className='other-workspaces-logo'>
                                    {ws.name.startsWith("D") ? <DunderLogo /> : <WickedLogo />}
                                </div>
                                <strong>{ws.name}</strong>
                        </NavLink>
                    ))}
                </div>
            )}
        </>
    )
}

export default WorkapceOptionsDropdown