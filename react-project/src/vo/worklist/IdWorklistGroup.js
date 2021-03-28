import IdWorklistGroupBase from "./IdWorklistGroupBase";

export default class IdWorklistGroup extends IdWorklistGroupBase {
    constructor(
        _edit = false,
        _save = false,
        _errorMessage,
        _requestorFullName,
        _firstName,
        _lastName,
        _gender,
        _affiliateEmailRequest = 'N',
        _mmcEmailRequest = 'N',
        _homeDriveRequest = 'N',
        _epcsHardTokenRequest = 'N',
        _epfRequest = 'N',
        _epicRequest = 'N',
        _employeeSubGroup,
        _campusCode,
        _companyCode,
        _title,
        _department,
        _managerSourceUniqueId,
        _dateOfBirth,
        _startDate,
        _endDate
    ) {
        super();
        this._edit = _edit;
        this._save = _save;
        this._errorMessage = _errorMessage;
        this._requestorFullName = _requestorFullName;
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._gender = _gender;
        this._affiliateEmailRequest = _affiliateEmailRequest;
        this._mmcEmailRequest = _mmcEmailRequest;
        this._homeDriveRequest = _homeDriveRequest;
        this._epcsHardTokenRequest = _epcsHardTokenRequest;
        this._epfRequest = _epfRequest;
        this._epicRequest = _epicRequest;
        this._employeeSubGroup = _employeeSubGroup;
        this._campusCode = _campusCode;
        this._companyCode = _companyCode;
        this._title = _title;
        this._department = _department;
        this._managerSourceUniqueId = _managerSourceUniqueId;
        this._dateOfBirth = _dateOfBirth;
        this._startDate = _startDate;
        this._endDate = _endDate;
    }
    get edit() {
        return this._edit;
    }
    set edit(value) {
        this._edit = value;
    }
    get save() {
        return this._save;
    }
    set save(value) {
        this._save = value;
    }
    get errorMessage() {
        if (this.workLists.length === 1)
            this._errorMessage = (this.workLists.getItemAt(0)).errorMessage
        return this._errorMessage;
    }
    set errorMessage(value) {
        this._errorMessage = value;
    }
    get requestorFullName() {
        if (this.requesterUser != null)
            this._requestorFullName = this.requesterUser.userFullName;
        return this._requestorFullName;
    }
    set requestorFullName(value) {
        this._requestorFullName = value;
    }
    clone() {
        var idWorklistGroup = new IdWorklistGroup();
        idWorklistGroup.additionalComments = this.additionalComments;
        idWorklistGroup.createDate = this.createDate;
        idWorklistGroup.createdBy = this.createdBy;
        idWorklistGroup.requesterUser = this.requesterUser;
        idWorklistGroup.requesterUserId = this.requesterUserId;
        idWorklistGroup.reviewerComments = this.reviewerComments;
        idWorklistGroup.reviewerUserId = this.reviewerUserId;
        idWorklistGroup.updateDate = this.updateDate;
        idWorklistGroup.updatedBy = this.updatedBy;
        idWorklistGroup.workLists = this.workLists;
        idWorklistGroup.worklistId = this.worklistId;
        idWorklistGroup.worklistStatus = this.worklistStatus;
        return idWorklistGroup;
    }
    get firstName() {
        if (this._firstName == null)
            this._firstName = '';
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get epicRequest() {
        if (this._epicRequest == null)
            this._epicRequest = '';
        return this._epicRequest;
    }
    set epicRequest(value) {
        this._epicRequest = value;
    }
    get gender() {
        if (this._gender == null)
            this._gender = '';
        return this._gender;
    }
    set gender(value) {
        this._gender = value;
    }
    get epfRequest() {
        if (this._epfRequest == null)
            this._epfRequest = '';
        return this._epfRequest;
    }
    set epfRequest(value) {
        this._epfRequest = value;
    }
    get epcsHardTokenRequest() {
        if (this._epcsHardTokenRequest == null)
            this._epcsHardTokenRequest = '';
        return this._epcsHardTokenRequest;
    }
    set epcsHardTokenRequest(value) {
        this._epcsHardTokenRequest = value;
    }
    get mmcEmailRequest() {
        if (this._mmcEmailRequest == null)
            this._mmcEmailRequest = '';
        return this._mmcEmailRequest;
    }
    set mmcEmailRequest(value) {
        this._mmcEmailRequest = value;
    }
    get affiliateEmailRequest() {
        if (this._affiliateEmailRequest == null)
            this._affiliateEmailRequest = '';
        return this._affiliateEmailRequest;
    }
    set affiliateEmailRequest(value) {
        this._affiliateEmailRequest = value;
    }
    get homeDriveRequest() {
        if (this._homeDriveRequest == null)
            this._homeDriveRequest = '';
        return this._homeDriveRequest;
    }
    set homeDriveRequest(value) {
        this._homeDriveRequest = value;
    }
    get title() {
        if (this._title == null)
            this._title = '';
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get employeeSubGroup() {
        if (this._employeeSubGroup == null)
            this._employeeSubGroup = '';
        return this._employeeSubGroup;
    }
    set employeeSubGroup(value) {
        this._employeeSubGroup = value;
    }
    get managerSourceUniqueId() {
        if (this._managerSourceUniqueId == null)
            this._managerSourceUniqueId = '';
        return this._managerSourceUniqueId;
    }
    set managerSourceUniqueId(value) {
        this._managerSourceUniqueId = value;
    }
    get department() {
        if (this._department == null)
            this._department = '';
        return this._department;
    }
    set department(value) {
        this._department = value;
    }
    get campusCode() {
        if (this._campusCode == null)
            this._campusCode = '';
        return this._campusCode;
    }
    set campusCode(value) {
        this._campusCode = value;
    }
    get companyCode() {
        if (this._companyCode == null)
            this._companyCode = '';
        return this._companyCode;
    }
    set companyCode(value) {
        this._companyCode = value;
    }
    get lastName() {
        if (this._lastName == null)
            this._lastName = '';
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get dateOfBirth() {
        return this._dateOfBirth;
    }
    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        this._startDate = value;
    }
    get endDate() {
        return this._endDate;
    }
    set endDate(value) {
        this._endDate = value;
    }
}