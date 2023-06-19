import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import './SignPage.css';
import SessionHeader from '../SessionHeader';
import SessionForm from '../SessionForm';
import DemoButton from '../DemoButton';
import SessionSplitter from '../SessionSplitter';

const SigninPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        // history.push(`/client/${sessionUser.id}/get-started/landing`)
        return dispatch(sessionActions.login({ email, password }))
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
            <SessionHeader type="login" />
            <DemoButton classNm="demo-button-session" />
            <SessionSplitter />
            <SessionForm 
                email={ email }
                password={password}
                errors={errors}
                handleSubmit={ handleSubmit } 
                handleSetEmail={ handleSetEmail }
                handleSetPassword={handleSetPassword}
                buttonText="Sign In With Email"
                />
        </div>
    )
};

export default SigninPage