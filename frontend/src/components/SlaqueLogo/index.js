import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SlackLogo from '../../images/slack_logo.svg'
import SlackLogoYB from '../../images/slack_logo_yb.svg'
import './SlaqueLogo.css'

const SlaqueLogo = ({isColorful, color}) => {
    const user = useSelector(state => state.session.user)

    const home = user ? "/welcome" : "/"

    return (
        <Link to={home} className="logo-container">
            <img src={ isColorful ? SlackLogo : SlackLogoYB } className="logo-img" alt="Go to home page"/>
            <h1 className="logo-text" style={{color: color}}>slaque</h1>
        </Link>
    )
}

export default SlaqueLogo;