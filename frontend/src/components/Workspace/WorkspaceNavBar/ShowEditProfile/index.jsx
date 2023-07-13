import { useState } from 'react';
import './ShowEditProfile.css'
import FormError from '../../../Session/SessionForm/FormError';
import { updateWorkspaceUser } from '../../../../store/workspaceUsers';
import { useDispatch } from 'react-redux';

const ShowEditProfile = ({ profile, setShow, closeModals }) => {
    const [fullName, setFullName] = useState(profile.fullName) 
    const [displayName, setDisplayName] = useState(profile.displayName ? profile.displayName : '') 
    const [title, setTitle] = useState(profile.title ? profile.title : '') 
    const [pronunciation, setPronunciation] = useState(profile.pronunciation ? profile.pronunciation : '') 

    const dispatch = useDispatch();

    const handleUpdate = () => {
        const newProfile = {
            id: profile.id,
            fullName,
            displayName: displayName === '' ? null : displayName,
            title: title === '' ? null : title,
            pronunciation: pronunciation === '' ? null : pronunciation
        }
        console.log(newProfile);
        dispatch(updateWorkspaceUser(newProfile))
        closeModals();
    }
    return (
        <div className="edit-profile-modal">
            <header className="edit-profile-header-container">
                <h1 className="edit-profile-header-text">Edit your profile</h1>
            </header>
            <div className="edit-profile-form-container">
                <form className="edit-profile-form">
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Full name</span>
                        <span><input value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            className="edit-profile-input"/></span>
                        {fullName === '' && (<div className='full-name-error'><FormError error={"Unforunately, you can't leave this blank"} /></div>)}
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Display name</span>
                        <span><input value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="edit-profile-input" 
                            placeholder='Display Name'/></span>
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Title</span>
                        <span><input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="edit-profile-input" 
                            placeholder='Title'/></span>
                    </label>
                    <label className="edit-profile-label-container">
                        <span className="edit-profile-label">Pronunciation</span>
                        <span><input value={pronunciation} 
                            onChange={(e) => setPronunciation(e.target.value)}
                            className="edit-profile-input" 
                            placeholder={`Zoe (pronounced 'zo-ee')`}/></span>
                    </label>
                </form>
            </div>
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={closeModals}>Cancel</button>
                <button onClick={handleUpdate} className="green-text-button" disabled={fullName === ''}>Save Changes</button>
            </footer>
        </div>
    )
}

export default ShowEditProfile;