import React, { useCallback, useState } from 'react'
import TextFeildComponent from '../../shared/components/TextFeildComponent'
import ButtonComponent from '../../shared/components/ButtonComponent'
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from 'react-router';
import './styles.scss'

const Login = () => {

    const history = useHistory()
    const [state, setState] = useState({
        userName: "",
        password: ""
    })

    const handleChangeTxt = useCallback((event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }, [state])

    const handleOnLogin = useCallback(() => {
        localStorage.setItem('userDetails',
            JSON.stringify({
                "created-by": "system",
                "role-map": [
                    {
                        "access-active-flag": 1,
                        "created-by": "system",
                        "id": {
                            "role-id": "Admin",
                            "user-id": "mmishra"
                        },
                        "updated-by": "system"
                    }
                ],
                "updated-by": "system",
                "user-active-flag": 1,
                "user-email": "mmishra@montefiore.org",
                "user-first-name": "Mittul",
                "user-id": "mmishra",
                "user-last-name": "Mishra",
                "user-phone": "914-457-6018"
            })
        )
        history.push('/main/worklist')
    }, [])
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