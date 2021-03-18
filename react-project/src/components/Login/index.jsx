import React from 'react'
import TextFeildComponent from '../../shared/components/TextFeildComponent'
import './styles.scss'

const Login = () => {
    return (
        <div className='login-root-container' >
            <div className='login-child-container'>
                <div className="textfield">
                    <TextFeildComponent id="username" label="username" type="text" />
                </div>
                <div className="passwordfield">
                    <TextFeildComponent id="password" label="password" type="password" />
                </div>
                <div className="button">
                    {/* <ButtonComponent color="red" /> */}
                </div>
            </div>
        </div>
    );
}

export default Login