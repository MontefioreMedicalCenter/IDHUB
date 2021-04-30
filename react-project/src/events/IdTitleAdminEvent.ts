import BaseEvent from "./BaseEvent.ts";import IdTitle from "../vo/admin/IdTitle";


export default class IdTitleAdminEvent extends Event {
	public static DELETE: string = "delete"
	public static EDIT: string = "edit"
	public static SAVE: string = "save"

	private _title: IdTitle;

	constructor(type: string, data: Object = null) {
		super(type);
		this._title = <IdTitle>data;
	}

	public set title(value: IdTitle) {
		this._title = value;
	}

	public get title(): IdTitle {
		return this._title;
	}
}
