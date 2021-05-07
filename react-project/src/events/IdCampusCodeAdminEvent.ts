
import BaseEvent from "./BaseEvent.ts";
import IdCampusCode from "../vo/admin/IdCampusCode";

export default class IdCampusCodeAdminEvent extends BaseEvent {
	public static DELETE: string = "delete"
	public static EDIT: string = "edit"
	public static SAVE: string = "save"

	private _campusCode: IdCampusCode;

	constructor(type: string, data: Object = null) {
		super(type);
		this._campusCode = <IdCampusCode>data;
	}

	public set CampusCode(value: IdCampusCode) {
		this._campusCode = value;
	}

	public get CampusCode(): IdCampusCode {
		return this._campusCode;
	}
}