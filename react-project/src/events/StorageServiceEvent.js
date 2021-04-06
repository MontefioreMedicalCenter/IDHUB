import VoBase from "../vo/VoBase";
import DirectoryListEntry from "../vo/worklist/DirectoryListEntry";

export default class StorageServiceEvent extends VoBase {

    getComplexProperty(key) {
        if (key === "dirList") {
            return new DirectoryListEntry();
        }
        return super.getComplexProperty(key);
    }

    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get dirList() {
        return this._dirList;
    }
    set dirList(value) {
        this._dirList = value;
    }
}