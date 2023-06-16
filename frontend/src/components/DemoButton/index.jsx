import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import './DemoButton.css'

const DemoButton = ({ classNm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/welcome')
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
        <button onClick={handleSubmit} className={classNm}>Sign In With Demo</button>
    )
}

export default DemoButton