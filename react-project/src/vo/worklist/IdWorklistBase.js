// import ExampleUtils from '../../utils/ExampleUtils'
import VoBase from '../VoBase'
import IdWorklistGroup from './IdWorklistGroup'
import IdWorklistPK from './IdWorklistPK'

export default class IdWorklistBase extends VoBase {
	constructor(
		_id,
		_IPPhone,
		_additionalComments,
		_affiliateEmailRequest = 'N',
		_assignedMonteId,
		_campusCode,
		_companyCode,
		_createDate,
		_createdBy,
		_dateOfBirth,
		_dateOfBirthStr,
		_department,
		_division,
		_documentCount,
		_employeeGroup,
		_employeeSubGroup,
		_endDate,
		_endDateStr,
		_epcsHardTokenRequest = 'N',
		_epfRequest = 'N',
		_epicRequest = 'N',
		_errorMessage,
		_firstName,
		_firstNameCleaned,
		_gender,
		_homeDriveRequest = 'N',
		_lastName,
		_lastNameCleaned,
		_loaReturnDate,
		_loaStartDate,
		_managerSourceUniqueId,
		_middleNameOrInitial,
		_mmcEmailRequest = 'N',
		_nameSuffix,
		_nonMonteEmail,
		_officeAddress,
		_officeCity,
		_officePhone,
		_officeState,
		_officeZipCode,
		_preHireFlag,
		_preferredName,
		_sourceSystem,
		_sourceUniqueId,
		_ssn,
		_ssn4,
		_ssn4Hash,
		_ssnHash,
		_startDate,
		_startDateStr,
		_statusCode,
		_title,
		_udcid,
		_updateDate,
		_updatedBy,
		_worklistStatus,
		_worklistGroup,
		_managerPhone,
		_managerEmail,
		_reviewerComments,
		_noSSN = 'N'
	) {
		super()
		this._id = _id
		this._IPPhone = _IPPhone
		this._additionalComments = _additionalComments
		this._affiliateEmailRequest = _affiliateEmailRequest
		this._assignedMonteId = _assignedMonteId
		this._campusCode = _campusCode
		this._companyCode = _companyCode
		this._createDate = _createDate
		this._createdBy = _createdBy
		this._dateOfBirth = _dateOfBirth
		this._dateOfBirthStr = _dateOfBirthStr
		this._department = _department
		this._division = _division
		this._documentCount = _documentCount
		this._employeeGroup = _employeeGroup
		this._employeeSubGroup = _employeeSubGroup
		this._endDate = _endDate
		this._endDateStr = _endDateStr
		this._epcsHardTokenRequest = _epcsHardTokenRequest
		this._epfRequest = _epfRequest
		this._epicRequest = _epicRequest
		this._errorMessage = _errorMessage
		this._firstName = _firstName
		this._firstNameCleaned = _firstNameCleaned
		this._gender = _gender
		this._homeDriveRequest = _homeDriveRequest
		this._lastName = _lastName
		this._lastNameCleaned = _lastNameCleaned
		this._loaReturnDate = _loaReturnDate
		this._loaStartDate = _loaStartDate
		this._managerSourceUniqueId = _managerSourceUniqueId
		this._middleNameOrInitial = _middleNameOrInitial
		this._mmcEmailRequest = _mmcEmailRequest
		this._nameSuffix = _nameSuffix
		this._nonMonteEmail = _nonMonteEmail
		this._officeAddress = _officeAddress
		this._officeCity = _officeCity
		this._officePhone = _officePhone
		this._officeState = _officeState
		this._officeZipCode = _officeZipCode
		this._preHireFlag = _preHireFlag
		this._preferredName = _preferredName
		this._sourceSystem = _sourceSystem
		this._sourceUniqueId = _sourceUniqueId
		this._ssn = _ssn
		this._ssn4 = _ssn4
		this._ssn4Hash = _ssn4Hash
		this._ssnHash = _ssnHash
		this._startDate = _startDate
		this._startDateStr = _startDateStr
		this._statusCode = _statusCode
		this._title = _title
		this._udcid = _udcid
		this._updateDate = _updateDate
		this._updatedBy = _updatedBy
		this._worklistStatus = _worklistStatus
		this._worklistGroup = _worklistGroup
		this._managerPhone = _managerPhone
		this._managerEmail = _managerEmail
		this._reviewerComments = _reviewerComments
		this._noSSN = _noSSN
	}

	getComplexProperty(key) {
		if (key === 'id') {
			return new IdWorklistPK()
		} else if (key === 'worklistGroup') {
			return new IdWorklistGroup()
		}
		return super.getComplexProperty(key)
	}

	set id(value) {
		this._id = value
	}
	get id() {
		return this._id
	}
	set IPPhone(value) {
		this._IPPhone = value
	}
	get IPPhone() {
		return this._IPPhone
	}
	set additionalComments(value) {
		this._additionalComments = value
	}
	get additionalComments() {
		return this._additionalComments
	}
	set affiliateEmailRequest(value) {
		if (this._affiliateEmailRequest == null) this._affiliateEmailRequest = ''
		this._affiliateEmailRequest = value
	}
	get affiliateEmailRequest() {
		return this._affiliateEmailRequest
	}
	set assignedMonteId(value) {
		this._assignedMonteId = value
	}
	get assignedMonteId() {
		return this._assignedMonteId
	}
	set campusCode(value) {
		this._campusCode = value
	}
	get campusCode() {
		if (this._campusCode == null) this._campusCode = ''
		return this._campusCode
	}
	set companyCode(value) {
		this._companyCode = value
	}
	get companyCode() {
		if (this._companyCode == null) this._companyCode = ''
		return this._companyCode
	}
	set createDate(value) {
		this._createDate = value
	}
	get createDate() {
		return this._createDate
	}
	set createdBy(value) {
		this._createdBy = value
	}
	get createdBy() {
		return this._createdBy
	}
	set dateOfBirth(value) {
		this._dateOfBirth = value
		if (this._dateOfBirth != null)
			this._dateOfBirthStr = new Date(this._dateOfBirthStr).toDateString()
	}
	get dateOfBirth() {
		return this._dateOfBirth
	}
	get dateOfBirthStr() {
		return this._dateOfBirthStr
	}
	set dateOfBirthStr(value) {
		this._dateOfBirthStr = value
	}
	set department(value) {
		this._department = value
	}
	get department() {
		if (this._department == null) this._department = ''
		return this._department
	}
	set division(value) {
		this._division = value
	}
	get division() {
		return this._division
	}
	set documentCount(value) {
		this._documentCount = value
	}
	get documentCount() {
		return this._documentCount
	}
	set employeeGroup(value) {
		this._employeeGroup = value
	}
	get employeeGroup() {
		return this._employeeGroup
	}
	set employeeSubGroup(value) {
		this._employeeSubGroup = value
	}
	get employeeSubGroup() {
		if (this._employeeSubGroup == null) this._employeeSubGroup = ''
		return this._employeeSubGroup
	}
	set endDate(value) {
		this._endDate = value
		if (this._endDate != null)
			this._endDateStr = new Date(this._endDate).toDateString()
	}
	get endDate() {
		return this._endDate
	}
	set epcsHardTokenRequest(value) {
		this._epcsHardTokenRequest = value
	}
	get epcsHardTokenRequest() {
		if (this._epcsHardTokenRequest == null) this._epcsHardTokenRequest = ''
		return this._epcsHardTokenRequest
	}
	set epfRequest(value) {
		this._epfRequest = value
	}
	get epfRequest() {
		if (this._epfRequest == null) this._epfRequest = ''
		return this._epfRequest
	}
	set epicRequest(value) {
		this._epicRequest = value
	}
	get epicRequest() {
		if (this._epicRequest == null) this._epicRequest = ''
		return this._epicRequest
	}
	set firstName(value) {
		this._firstName = value
	}
	get firstName() {
		if (this._firstName == null) this._firstName = ''
		return this._firstName
	}
	set firstNameCleaned(value) {
		this._firstNameCleaned = value
	}
	get firstNameCleaned() {
		return this._firstNameCleaned
	}
	set gender(value) {
		this._gender = value
	}
	get gender() {
		if (this._gender == null) this._gender = ''
		return this._gender
	}
	set homeDriveRequest(value) {
		if (this._homeDriveRequest == null) this._homeDriveRequest = ''
		this._homeDriveRequest = value
	}
	get homeDriveRequest() {
		return this._homeDriveRequest
	}
	set lastName(value) {
		this._lastName = value
	}
	get lastName() {
		if (this._lastName == null) this._lastName = ''
		return this._lastName
	}
	set lastNameCleaned(value) {
		this._lastNameCleaned = value
	}
	get lastNameCleaned() {
		return this._lastNameCleaned
	}
	set loaReturnDate(value) {
		this._loaReturnDate = value
	}
	get loaReturnDate() {
		return this._loaReturnDate
	}
	set loaStartDate(value) {
		this._loaStartDate = value
	}
	get loaStartDate() {
		return this._loaStartDate
	}
	set managerSourceUniqueId(value) {
		this._managerSourceUniqueId = value
	}
	get managerSourceUniqueId() {
		if (this._managerSourceUniqueId == null) this._managerSourceUniqueId = ''
		return this._managerSourceUniqueId
	}
	set middleNameOrInitial(value) {
		this._middleNameOrInitial = value
	}
	get middleNameOrInitial() {
		return this._middleNameOrInitial
	}
	set mmcEmailRequest(value) {
		this._mmcEmailRequest = value
	}
	get mmcEmailRequest() {
		if (this._mmcEmailRequest == null) this._mmcEmailRequest = ''
		return this._mmcEmailRequest
	}
	set nameSuffix(value) {
		this._nameSuffix = value
	}
	get nameSuffix() {
		return this._nameSuffix
	}
	set nonMonteEmail(value) {
		this._nonMonteEmail = value
	}
	get nonMonteEmail() {
		return this._nonMonteEmail
	}
	set officeAddress(value) {
		this._officeAddress = value
	}
	get officeAddress() {
		return this._officeAddress
	}
	set officeCity(value) {
		this._officeCity = value
	}
	get officeCity() {
		return this._officeCity
	}
	set officePhone(value) {
		this._officePhone = value
	}
	get officePhone() {
		return this._officePhone
	}
	set officeState(value) {
		this._officeState = value
	}
	get officeState() {
		return this._officeState
	}
	set officeZipCode(value) {
		this._officeZipCode = value
	}
	get officeZipCode() {
		return this._officeZipCode
	}
	set preHireFlag(value) {
		this._preHireFlag = value
	}
	get preHireFlag() {
		return this._preHireFlag
	}
	set preferredName(value) {
		this._preferredName = value
	}
	get preferredName() {
		return this._preferredName
	}
	set sourceSystem(value) {
		this._sourceSystem = value
	}
	get sourceSystem() {
		return this._sourceSystem
	}
	set sourceUniqueId(value) {
		this._sourceUniqueId = value
	}
	get sourceUniqueId() {
		return this._sourceUniqueId
	}
	set ssn(value) {
		// var ssnval = ExampleUtils.phoneFormatter2
		// var ssnresult = ssnval.format(value)
		//Alert.show(ssnresult);
		if(value && value.length > 8){
			value.replaceAll('-', '')
			const data = value.replace(/\D/g, '').match(/(\d{3})(\d{2})(\d{4})/)
			if(data) {
				this._ssn = data[1]+'-'+data[2]+'-'+data[3]
			} else {
				this._ssn = value
			}
		} 
		else this._ssn = value
		// this._ssn = value
	}
	get ssn() {
		return this._ssn
	}
	set ssn4(value) {
		this._ssn4 = value
	}
	get ssn4() {
		return this._ssn4
	}
	set ssn4Hash(value) {
		this._ssn4Hash = value
	}
	get ssn4Hash() {
		return this._ssn4Hash
	}
	set ssnHash(value) {
		this._ssnHash = value
	}
	get ssnHash() {
		return this._ssnHash
	}
	set startDate(value) {
		this._startDate = value
		if (this._startDate != null)
			this._startDateStr = new Date(this._startDate).toDateString()
	}
	get startDate() {
		return this._startDate
	}
	set statusCode(value) {
		this._statusCode = value
	}
	get statusCode() {
		return this._statusCode
	}
	set title(value) {
		this._title = value
	}
	get title() {
		if (this._title == null) this._title = ''
		return this._title
	}
	set udcid(value) {
		this._udcid = value
	}
	get udcid() {
		return this._udcid
	}
	set updateDate(value) {
		this._updateDate = value
	}
	get updateDate() {
		return this._updateDate
	}
	set updatedBy(value) {
		this._updatedBy = value
	}
	get updatedBy() {
		return this._updatedBy
	}
	set worklistStatus(value) {
		this._worklistStatus = value
	}
	get worklistStatus() {
		return this._worklistStatus
	}
	set worklistGroup(value) {
		this._worklistGroup = value
	}
	get worklistGroup() {
		return this._worklistGroup
	}
	get managerPhone() {
		return this._managerPhone
	}
	set managerPhone(value) {
		this._managerPhone = value
	}
	get managerEmail() {
		return this._managerEmail
	}
	set managerEmail(value) {
		this._managerEmail = value
	}
	get reviewerComments() {
		return this._reviewerComments
	}
	set reviewerComments(value) {
		this._reviewerComments = value
	}
	set errorMessage(value) {
		this._errorMessage = value
	}
	get errorMessage() {
		return this._errorMessage
	}
	set noSSN(value) {
		this._noSSN = value
	}
	get noSSN() {
		return this._noSSN
	}
	get endDateStr() {
		return this._endDateStr
	}
	set endDateStr(value) {
		this._endDateStr = value
	}
	get startDateStr() {
		return this._startDateStr
	}
	set startDateStr(value) {
		this._startDateStr = value
	}
}
