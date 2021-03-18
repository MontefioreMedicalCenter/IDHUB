import React from 'react'
import TextFeildComponent from '../../shared/components/TextFeildComponent'
import ButtonComponent from '../../shared/components/ButtonComponent'
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './styles.scss'

const Login = () => {
    return (
        <div className='login-root-container' >
            <div className='login-child-container'>
                <div className="textfield">
                    <PersonIcon style={{ height: "3em" }} /> &nbsp;
                    <TextFeildComponent
                        label="username"
                        id="text"
                        type="text"
                    />
                </div>
                <div className="passwordfield">
                    <VpnKeyIcon style={{ height: "3em" }} /> &nbsp;
                    <TextFeildComponent
                        label="password"
                        id="password"
                        type="password"
                    />
                </div>
                <div className="button">
                    <ButtonComponent />
                </div>
            </div>
        </div>
    );
}

export default Login