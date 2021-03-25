import VoBase from "../VoBase";
import IdUser from "./IdUser";
import IdUserRoleMapPK from "./IdUserRoleMapPK";

export default class IdUserRoleMapBase extends VoBase {
    //For JSON deserialization
    getComplexProperty(key) {
        if (key === "id") {
            return new IdUserRoleMapPK();
        } else if (key === "mappedUser") {
            return new IdUser();
        }
        return super.getComplexProperty(key);
    }

    set accessActiveFlag(value) {
        this._accessActiveFlag = value;
    }
    get accessActiveFlag() {
        return this._accessActiveFlag;
    }
    set createDate(value) {
        this._createDate = value;
    }
    get createDate() {
        return this._createDate;
    }
    set createdBy(value) {
        this._createdBy = value;
    }
    get createdBy() {
        return this._createdBy;
    }
    set id(value) {
        this._id = value;
    }
    get id() {
        return this._id;
    }
    set mappedUser(value) {
        this._mappedUser = value;
    }
    get mappedUser() {
        return this._mappedUser;
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
}
