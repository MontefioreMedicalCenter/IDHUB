import { IdCampusCodeBase } from "./IdCampusCodeBase";

export class IdCampusCode extends IdCampusCodeBase {
    constructor() {
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