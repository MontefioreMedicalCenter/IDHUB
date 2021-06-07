import { Button } from '@material-ui/core'
import './addNewUser.scss';
import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import ManageUserEvent from '../../../../events/ManageUserEvent.ts'
import AddUserMediator from '../../Mediators/AddUserMediator.ts'
import { EventDispatcher } from '../../../../flexicious'
import saveB from '../../../../assets/images/saveB.png'
import { toast } from 'react-toastify';

const styles = {
    input1: {
        right: "70px",
        height: "35px",
        padding: "0px",
        fontSize: "13px",
        marginLeft: "5px"
    }
};

class AddNewUser extends EventDispatcher {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: false
        };
    }

    saveClick = (data) => {
        var case_regex = /[A-Z]/;
        if (case_regex.test(this.usernameValidatorSource())) {
            toast.warning("Please type in only the lower-case letters for the user Id !")
        } else {
            this.dispatchEvent(new ManageUserEvent(ManageUserEvent.ADD_USER));
        }
    }

    usernameValidatorSource = () => {
        return document.getElementById('userId').value;
    }

    userFirstNameValidatorSource = () => {
        return document.getElementById('firstname').value;
    }

    userLastNameValidatorSource = () => {
        return document.getElementById('lastName').value;
    }
    address1ValidatorSource = () => {
        return document.getElementById('address1').value;
    }
    address2ValidatorSource = () => {
        return document.getElementById('address2').value;
    }
    cityValidatorSource = () => {
        return document.getElementById('city').value;
    }
    citystateValidatorSource = () => {
        return document.getElementById('state').value;
    }
    zipValidatorSource = () => {
        return document.getElementById('zip').value;
    }
    phoneNumberValidatorSource = () => {
        return document.getElementById('phone').value;
    }
    emailValSrc = () => {
        return document.getElementById('email').value;
    }

    componentDidMount() {
        this.mediator = new AddUserMediator();
        this.mediator.onRegister(this);
    }

    validateUserId = (props) => {
        var UserId = document.getElementById('userId').value
        var userExists = props.users.current.getDataProvider().filter(x => x.userId === UserId)
        this.setState({ errorMsg: userExists.length > 0 })
    }

    render() {

        return (
            <div>
                <div className="add-user-containers">
                    <div style={{ overflow: "auto" }}>
                        <div style={{ flexDirection: "column", justifyContent: "center", display: "flex", overflow: "auto", alignItems: "center" }}>

                            <div className="container-space" >
                                User Id: <TextField
                                    id="userId"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                    onBlur={() => this.validateUserId(this.props)}
                                    error={(this.state.errorMsg) ? true : false}
                                />
                            </div>
                            <div className="container-space">
                                First Name: <TextField
                                    id="firstname"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                Last Name: <TextField
                                    id="lastName"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                Address: <TextField
                                    id="address1"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                Address Line 2: <TextField
                                    id="address2"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                City: <TextField
                                    id="city"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                State: <TextField
                                    id="state"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                ZIP: <TextField
                                    id="zip"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                Phone: <TextField
                                    id="phone"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space">
                                Email: <TextField
                                    id="email"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px", margin: "2px" }}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="container-space">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={(data) => { this.saveClick(data) }}
                                    style={{ maxWidth: '30px', height: '20px', fontSize: 'xx-small' }}
                                >
                                    <img src={saveB} alt="saveB" />
                                    Save
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default withStyles(styles)(AddNewUser);