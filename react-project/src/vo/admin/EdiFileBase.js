import { EdiFileBaseBase } from "./EdiFileBaseBase";

export class EdiFileBase extends EdiFileBaseBase {
    constructor() {
        this._reportOnly = false;
        this._removeCRLF = false;
    }
    get removeCRLF() {
        return this._removeCRLF;
    }
    set removeCRLF(value) {
        this._removeCRLF = value;
    }
    get reportOnly() {
        return this._reportOnly;
    }
    set reportOnly(value) {
        this._reportOnly = value;
    }
}