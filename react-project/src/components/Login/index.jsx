/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import './styles.scss'
import TextFeildComponent from '../../shared/components/TextFeildComponent'
import ButtonComponent from '../../shared/components/ButtonComponent'
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from 'react-router';
import LoginService from '../../service/cfc/LoginService';
import { useDispatch } from 'react-redux';
import { saveUserDetails } from '../../AppConfig/store/actions/loginAction';
import Montefiore from "../../assets/images/Doing-More-Logo.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [error, setError] = useState({
        userName: false,
        password: false
    });
    const [state, setState] = useState({
        userName: "",
        password: ""
    })

    const handleChangeTxt = useCallback((event) => {
        setState({ ...state, [event.target.id]: event.target.value })
        setError({...error, [event.target.id]: event.target.value === ""})
    }, [state, error])

    const loginResultHandler = (resp) => {
        if (resp.result) {
            localStorage.setItem('userDetails',
                JSON.stringify(resp.result)
            )
            localStorage.setItem('user-id',resp.result["user-id"])

            dispatch(saveUserDetails(resp.result))
            history.push('/main/worklist')
        }
    }

    const emptyField = () =>{
        toast.warning("Fields cannot be empty!!")
    }

    const loginFaultHandler = ({ error }) => {
        toast.error(error.response.data.reason);
    }

    const handleOnLogin = () => {
        if(state.userName === "" && state.password === ""){
            emptyField()
        }
        if (state.userName && state.password) {
            LoginService.getInstance().login(
                state.userName,
                state.password,
                loginResultHandler,
                loginFaultHandler
            )
        }
    }
    return (
        <div className='login-root-container' >
            <div className='login-child-container'>
                <div className="title-logo">
                    <img
                        id="montefiore"
                        alt="Montefiorelogo"
                        src={Montefiore}
                        style={{ height: "30px" }}
                    />
                </div> &nbsp;
                <div className="textfield">
                    <PersonIcon style={{ height: "3em" }} /> &nbsp;
                    <TextFeildComponent
                        label="username"
                        id="userName"
                        type="text"
                        value={state.userName}
                        onChange={handleChangeTxt}
                        error={error.userName}
                    />
                </div>
                <div className="passwordfield">
                    <VpnKeyIcon style={{ height: "3em" }} /> &nbsp;
                    <TextFeildComponent
                        label="password"
                        id="password"
                        type="password"
                        value={state.password}
                        onChange={handleChangeTxt}
                        error={error.password}
                    />
                </div>
                <div className="button">
                    <ButtonComponent
                        onClick={handleOnLogin}
                    />                    
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login