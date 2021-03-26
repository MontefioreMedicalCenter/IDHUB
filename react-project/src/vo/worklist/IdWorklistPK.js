import { IdWorklistPKBase } from "./IdWorklistPKBase";

export class IdWorklistPK extends IdWorklistPKBase {
    clone() {
        var pk = new IdWorklistPK();
        pk.worklistId = this.worklistId;
        pk.worklistSeqNum = this.worklistSeqNum;
        return pk;
    }
}