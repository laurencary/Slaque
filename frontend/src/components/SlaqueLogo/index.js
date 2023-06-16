import { Link } from 'react-router-dom'
import SlackLogo from '../../images/slack_logo.svg'
import SlackLogoYB from '../../images/slack_logo_yb.svg'
import './SlaqueLogo.css'

const SlaqueLogo = ({isColorful, color}) => {
    return (
        <Link to="/"className="logo-container">
            <img src={ isColorful ? SlackLogo : SlackLogoYB } className="logo-img" />
            <h1 className="logo-text" style={{color: color}}>slaque</h1>
        </Link>
    )
}

export default SlaqueLogo;