import { FaUser } from 'react-icons/fa'

import './UserIcon.css'

const UserIcon = ({wusId}) => {

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
        ['linen', 'lightpink'],
        ['azure', 'royalblue'],
        ['azure', 'darkolivegreen']
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
        ['azure', 'cadetblue']
    ]

    const colors = wusId < 16 ? 
        wickedThemeArr[wusId - 1] : 
        otherThemeArr[(wusId - 16) % 16]

    return (
        <div className='user-icon-container' style={{ backgroundColor: colors[0] }}>
            <FaUser className={`user-icon ${"small"}`} color={colors[1]} />
        </div>
    )
}

export default UserIcon;