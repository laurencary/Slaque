import SlackLogo from '../../images/slack_logo.svg'
import './SlaqueLogo.css'

const SlaqueLogo = () => {
    return (
        <div className="logo-container">
            <img src={SlackLogo} className="logo-img" />
            <h1 className="logo-text">slaque</h1>
        </div>
    )
}

export default SlaqueLogo;