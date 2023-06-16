import SlaqueLogo from '../SlaqueLogo'
import './SessionHeader.css'

const SessionHeader = ({type}) => {
    const title = type === "login" ? "Sign in to Slaque" : "First, enter your credentials"

    return (
        <>
            <header className="session-header">
                <div className="left-col"></div>
                <SlaqueLogo isColorful={true} color="black"/>
                <div className="right-col"></div>
            </header>
            <h1 className="session-title">{ title }</h1>
            <p className="suggest">We suggest using the <strong>email address you use at work.</strong></p>
        </>
    )
}

export default SessionHeader;