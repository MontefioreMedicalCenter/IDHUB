import BaseEvent from "./BaseEvent.ts";
import IdDepartment from "../vo/admin/IdDepartment";

export default class IdDepartmentAdminEvent extends BaseEvent {
	public static DELETE: string = "delete"
	public static EDIT: string = "edit"
	public static SAVE: string = "save"

	private _department: IdDepartment;

	constructor(type: string, data: Object = null) {
		super(type);
		this._department = <IdDepartment>data;
	}

	public set Department(value: IdDepartment) {
		this._department = value;
	}

	public get Department(): IdDepartment {
		return this._department;
	}
}
