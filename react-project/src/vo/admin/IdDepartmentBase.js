import VoBase from '../VoBase'

export default class IdDepartmentBase extends VoBase {
	set createDate(value) {
		this._createDate = value
	}
	get createDate() {
		return this._createDate
	}
	set departmentId(value) {
		this._departmentId = value
	}
	get departmentId() {
		return this._departmentId
	}
	set departmentName(value) {
		this._departmentName = value
	}
	get departmentName() {
		return this._departmentName
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
	set activeFlag(value) {
		this._activeFlag = value
	}
	get activeFlag() {
		return this._activeFlag
	}
}
