import { FiAlertCircle } from 'react-icons/fi';

const FormError = ({error}) => {
    return (
        <li className="session-errors"><FiAlertCircle className='alert'/>{error}</li>
    )
}

export default FormError;

