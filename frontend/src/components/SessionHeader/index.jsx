import SlackLogo from '../../images/slack_logo.svg'
import './SessionHeader.css'

const SessionHeader = ({type}) => {
    const title = type === "login" ? "Sign in to Slack" : "First, enter your credentials"

    return (
        <>
            <header className="session-header">
                <div className="left-col"></div>
                <div className="center-col">
                    <img src={ SlackLogo } className="logo-img" />
                    <h1 className="logo-text">slaque</h1>
                </div>
                <div className="right-col"></div>
            </header>
            <h1 className="session-title">{ title }</h1>
            <p className="suggest">We suggest using the <strong>email address you use at work.</strong></p>
        </>
    )
}

export default SessionHeader;