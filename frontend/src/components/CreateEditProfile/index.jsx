import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormError from '../Session/SessionForm/FormError';
import { createWorkspaceUser, updateWorkspaceUser } from '../../store/workspaceUsers';
import { useDispatch } from 'react-redux';
import './CreateEditProfile.css'

const CreateEditProfile = ({ profile, setShow, closeModals, isCreate, workspaceId}) => {
    const {clientId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [fullName, setFullName] = useState(profile.fullName ? profile.fullName : '') 
    const [displayName, setDisplayName] = useState(profile.displayName ? profile.displayName : '') 
    const [title, setTitle] = useState(profile.title ? profile.title : '') 
    const [pronunciation, setPronunciation] = useState(profile.pronunciation ? profile.pronunciation : '') 
    const [errors, setErrors] = useState([]);


    const handleUpdate = () => {
        const newProfile = {
            id: profile.id,
            fullName,
            displayName: displayName === '' ? null : displayName,
            title: title === '' ? null : title,
            pronunciation: pronunciation === '' ? null : pronunciation
        }
        // console.log(newProfile);
        dispatch(updateWorkspaceUser(newProfile))
        closeModals();
    }

    const handleCreate = () => {
        const newProfile = {
            userId: clientId,
            workspaceId,
            fullName,
            displayName: displayName === '' ? null : displayName,
            title: title === '' ? null : title,
            pronunciation: pronunciation === '' ? null : pronunciation
        }
        // debugger
        dispatch(createWorkspaceUser(newProfile))
            .catch (async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        history.push(`/client/${clientId}/${workspaceId}/all-channels`)
    }

    return (
        <div className="edit-profile-modal">
            <header className="edit-profile-header-container">
                <h1 className="edit-profile-header-text">{`${isCreate ? "Create" : "Edit"} your profile`}</h1>
            </header>
            <div className="edit-profile-form-container">
                <form className="edit-profile-form">
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Full name</span>
                        <span><input value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            className="edit-profile-input"
                            placeholder='Full name'/></span>
                        {!isCreate && fullName === '' && (<div className='full-name-error'><FormError error={"Unforunately, you can't leave this blank"} /></div>)}
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Display name<span className='optional'>(optional)</span></span>
                        <span><input value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="edit-profile-input" 
                            placeholder='Display name'/></span>
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Title<span className='optional'>(optional)</span></span>
                        <span><input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="edit-profile-input" 
                            placeholder='Title'/></span>
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Pronunciation<span className='optional'>(optional)</span></span>
                        <span><input value={pronunciation} 
                            onChange={(e) => setPronunciation(e.target.value)}
                            className="edit-profile-input" 
                            placeholder={`Zoe (pronounced 'zo-ee')`}/></span>
                    </label>
                </form>
            </div>
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={closeModals}>Cancel</button>
                <button onClick={isCreate ? handleCreate : handleUpdate} className="green-text-button" disabled={fullName === ''}>{isCreate ? "Create" : "Save Changes"}</button>
            </footer>
        </div>
    )
}

export default CreateEditProfile;