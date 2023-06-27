import { Link } from 'react-router-dom'
import SlaqueLogo from '../../SlaqueLogo'
import './SessionHeader.css'

const SessionHeader = ({type}) => {
    const title = type === "login" ? "Sign in to Slaque" : "First, enter your credentials"

    const rightHeader = () => {
        if (type === 'login') {
            return (
                <>
                    <p id='signup-redirect-text'>New to Slaque?</p>
                    <Link to="/get-started/createnew" id="signup-redirect-link">Create an account</Link>
                </>
            )
        } else {
            return (<></>)
        }
    }

    return (
        <>
            <header className="session-header">
                <div className="left-col"></div>
                <SlaqueLogo isColorful={true} color="black"/>
                <div className="right-col">{rightHeader()}</div>
            </header>
            <h1 className="session-title">{ title }</h1>
            <p className="suggest">We suggest using the <strong>email address you use at work.</strong></p>
        </>
    )
}

export default SessionHeader;