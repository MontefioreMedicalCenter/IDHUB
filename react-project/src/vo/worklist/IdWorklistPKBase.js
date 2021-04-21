import VoBase from '../VoBase'

export default class IdWorklistPKBase extends VoBase {
	set worklistId(value) {
		this._worklistId = value
	}
	get worklistId() {
		return this._worklistId
	}
	set worklistSeqNum(value) {
		this._worklistSeqNum = value
	}
	get worklistSeqNum() {
		return this._worklistSeqNum
	}
}
