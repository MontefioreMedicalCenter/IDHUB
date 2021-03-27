import VoBase from "../VoBase";

export default class IdTitleBase extends VoBase {
    set createDate(value) {
        this._createDate = value;
    }
    get createDate() {
        return this._createDate;
    }
    set titleId(value) {
        this._titleId = value;
    }
    get titleId() {
        return this._titleId;
    }
    set titleName(value) {
        this._titleName = value;
    }
    get titleName() {
        return this._titleName;
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