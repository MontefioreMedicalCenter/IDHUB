import BaseEvent from "./BaseEvent.ts";
export default class ManageUserEvent extends BaseEvent {
	public static USER_START: string = "getUsersStr";
	public static ROLE_USR: string = "roleUsr";
	public static USERS_AND_ROLES: string = "userroles";
	public static GET_USERS_AND_ROLES_ST: string = "geturstr";
	public static SET_ROLE_DONE: string = "roleDoneUsr";
	public static ADD_USER: string = "addusr";
	public static SAVE_USER: string = "saveusr";
	public static SV_USR_END: string = "saveusrend";
	public static USR_FSA_REF: string = "usrfsaref";
	public static USR_ROLE_REF: string = "usrrlreg";
	public static RMV_USR_FSA_ED: string = "rmfsed";
	public static USR_FSA_REF_FIN: string = "usrfsareffin"
	public static RMV_USR_ROLE_ED: string = "rmvured";
	public static RMV_USR_FSA_NON: string = "rmvufnon";
	public static RMV_USR_ROLE_NON: string = "rmvurnon";
	public static DELETE_USER_FIN: string = "delusrfin";
	public static CLR_USR: string = "clrusr";
	public static RFSH_DISP: string = "refshdisp";
	public static DELETE_USER: string = "remusr";
	private _data: Object;

	private _error: string;
	private _activate: boolean;
	//private var _errorLogs:ArrayCollection;

	constructor(type: string, val: Object = null) {
		super(type);
		this._data = val;
	}

	public get data(): Object {
		return this._data;
	}
	public set data(val: Object) {
		this._data = val;
	}
}
