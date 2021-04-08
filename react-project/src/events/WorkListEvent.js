// This was imported from flash.events.Event
// export default class WorkListEvent extends Event {

import VoBase from '../vo/VoBase'
import { IdWorklist } from '../vo/worklist/IdWorklist'

export default class WorkListEvent extends VoBase {
	constructor(
		SAVE_GROUP = 'savegroup',
		SAVE_SINGLE = 'savesingle',
		SAVED_SINGLE = 'savedsingle',
		DELETE_MULTI = 'deletemulti',
		DELETE_SINGLE = 'deletesingle',
		DELETED_SINGLE = 'deletedsingle',
		GET = 'get',
		GET_WORK_LIST = 'getWorkList',
		GET_REV_WORK_LIST = 'getRevWorkList',
		WORK_LIST = 'workList',
		REV_WORK_LIST = 'revWorkList',
		WORK_LIST_SAVE = 'workListSave',
		LOOKUP_LS = 'Lookup',
		SET_LOOKUP_LS = 'SetLookup',
		_workList,
		_eventObject,
		_eventObjectGroup,
		type,
		val = null,
		group = null
	) {
		super(type)
		this.SAVE_GROUP = SAVE_GROUP
		this.SAVE_SINGLE = SAVE_SINGLE
		this.SAVED_SINGLE = SAVED_SINGLE
		this.DELETE_MULTI = DELETE_MULTI
		this.DELETE_SINGLE = DELETE_SINGLE
		this.DELETED_SINGLE = DELETED_SINGLE
		this.GET = GET
		this.GET_WORK_LIST = GET_WORK_LIST
		this.GET_REV_WORK_LIST = GET_REV_WORK_LIST
		this.WORK_LIST = WORK_LIST
		this.REV_WORK_LIST = REV_WORK_LIST
		this.WORK_LIST_SAVE = WORK_LIST_SAVE
		this.LOOKUP_LS = LOOKUP_LS
		this.SET_LOOKUP_LS = SET_LOOKUP_LS
		this._workList = _workList
		this._eventObject = _eventObject
		this._eventObjectGroup = _eventObjectGroup
		this._eventObject = val
		this._eventObjectGroup = group
	}
	get workList() {
		return this._workList
	}
	set workList(value) {
		if (value != null) {
			for (var worklist in value) {
				// <IdWorklist>worklist
			}
		}
		this._workList = value
	}
	set eventObject(value) {
		this._eventObject = value
	}
	get eventObject() {
		return this._eventObject
	}
	set eventObjectGroup(value) {
		this._eventObjectGroup = value
	}
	get eventObjectGroup() {
		return this._eventObjectGroup
	}
}
