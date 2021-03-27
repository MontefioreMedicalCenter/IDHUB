import VoBase from "../VoBase";

export default class IdEmployeeSubgroupBase extends VoBase {
    set createDate(value) {
        this._createDate = value;
    }
    get createDate() {
        return this._createDate;
    }
    set employeeSubGroupId(value) {
        this._employeeSubGroupId = value;
    }
    get employeeSubGroupId() {
        return this._employeeSubGroupId;
    }
    set employeeSubGroupName(value) {
        this._employeeSubGroupName = value;
    }
    get employeeSubGroupName() {
        return this._employeeSubGroupName;
    }
    set updateDate(value) {
        this._updateDate = value;
    }
    get updateDate() {
        return this._updateDate;
    }
    set updatedBy(value) {
        this._updatedBy = value;
    }
    get updatedBy() {
        return this._updatedBy;
    }
    set activeFlag(value) {
        this._activeFlag = value;
    }
    get activeFlag() {
        return this._activeFlag;
    }
}