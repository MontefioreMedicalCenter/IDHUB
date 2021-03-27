import ArrayCollection from "../ArrayCollection";
import VoBase from "../VoBase";
import IdWorklist from "./IdWorklist";

export default class WorkListModel extends VoBase {
    constructor(userId = null, password = null) {
        super();
        this._lookupLists = new ArrayCollection();
    }
    get lookupLists() {
        return this._lookupLists;
    }
    set lookupLists(value) {
        this._lookupLists = value;
    }

    getComplexProperty(key){
        if(key === "lookupLists"){
            return new IdWorklist();
        }
        return super.getComplexProperty(key);
    }
}