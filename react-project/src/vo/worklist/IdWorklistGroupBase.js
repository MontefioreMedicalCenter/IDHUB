import ArrayCollection from "../ArrayCollection";
import VoBase from "../VoBase";

export default class IdWorklistGroupBase extends VoBase {
    constructor( ) {
        super();
        this._workLists = new ArrayCollection();
        this._fileList = new ArrayCollection();  
    }
    set additionalComments(value) {
        this._additionalComments = value;
    }
    get additionalComments() {
        return this._additionalComments;
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
    set requesterUser(value) {
        this._requesterUser = value;
    }
    get requesterUser() {
        return this._requesterUser;
    }
    set requesterUserId(value) {
        this._requesterUserId = value;
    }
    get requesterUserId() {
        return this._requesterUserId;
    }
    set reviewerComments(value) {
        this._reviewerComments = value;
    }
    get reviewerComments() {
        return this._reviewerComments;
    }
    set reviewerUserId(value) {
        this._reviewerUserId = value;
    }
    get reviewerUserId() {
        return this._reviewerUserId;
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
    set worklistId(value) {
        this._worklistId = value;
    }
    get worklistId() {
        return this._worklistId;
    }
    set worklistStatus(value) {
        this._worklistStatus = value;
    }
    get worklistStatus() {
        return this._worklistStatus;
    }
    get workLists() {
        return this._workLists;
    }
    set workLists(value) {
        this._workLists = value;
    }
    set fileList(value) {
        this._fileList = value;
    }
    get fileList() {
        return this._fileList;
    }
    get processedDate() {
        return this._processedDate;
    }
    set processedDate(value) {
        this._processedDate = value;
    }
    get submitDate() {
        return this._submitDate;
    }
    set submitDate(value) {
        this._submitDate = value;
    }
    get acceptDate() {
        return this._acceptDate;
    }
    set acceptDate(value) {
        this._acceptDate = value;
    }
    get updateRequestor() {
        return this._updateRequestor;
    }
    set updateRequestor(value) {
        this._updateRequestor = value;
    }
}