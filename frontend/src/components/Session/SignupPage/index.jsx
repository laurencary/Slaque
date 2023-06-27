import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import '../SigninPage/SignPage.css';
import SessionHeader from '../SessionHeader';
import SessionForm from '../SessionForm';
import DemoButton from '../../DemoButton';
import SessionSplitter from '../SessionSplitter';


const SignupPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        document.body.classList.remove('purple')
        document.body.classList.add('white')
    }, [])

    if (sessionUser) return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.signup({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const handleSetEmail = (e) => setEmail(e.target.value);
    const handleSetPassword = (e) => setPassword(e.target.value);

    return (
        <div className='sign-page'>
            <SessionHeader type="signup" />
            <SessionForm
                email={email}
                password={password}
                errors={errors}
                handleSubmit={handleSubmit}
                handleSetEmail={handleSetEmail}
                handleSetPassword={handleSetPassword}
                buttonText="Continue"
            />
            <SessionSplitter />
            <DemoButton classNm={"demo-button-session"} />
            <div className="signin-redirect">
                <p className='signin-redirect-text'>Already using Slaque?</p>
                <Link to="/signin" className='signin-redirect-link'>Sign in to an existing workspace</Link>
            </div>
        </div>
    )
};

export default SignupPage