import { FaUser } from 'react-icons/fa'

import './UserIcon.css'

const UserIcon = ({wusID}) => {


    return (
        <div className='user-icon-container'>
            <FaUser className={`user-icon ${"small"}`} />
        </div>
    )
}

export default UserIcon;