import VoBase from "../VoBase";

export default class IdCampusCodeBase extends VoBase {
    set campusCodeId(value) {
        this._campusCodeId = value;
    }
    get campusCodeId() {
        return this._campusCodeId;
    }
    set campusCodeName(value) {
        this._campusCodeName = value;
    }
    get campusCodeName() {
        return this._campusCodeName;
    }
    set createDate(value) {
        this._createDate = value;
    }
    get createDate() {
        return this._createDate;
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
