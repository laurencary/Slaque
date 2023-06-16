import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
// import './DemoButton.css'

const DemoButton = ({ classNm }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ email:'usr@email.io', password:'starwars' }))
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
        <Link to="/welcome" onClick={handleSubmit} className={classNm}>Sign In With Demo</Link>
    )
}

export default DemoButton