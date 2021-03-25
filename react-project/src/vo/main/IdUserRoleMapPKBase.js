import VoBase from "../VoBase";

export default class IdUserRoleMapPKBase extends VoBase {
    set roleId(value) {
        this._roleId = value;
    }
    get roleId() {
        return this._roleId;
    }
    set userId(value) {
        this._userId = value;
    }
    get userId() {
        return this._userId;
    }
}
