import { useDispatch } from "react-redux";
import * as sessionActions from '../../../store/session';
import { BiCopy } from 'react-icons/bi';
import { FiX } from "react-icons/fi";
import './DemoModal.css'
import { useState } from "react";

const DemoModal = ({setShowDemoModal}) => {
    const dispatch = useDispatch();
    const [urlValue, setUrlValue] = useState('https://slaque-app-dddbd857f989.herokuapp.com/')

    const handleLoginDemo1 = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ email: 'demo1@user.io', password: 'password' }))
    }
    const handleLoginDemo2 = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ email: 'demo2@user.io', password: 'password' }))
    }

    const handleCopy = () => {
        setUrlValue('copied!')
        setTimeout(() => setUrlValue('https://slaque-app-dddbd857f989.herokuapp.com/'), 2000)
        navigator.clipboard.writeText('https://slaque-app-dddbd857f989.herokuapp.com/')
    }

    return (
        <div className="demo-modal-container">
            <button className="close-demo-modal-button unstyled-button" onClick={() => setShowDemoModal(false)}><FiX /></button>
            <header className="demo-modal-header">Welcome to Slaque!</header>
            <p>
                To experience this clone's live messaging capabilities, there are 
                two demo profiles. Please use the following instructions to sign 
                into both accounts at the same time:
            </p>

            <ol className="demo-instructions-list">
                <li className="demo-instruction-item">Open a new incognito window, go to the following url
                    <div className="copy-url-container">
                        <span className={urlValue === "copied!" ? "bold-green" : "bold-purple"}>{urlValue}</span>
                        <button className={urlValue === "copied!" ? "copied unstyled-button" : "copy-button"} onClick={handleCopy}>
                            <BiCopy />
                        </button>
                    </div>
                </li>
                <li className="demo-instruction-item">
                    Click the <span className="bold-purple">SIGN IN WITH DEMO</span> button 
                    at the top right corner and then click on the <span 
                    className="bold-purple"> DEMO 2 SIGN IN</span> at the bottom of the modal
                </li>
                <li className="demo-instruction-item">Click on the <span
                    className="bold-purple"> DEMO 1 SIGN IN</span> at the bottom of this modal</li>
                <li className="demo-instruction-item">Launch the same workspace 
                and head to the same channel or direct message</li>
                <li className="demo-instruction-item">
                    Create, edit, and delete some messages with both users!
                </li>
            </ol>
            <div className="demo-buttons-container">
                <button className="button-purple signin" onClick={handleLoginDemo1}>DEMO 1 SIGN IN</button>
                <button className="button-purple signin" onClick={handleLoginDemo2}>DEMO 2 SIGN IN</button>
            </div>
        </div>
    )
}   

export default DemoModal;