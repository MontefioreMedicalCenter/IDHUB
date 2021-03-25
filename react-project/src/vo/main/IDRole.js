import IDRoleBase from "./IDRoleBase"
export default class IDRole extends IDRoleBase {
    constructor() {
    }
    get edit() {
        return this._edit;
    }
    set edit(value) {
        this._edit = value;
    }
}
