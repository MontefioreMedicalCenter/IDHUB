import BaseEvent from "./BaseEvent.ts";
import IdEmployeeSubgroup from "../vo/admin/IdEmployeeSubgroup";


export default class IdEmployeeSubgroupAdminEvent extends BaseEvent {
	public static DELETE: string = "delete"
	public static EDIT: string = "edit"
	public static SAVE: string = "save"

	private _employeeSubgroup: IdEmployeeSubgroup;

	constructor(type: string, data: Object = null) {
		super(type);
		this._employeeSubgroup = <IdEmployeeSubgroup>data;
	}

	public set EmployeeSubgroup(value: IdEmployeeSubgroup) {
		this._employeeSubgroup = value;
	}

	public get EmployeeSubgroup(): IdEmployeeSubgroup {
		return this._employeeSubgroup;
	}
}
