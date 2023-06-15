import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignPage.css';
import SessionHeader from '../SessionHeader';
import SessionForm from '../SessionForm';
import DemoButton from '../DemoButton';
import SessionSplitter from '../SessionSplitter';

const SigninPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        document.body.classList.remove('purple')
        document.body.classList.add('white')
    }, [])

    let errorClass = "hidden";
    useEffect(() => {
        errorClass = errors.length === 0 ? "hidden" : "session-errors"
    }, [errors])

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }
    
    const handleSetEmail = (e) => setEmail(e.target.value);
    const handleSetPassword = (e) => setPassword(e.target.value);

    return (
        <div className='sign-page'>
            <SessionHeader type="login" />
            <DemoButton />
            <SessionSplitter />
            <SessionForm 
                handleSubmit={ handleSubmit } 
                email={ email }
                handleSetEmail={ handleSetEmail }
                password={password}
                handleSetPassword={handleSetPassword}
                buttonText="Sign In With Email"
                />
            <ul className={errorClass}>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
    )
};

export default SigninPage