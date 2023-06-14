import './SessionForm.css'

const SessionForm = ({ handleSubmit, email, handleSetEmail, password, handleSetPassword, buttonText }) => {
    
    return (
        <form onSubmit={handleSubmit} className="session-form">
            <input type="text"
                className='form-input'
                value={email}
                onChange={handleSetEmail}
                placeholder="name@work-email.com" />
            <input type="password"
                className='form-input'
                value={password}
                onChange={handleSetPassword}
                placeholder="password" />
            <button className='session-button'>{buttonText}</button>
        </form>
    )

}

export default SessionForm;