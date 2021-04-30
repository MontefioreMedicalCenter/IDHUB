import ArrayCollection from "../vo/ArrayCollection";
import BaseEvent from "./BaseEvent.ts";

export default class AdminEvent extends BaseEvent {

    public static GET_USERS: string = "getUsers";
    public static POP_USERS: string = "popUsers";

    public static GET_DEPT: string = "getdept";
    public static POP_DEPT: string = "popdept";
    public static SAVE_DEPT: string = "savedept";
    public static DELETE_DEPT: string = "deletedept";

    public static GET_CAMPUSCODE: string = "getcampuscode";
    public static POP_CAMPUSCODE: string = "popcampuscode";
    public static SAVE_CAMPUSCODE: string = "savecampuscode";
    public static DELETE_CAMPUSCODE: string = "deletecampuscode";

    public static GET_EMPSUBGROUP: string = "getempsubgroup";
    public static POP_EMPSUBGROUP: string = "popempsubgroup";
    public static SAVE_EMPSUBGROUP: string = "saveempsubgroup";
    public static DELETE_EMPSUBGROUP: string = "deleteempsubgroup";

    public static ADMIN_STR: string = "adminstr";
    public static ROLE_USR: string = "roleusr";

    public static GET_ALL_ROLES: string = "getAllRoles";
    public static POP_ROLES: string = "populateRoles";
    public static REFRESH_LKUP: string = "refreshlkup";
    public static EVENT_NO: string = "NON";

    public static GET_TITLE: string = "gettitle";
    public static POP_TITLE: string = "poptitle";

    /** Department Events**/

    constructor(type: string, startDate: Date = null, endDate: Date = null, error: string = null) {
        super(type);
        this._startDate = startDate;
        this._endDate = endDate;
        this._error = error;
    }

    private _error: string;
    private _startDate: Date;
    private _endDate: Date;
    private _userData: ArrayCollection
    private _roleData: ArrayCollection
    private _departmentsData: ArrayCollection
    private _campuscodeData: ArrayCollection
    private _employeeSubgroupData: ArrayCollection
    private _titleData: ArrayCollection

    public get errMsg(): string {
        return this._error;
    }

    public get startDate(): Date {
        return this._startDate;
    }

    public get endDate(): Date {
        return this._endDate;
    }

    public clone(): AdminEvent {
        return new AdminEvent(this.type, this._startDate, this._endDate);
    }

    public get userData(): ArrayCollection {
        return this._userData;
    }

    public set userData(value: ArrayCollection) {
        this._userData = value;
    }

    public get roleData(): ArrayCollection {
        return this._roleData;
    }
    public set roleData(value: ArrayCollection) {
        this._roleData = value;
    }

    public get departmentsData(): ArrayCollection {
        return this._departmentsData;
    }
    public set departmentsData(value: ArrayCollection) {
        this._departmentsData = value;
    }

    public get campuscodeData(): ArrayCollection {
        return this._campuscodeData;
    }
    public set campuscodeData(value: ArrayCollection) {
        this._campuscodeData = value;
    }

    public get employeeSubgroupData(): ArrayCollection {
        return this._employeeSubgroupData;
    }
    public set employeeSubgroupData(value: ArrayCollection) {
        this._employeeSubgroupData = value;
    }
    public get titleData(): ArrayCollection {
        return this._titleData;
    }
    public set titleData(value: ArrayCollection) {
        this._titleData = value;
    }

}
