import React from 'react'
import TextFeildComponent from '../../shared/components/TextFeildComponent'
import './styles.scss'

const Login = () => {
    return <div className='login-root-container' >
        <div>
            <TextFeildComponent /><br />
            <TextFeildComponent />
        </div>
    </div>
}

export default Login