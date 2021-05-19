import ExampleUtils from '../../utils/ExampleUtils'
import ArrayCollection from '../ArrayCollection'
import DirectoryListEntry from './DirectoryListEntry'
import IdWorklistBase from './IdWorklistBase'
import IdWorklistPK from './IdWorklistPK'

export default class IdWorklist extends IdWorklistBase {
	constructor(
		_edit = false,
		_save = false,
		_managerPh,
		_managerExt,
		_worklistId,
		_reviewerUserId,
		_requestorFullName,
		_fileList
	) {
		super()
		this.constructorName = "IdWorklist"
		this._edit = _edit
		this._save = _save
		this._managerPh = _managerPh
		this._managerExt = _managerExt
		this._worklistId = _worklistId
		this._reviewerUserId = _reviewerUserId
		this._requestorFullName = _requestorFullName
		this._fileList = _fileList || new ArrayCollection()
	}

	getComplexProperty(key) {
		if (key === 'fileList') {
			return new DirectoryListEntry()
		}
		return super.getComplexProperty(key)
	}
	get edit() {
		return this._edit
	}
	set edit(value) {
		this._edit = value
	}
	get save() {
		return this._save
	}
	set save(value) {
		this._save = value
	}
	clone() {
		var idWorklist = new IdWorklist()
		idWorklist.id = this.id == null ? new IdWorklistPK() : this.id.clone()
		idWorklist.IPPhone = this.IPPhone
		idWorklist.additionalComments = this.additionalComments
		idWorklist.affiliateEmailRequest = this.affiliateEmailRequest
		idWorklist.assignedMonteId = this.assignedMonteId
		idWorklist.campusCode = this.campusCode
		idWorklist.companyCode = this.companyCode
		idWorklist.createDate = this.createDate
		idWorklist.createdBy = this.createdBy
		idWorklist.dateOfBirth = this.dateOfBirth
		idWorklist.department = this.department
		idWorklist.division = this.division
		idWorklist.documentCount = this.documentCount
		idWorklist.employeeGroup = this.employeeGroup
		idWorklist.employeeSubGroup = this.employeeSubGroup
		idWorklist.endDate = this.endDate
		idWorklist.epcsHardTokenRequest = this.epcsHardTokenRequest
		idWorklist.epfRequest = this.epfRequest
		idWorklist.epicRequest = this.epicRequest
		idWorklist.errorMessage = this.errorMessage
		idWorklist.firstName = this.firstName
		idWorklist.firstNameCleaned = this.firstNameCleaned
		idWorklist.gender = this.gender
		idWorklist.homeDriveRequest = this.homeDriveRequest
		idWorklist.lastName = this.lastName
		idWorklist.lastNameCleaned = this.lastNameCleaned
		idWorklist.loaReturnDate = this.loaReturnDate
		idWorklist.loaStartDate = this.loaStartDate
		idWorklist.managerSourceUniqueId = this.managerSourceUniqueId
		idWorklist.middleNameOrInitial = this.middleNameOrInitial
		idWorklist.mmcEmailRequest = this.mmcEmailRequest
		idWorklist.nameSuffix = this.nameSuffix
		idWorklist.nonMonteEmail = this.nonMonteEmail
		idWorklist.officeAddress = this.officeAddress
		idWorklist.officeCity = this.officeCity
		idWorklist.officePhone = this.officePhone
		idWorklist.officeState = this.officeState
		idWorklist.officeZipCode = this.officeZipCode
		idWorklist.preHireFlag = this.preHireFlag
		idWorklist.preferredName = this.preferredName
		idWorklist.sourceSystem = this.sourceSystem
		idWorklist.sourceUniqueId = this.sourceUniqueId
		idWorklist.ssn = this.ssn
		idWorklist.ssn4 = this.ssn4
		idWorklist.ssn4Hash = this.ssn4Hash
		idWorklist.ssnHash = this.ssnHash
		idWorklist.startDate = this.startDate
		idWorklist.statusCode = this.statusCode
		idWorklist.title = this.title
		idWorklist.udcid = this.udcid
		idWorklist.updateDate = this.updateDate
		idWorklist.updatedBy = this.updatedBy
		idWorklist.worklistStatus = this.worklistStatus
		idWorklist.worklistGroup = this.worklistGroup.clone()
		idWorklist.managerPhone = this.managerPhone
		idWorklist.managerEmail = this.managerEmail
		idWorklist.reviewerComments = this.reviewerComments
		idWorklist.noSSN = this.noSSN
		return idWorklist
	}
	get managerPh() {
		if (this.managerPhone != null) {
			this._managerPh = this.managerPhone.substring(0, 12)
		}
		return this._managerPh
	}
	set managerPh(value) {
		var addExt = false
		var phval = ExampleUtils.phoneFormatter1
		var phresult = phval.format(value)
		if (phresult.length > 0) {
			this._managerPh = phval.format(value)
		} else {
			this._managerPh = value
		}
		if (this.managerExt === null || this.managerExt === '') {
			addExt = false
		} else addExt = true
		if (addExt) {
			this.managerPhone = this._managerPh + ' Ext ' + this._managerExt
		} else {
			this.managerPhone = this._managerPh.substring(0, 12)
		}
	}
	get managerExt() {
		if (this.managerPhone != null) {
			this._managerExt = this.managerPhone.substring(17, 25)
		}
		return this._managerExt
	}
	set managerExt(value) {
		var addExt = false
		this._managerExt = value
		if (value == null || value === '') {
			addExt = false
		} else addExt = true
		if (addExt) {
			this.managerPhone = this._managerPh + ' Ext ' + value
		} else {
			this.managerPhone = this._managerPh.substring(0, 12)
		}
	}
	set worklistId(value) {
		this._worklistId = value
	}
	get worklistId() {
		this._worklistId = this.worklistGroup.worklistId
		return this._worklistId
	}
	set reviewerUserId(value) {
		this._reviewerUserId = value
	}
	get reviewerUserId() {
		this._reviewerUserId = this.worklistGroup.reviewerUserId
		return this._reviewerUserId
	}
	set fileList(value) {
		this._fileList = value
	}
	get fileList() {
		if (this.worklistGroup && this.worklistGroup.workLists.length < 2)
			this._fileList = this.worklistGroup.fileList
		return this._fileList
	}
	get requestorFullName() {
		this._requestorFullName = this.worklistGroup.requestorFullName
		return this._requestorFullName
	}
	set requestorFullName(value) {
		this._requestorFullName = value
	}
	get uniqueIdentifier(){
		if(this.id && this.id.worklistSeqNum) {
			return this.worklistId + ":" + this.id.worklistSeqNum;
		}
		return this.worklistId + ":" + 0;
	}
}
