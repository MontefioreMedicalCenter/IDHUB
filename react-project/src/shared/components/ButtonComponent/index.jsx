import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonComponent = (props) => {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick = { () =>{
                            console.log("clicked...")
                        }}
            >
            Login
        </Button>
    );
}

export default ButtonComponent