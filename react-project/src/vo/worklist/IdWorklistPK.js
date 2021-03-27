import IdWorklistPKBase from "./IdWorklistPKBase";

export default class IdWorklistPK extends IdWorklistPKBase {
    clone() {
        var pk = new IdWorklistPK();
        pk.worklistId = this.worklistId;
        pk.worklistSeqNum = this.worklistSeqNum;
        return pk;
    }
}