import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonComponent = (props) => {
    return (
        <Button variant="contained" color={props.color} />
    );
}

export default ButtonComponent