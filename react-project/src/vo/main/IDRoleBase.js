import VoBase from '../VoBase'

export default class IDRoleBase extends VoBase {
	set roleId(value) {
		this._id = value
	}
	get roleId() {
		return this._id
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
	set desc(value) {
		this._desc = value
	}
	get desc() {
		return this._desc
	}
}
