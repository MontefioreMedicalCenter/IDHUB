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
import { validateEmail } from '../../../../shared/utils';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

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
            errorMsg: false,
            errorTxt: "",
            errorCaps: "",
            emailError: {
                errorMessage: "",
                isError: false
            },
            phoneError: false,
            phoneNum: "",
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
        var case_regex = /[A-Z]/;
        var userExists = props.users.current.getDataProvider().filter(x => x.userId === UserId)
        this.setState({ errorMsg: case_regex.test(UserId) || userExists.length > 0 })
        if (userExists.length > 0) {
            this.setState({ errorTxt: "User Already Exists!" })
        } else {
            this.setState({ errorTxt: "" })
        }
        if (case_regex.test(UserId)) {
            this.setState({ errorCaps: "Please type in only the lower-case letters for the user Id !" })
        } else {
            this.setState({ errorCaps: "" })
        }
    }

    handleValidateEmail = e => {
        const errorObj = validateEmail(e.target.value)
        this.setState({ emailError: errorObj })
    }

    handleValidatePhone = e => {
        const number = `+1${e.target.value.replaceAll("-", "")}`
        const isValidPhone = isPossiblePhoneNumber(number)
        this.setState({ phoneError: !isValidPhone })
    }

    handelOnChange = e => {
        var currentNumber = e.target.value.replaceAll("-", "")
        currentNumber = Array.from(currentNumber).map((e, index) => (index === 3 || index === 6) ? '-' + e : e).join('')
        this.setState({ phoneNum: currentNumber })
    }

    render() {

        return (
            <div>
                <div className="add-user-containers">
                    <div style={{ overflow: "auto" }}>
                        <div style={{ flexDirection: "column", justifyContent: "center", display: "flex", overflow: "auto", alignItems: "center" }}>

                            <div className="container-space" style={{ marginLeft: "24px" }}>
                                User Id : <TextField
                                    id="userId"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                    onBlur={() => this.validateUserId(this.props)}
                                    error={this.state.errorMsg}
                                    helperText={this.state.errorTxt || this.state.errorCaps}
                                />&nbsp;&nbsp;
                                <h5 className="required-font-style">*Required</h5>
                            </div>
                            <div className="container-space" style={{ marginTop: "-12px" }}>
                                First Name : <TextField
                                    id="firstname"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />&nbsp;&nbsp;
                                <h5 className="required-font-style">*Required</h5>
                            </div>
                            <div className="container-space" style={{ marginTop: "-12px" }}>
                                Last Name : <TextField
                                    id="lastName"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />&nbsp;&nbsp;
                                <h5 className="required-font-style">*Required</h5>
                            </div>
                            <div className="container-space" style={{ marginRight: "82px", marginTop: "-8px" }}>
                                Address : <TextField
                                    id="address1"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space" style={{ marginRight: "82px" }}>
                                Address Line 2 : <TextField
                                    id="address2"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space" style={{ marginRight: "82px" }}>
                                City : <TextField
                                    id="city"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space" style={{ marginRight: "82px" }}>
                                State : <TextField
                                    id="state"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space" style={{ marginRight: "82px" }}>
                                ZIP : <TextField
                                    id="zip"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                />
                            </div>
                            <div className="container-space" style={{ marginLeft: "28px", marginTop: "-6px" }}>
                                Phone : <TextField
                                    id="phone"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                    onBlur={this.handleValidatePhone}
                                    onChange={this.handelOnChange}
                                    value={this.state.phoneNum}
                                    error={this.state.phoneError}
                                    helperText={this.state.phoneError ? "Invalid phone" : ""}
                                />&nbsp;&nbsp;
                                <h5 className="required-font-style">*Required</h5>
                            </div>
                            <div className="container-space" style={{ marginLeft: "28px", marginTop: "-12px" }}>
                                Email : <TextField
                                    id="email"
                                    variant="outlined"
                                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                                    style={{ width: "200px", marginLeft: "10px" }}
                                    autoComplete='off'
                                    onBlur={this.handleValidateEmail}
                                    error={this.state.emailError.isError}
                                    helperText={this.state.emailError.errorMessage}
                                />&nbsp;&nbsp;
                                <h5 className="required-font-style">*Required</h5>
                            </div>
                            <div className="container-space">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={(data) => { this.saveClick(data) }}
                                    style={{ width: '100px', maxWidth: '100px', height: '30px', fontSize: 'xx-small', justifyContent: 'space-between', display: 'flex' }}
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