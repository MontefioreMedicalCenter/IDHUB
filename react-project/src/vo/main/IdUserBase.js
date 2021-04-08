import ArrayCollection from '../ArrayCollection'
import VoBase from '../VoBase'
import IdUserRoleMap from './IdUserRoleMap'

export default class IdUserBase extends VoBase {
	constructor() {
		super()
		this._roleMap = new ArrayCollection()
	}
	//For JSON deserialization
	getComplexProperty(key) {
		if (key === 'roleMap') {
			return new IdUserRoleMap()
		}
		return super.getComplexProperty(key)
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
	set roleMap(value) {
		this._roleMap = value
	}
	get roleMap() {
		return this._roleMap
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
	set userActiveFlag(value) {
		this._userActiveFlag = value
	}
	get userActiveFlag() {
		return this._userActiveFlag
	}
	set userAddress1(value) {
		this._userAddress1 = value
	}
	get userAddress1() {
		return this._userAddress1
	}
	set userAddress2(value) {
		this._userAddress2 = value
	}
	get userAddress2() {
		return this._userAddress2
	}
	set userCity(value) {
		this._userCity = value
	}
	get userCity() {
		return this._userCity
	}
	set userEmail(value) {
		this._userEmail = value
	}
	get userEmail() {
		return this._userEmail
	}
	set userFirstName(value) {
		this._userFirstName = value
	}
	get userFirstName() {
		return this._userFirstName
	}
	set userId(value) {
		this._userId = value
	}
	get userId() {
		return this._userId
	}
	set userLastName(value) {
		this._userLastName = value
	}
	get userLastName() {
		return this._userLastName
	}
	set userPhone(value) {
		this._userPhone = value
	}
	get userPhone() {
		return this._userPhone
	}
	set userState(value) {
		this._userState = value
	}
	get userState() {
		return this._userState
	}
	set userZip(value) {
		this._userZip = value
	}
	get userZip() {
		return this._userZip
	}
}
