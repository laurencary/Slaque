import FormError from './FormError';
import './SessionForm.css'

const SessionForm = ({ handleSubmit, email, handleSetEmail, password, handleSetPassword, buttonText, errors}) => {
    let passwordErrors = [];
    let emailErrors = [];

    if (errors.length > 0 && typeof errors[0] !== "string") {
        passwordErrors = ["Invalid credentials"]
    } else {
        passwordErrors = errors.filter(error => error.includes("Password"));
        emailErrors = errors.filter(error => error.includes("Email"));
    }

    return (
        <form onSubmit={handleSubmit} className="session-form">
            <div className="input-container">
                <input type="text"
                    className='form-input'
                    value={email}
                    onChange={handleSetEmail}
                    placeholder="name@work-email.com" />
                <ul>{emailErrors.map((emailError) => (
                    <FormError error={emailError} />
                ))}</ul>
            </div>
            <div className="input-container">
                <input type="password"
                    className='form-input'
                    value={password}
                    onChange={handleSetPassword}
                    placeholder="password" />
                <ul>{passwordErrors.map((passwordError) => (
                    <FormError error={passwordError} />
                ))}</ul>
            </div>
            <button className='session-button'>{buttonText}</button>
        </form>
    )

}

export default SessionForm;

