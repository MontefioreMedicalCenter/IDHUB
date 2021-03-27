import { IdCampusCodeBase } from "./IdCampusCodeBase";

export default class IdCampusCode extends IdCampusCodeBase {
    constructor() {
        super();
        this._edit = false;
        this._save = false;
    }
    get edit() {
        return this._edit;
    }
    set edit(value) {
        this._edit = value;
    }
    get save() {
        return this._save;
    }
    set save(value) {
        this._save = value;
    }
}