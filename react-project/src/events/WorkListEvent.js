// This was imported from flash.events.Event
// export default class WorkListEvent extends Event {

import BaseEvent from './BaseEvent.ts'

export default class WorkListEvent extends BaseEvent {
	constructor(
		type,
		val = null,
		group = null
	) {
		super(type)
		this._eventObject = val
		this._eventObjectGroup = group;
	}
	get workList() {
		return this._workList
	}
	set workList(value) {
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
WorkListEvent.SAVE_GROUP = 'savegroup';
WorkListEvent.SAVE_SINGLE = 'savesingle';
WorkListEvent.SAVED_SINGLE = 'savedsingle';
WorkListEvent.DELETE_MULTI = 'deletemulti';
WorkListEvent.DELETE_SINGLE = 'deletesingle';
WorkListEvent.DELETED_SINGLE = 'deletedsingle';
WorkListEvent.GET = 'get';
WorkListEvent.GET_WORK_LIST = 'getWorkList';
WorkListEvent.GET_REV_WORK_LIST = 'getRevWorkList';
WorkListEvent.WORK_LIST = 'workList';
WorkListEvent.REV_WORK_LIST = 'revWorkList';
WorkListEvent.WORK_LIST_SAVE = 'workListSave';
WorkListEvent.LOOKUP_LS = 'Lookup';
WorkListEvent.SET_LOOKUP_LS = 'SetLookup';
