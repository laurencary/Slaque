import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SigninForm.css';

const SigninFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
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

    return (
        <div className='p-refreshed_page'>
            <h1 className='p-refreshed_page__heading'>Sign in to Slaque</h1>
            <p>We suggest using the <strong>email address you use at work.</strong></p>
            <form onSubmit={ handleSubmit }>
                <input type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@work-email.com" />
                <input type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password" />
                <button>Sign In With Email</button>
            </form>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
    )
};

export default SigninFormPage