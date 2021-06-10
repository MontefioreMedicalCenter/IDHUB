import ManageUserEvent from '../../../events/ManageUserEvent.ts'
// import CloseEvent from "../../../events/CloseEvent.ts"
import AdminService from '../../../service/cfc/AdminService.ts'
import IdUser from '../../../vo/main/IdUser'
import AddUser from '../Views/AddNewUser.js'
import Mediator from './Mediator.ts'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import store from '../../../AppConfig/store/configureStore'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import { toast } from 'react-toastify'

export default class AddUserMediator extends Mediator {
	/*[Inject]*/
	public view: AddUser

	/*[Inject]*/
	public service: AdminService = AdminService.getInstance()
	// private log: ILogger = this.Log.getLogger('AddUserMediator')
	public onRegister(view: AddUser): void {
		this.view = view
		// this.mapListener(this.view, CloseEvent.CLOSE, this.dispose, CloseEvent)
		//usernameValidator.source=view.usernameValidatorSource;
		//usernameValidator.property=view.usernameValidatorProperty;
		//emailVald.source=view.emailValSrc;
		//emailVald.property=view.usernameValidatorProperty;
		this.mapListener(
			this.view,
			ManageUserEvent.ADD_USER,
			this.saveUserRev,
			ManageUserEvent
		)
	}
	private saveUser(event: ManageUserEvent): void {
		var usernameValidator: Validator
		var emailVald: EmailValidator
		if (!Validator.validateAll([usernameValidator, emailVald]).length) {
			var user: IdUser = new IdUser()
			user.userActiveFlag = 1
			user.userId = this.view.userId.text
			user.userFirstName = this.view.firstname.text
			user.userLastName = this.view.lastName.text
			user.userAddress1 = this.view.address1.text
			user.userAddress2 = this.view.address2.text
			user.userCity = this.view.city.text
			user.userState = this.view.state.text
			user.userZip = this.view.zip.text
			user.userPhone = this.view.phone.text
			user.userEmail = this.view.email.text
			this.service.addNewUser(user)
			PopUpManager.removePopUp(this.view)
			this.mediatorMap.removeMediatorByView(this.view)
		} else this.view.userId.setFocus()
	}

	private saveUserRev(event: ManageUserEvent): void {
		// alert('Save user is being called')
		//Alert.show("saveUserRev")
		//if (Validator.validateAll([usernameValidator,emailVald]).length)
		var val: boolean = true
		var valMsg: string = ''
		var numb_regex: RegExp = /^[a-zA-Z]*$/
		var user = this.view.usernameValidatorSource()

		// var usernameValidator: Validator = new Validator()
		// usernameValidator.source = this.view.usernameValidatorSource
		// usernameValidator.property = this.view.usernameValidatorProperty
		// var uValResult: ValidationResultEvent = usernameValidator.validate()
		//Alert.show("uValResult: " + uValResult)
		if (
			typeof this.view.usernameValidatorSource() !== 'string' ||
			this.view.usernameValidatorSource() === ''
		) {
			// 	const emailVal = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
			// const valResultemail = emailVal.test(this.view.emailValSrc())
			// if(!valResultemail){
			// if (uValResult.type == 'invalid') {
			//Alert.show("User Id Invalid !")
			valMsg += 'User Id, '
			// this.view.userId.setFocus()
			val = false
		}
		// var userFirstNameValidator: Validator = new Validator()
		// userFirstNameValidator.source = this.view.userFirstNameValidatorSource
		// userFirstNameValidator.property = this.view.userLastNameValidatorProperty
		// var uFnValResult: ValidationResultEvent = userFirstNameValidator.validate()
		var firstname = numb_regex.test(this.view.userFirstNameValidatorSource())
		if (!firstname) {
			// if (
			// 	typeof this.view.userFirstNameValidatorSource() !== 'string' &&
			// 	this.view.usernameValidatorSource() === ''
			// ) {
			//Alert.show("uValResult: " + uValResult)
			// if (uFnValResult.type == 'invalid') {
			//Alert.show("User Id Invalid !")
			valMsg += 'First Name, '
			// this.view.firstname.setFocus()
			val = false
			// this.view.firstname.errorString = ' '
		}

		// var userLastNameValidator: Validator = new Validator()
		// userLastNameValidator.source = this.view.userLastNameValidatorSource
		// userLastNameValidator.property = this.view.userLastNameValidatorProperty
		// var uLnValResult: ValidationResultEvent = userLastNameValidator.validate()
		var lastname = numb_regex.test(this.view.userLastNameValidatorSource())
		if (!lastname) {
			//Alert.show("uValResult: " + uValResult)
			// if (uLnValResult.type == 'invalid') {
			//Alert.show("User Id Invalid !")
			valMsg += 'Last Name, '
			// this.view.lastName.setFocus()
			val = false
			// this.view.lastName.errorString = ' '
		}

		// var phoneNumberValidator: PhoneNumberValidator = new PhoneNumberValidator()
		// phoneNumberValidator.source = this.view.phoneNumberValidatorSource
		// phoneNumberValidator.property = this.view.phoneNumberValidatorProperty
		// var phResult: ValidationResultEvent = phoneNumberValidator.validate()
		const number = `+1${this.view.phoneNumberValidatorSource().replaceAll("-"," ")}`
		// const valResultphone = isValidPhoneNumber(number)
		const valResultphone = isPossiblePhoneNumber(number)
		// if(typeof this.view.phoneNumberValidatorSource() !== "number" && this.view.usernameValidatorSource() === "") {
		if (!valResultphone) {
			//Alert.show("uValResult: " + uValResult)
			// if (phResult.type == 'invalid') {
			//Alert.show("User Id Invalid !")
			valMsg += 'Phone Number, '
			// this.view.phone.setFocus()
			// this.view.phone.onfocus
			val = false
			// this.view.phone.errorString = ' '
		}

		// var emailVld: EmailValidator = new EmailValidator()
		// emailVld.source = this.view.emailValSrc
		// emailVld.property = 'text'
		// var emValResult: ValidationResultEvent = emailVld.validate()

		const emailVal = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}/g)
		const valResultemail = emailVal.test(this.view.emailValSrc())
		if (!valResultemail) {
			// if (typeof this.view.emailValSrc() !== 'string' && this.view.usernameValidatorSource() === '') {
			//Alert.show("emValResult: " + emValResult)
			// if (emValResult.type == 'invalid') {
			//Alert.show("User Email Invalid !")
			valMsg += 'Email, '
			// this.view.email.setFocus()
			val = false
			//Alert.show(view.email.errorString)
			// this.view.email.errorString = ' '
			//var etmp:String=view.email.errorString
			//view.email.removeEventListener(FlexEvent.INVALID, emailVld.validate) // .errorString=" "
		}

		if (val) {
			var user: IdUser = new IdUser()
			user.userActiveFlag = 1
			user.userId = this.view.usernameValidatorSource()
			user.userFirstName = this.view.userFirstNameValidatorSource()
			user.userLastName = this.view.userLastNameValidatorSource()
			user.userAddress1 = this.view.address1ValidatorSource()
			user.userAddress2 = this.view.address2ValidatorSource()
			user.userCity = this.view.cityValidatorSource()
			user.userState = this.view.citystateValidatorSource()
			user.userZip = this.view.zipValidatorSource()
			user.userPhone = this.view.phoneNumberValidatorSource()
			user.userEmail = this.view.emailValSrc()
			this.service.addNewUser(user)
			// PopUpManager.removePopUp(this.view)
			// this.mediatorMap.removeMediatorByView(this.view)
			this.view.props.closePopup()
		} else {
			var cIndex: number = valMsg.lastIndexOf(',')
			var fValMsg: string = valMsg.substring(0, cIndex)
			// alert(fValMsg + ' Not Valid !')
			store.dispatch(showMessage('',
			        fValMsg + ' Not Valid' ,
                    'OK',
                    () => {
						
                    },
                    () => {}
                    ))
		}
	}

	public dispose(event: CloseEvent): void {
		this.onRemove()
	}

	public onRemove(): void {
		// PopUpManager.removePopUp(this.view)
		// this.eventMap.unmapListeners()
		// this.mediatorMap.removeMediatorByView(this.view)
		super.onRemove()
	}
}
