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

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [state, setState] = useState({
        userName: "",
        password: ""
    })

    const handleChangeTxt = useCallback((event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }, [state])

    const loginResultHandler = (resp) => {
        if (resp.result) {
            localStorage.setItem('userDetails',
                JSON.stringify(resp.result)
            )
            dispatch(saveUserDetails(resp.result))
            history.push('/main/worklist')
        }
    }

    const loginFaultHandler = (err) => {
        console.log(err)
    }

    const handleOnLogin = () => {
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
                <div className="textfield">
                    <PersonIcon style={{ height: "3em" }} /> &nbsp;
                    <TextFeildComponent
                        label="username"
                        id="userName"
                        type="text"
                        value={state.userName}
                        onChange={handleChangeTxt}
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
                    />
                </div>
                <div className="button">
                    <ButtonComponent
                        onClick={handleOnLogin}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login