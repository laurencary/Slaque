import { FaUser } from 'react-icons/fa'

import './UserIcon.css'

const UserIcon = ({wusId, size}) => {

    const wickedThemeArr = [
        ['black', 'yellowgreen'],
        ['purple', 'white'],
        ['silver', 'black'],
        ['azure', 'teal'],
        ['darkgreen', 'cornsilk'],
        ['cornsilk', 'darkgoldenrod'],
        ['azure', 'darkslateblue'],
        ['floralwhite', 'firebrick'],
        ['ghostwhite', 'gold'],
        ['ghostwhite', 'indigo'],
        ['ghostwhite', 'lightseagreen'],
        ['azure', 'royalblue'],
        ['linen', 'lightpink'],
        ['azure', 'darkolivegreen'],
        ['azure', 'royalblue'],

    ]
    const otherThemeArr = [
        ['azure', 'coral'],
        ['azure', 'darkblue'],
        ['azure', 'darkmagenta'],
        ['azure', 'darkseagreen'],
        ['azure', 'indianred'],
        ['azure', 'lightslategrey'],
        ['azure', 'mediumpurple'],
        ['mediumslateblue', 'azure'],
        ['azure', 'midnightblue'],
        ['seagreen', 'seashell'],
        ['azure', 'steelblue'],
        ['azure', 'maroon'],
        ['azure', 'navy'],
        ['azure', 'green'],
        ['darkgray', 'antiquewhite'],
        ['azure', 'darkslategrey'],
        ['darkslategrey', 'darkturquoise'],
        ['firebrick', 'ghostwhite'],
        ['honeydew', 'lightseagreen']
    ]

    const colors = wusId < 16 ? 
        wickedThemeArr[wusId - 1] : 
        otherThemeArr[(wusId - 16) % 18]

    return (
        <div className={size === 'xsmall' ? `user-icon-container` : `user-icon-container overflow-hidden`} style={{ backgroundColor: colors[0] }}>
            <FaUser className={`user-icon ${size}`} color={colors[1]} />
        </div>
    )
}

export default UserIcon;