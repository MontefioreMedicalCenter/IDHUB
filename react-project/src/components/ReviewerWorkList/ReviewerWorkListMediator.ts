import WorklistService from "../../service/cfc/WorklistService";
import BoxService from "../../service/cfc/BoxService";
import LoginModel from "../../vo/main/LoginModel";
import ArrayCollection from "../../vo/ArrayCollection";
import IdWorklistGroup from "../../vo/worklist/IdWorklistGroup";
import IdWorklist from "../../vo/worklist/IdWorklist";
import WorkListEvent from "../../events/WorkListEvent"

import {
    FlexDataGridEvent,
    FlexDataGridDataCell
} from '../../flexicious'
import DataGrid from "../../shared/components/ExtendedDataGrid";
import MontefioreUtils from "../../service/utils/MontefioreUtils";
import { camelizeKeys } from "../../shared/utils";
import GlobalEventDispatcher from "../../service/utils/GlobalEventDispatcher";
import { reviewerWorklistData, storeWorklist } from "../../AppConfig/store/actions/reviewerWorklistAction";
import store from '../../AppConfig/store/configureStore'
import { setDocumentLibrary } from "../../AppConfig/store/actions/workListSheet";
import { showDelete, showUpload } from "../../AppConfig/store/actions/documentLibrary";


export default class ReviewerWorkListMediator {
    /*[Inject]*/
    public grid: any;
    /*[Inject]*/
    public loginModel: LoginModel;
    /*[Inject]*/
    public wlservice: WorklistService = WorklistService.getInstance();
    /*[Inject]*/
    public bservice: BoxService = BoxService.getInstance();

    private _workList: ArrayCollection
    private _selectedGroup: IdWorklistGroup;
    private _selectedRequest: IdWorklist;
    private selectedItem: any;
    private isWorklistGroup: boolean;
    private isWorklist: boolean
    private isWorklistChild: boolean
    private _idx: number

    public get workList(): ArrayCollection {
        return this._workList;
    }

    public set workList(value: ArrayCollection) {
        this._workList = value;
    }

    public get selectedRequest(): IdWorklist {
        return this._selectedRequest;
    }

    public set selectedRequest(value: IdWorklist) {
        this._selectedRequest = value;
    }

    public get selectedGroup(): IdWorklistGroup {
        return this._selectedGroup;
    }

    public set selectedGroup(value: IdWorklistGroup) {
        this._selectedGroup = value;
    }

    public get idx(): number {
        return this._idx;
    }

    public set idx(value: number) {
        this._idx = value;
    }
    //private log:ILogger=this.Log.getLogger("ReviewerWorkListMediator"); 

    /*override*/ public onRegister(grid:DataGrid, loginModel:LoginModel): ReviewerWorkListMediator {
        this.grid = grid;
        this.loginModel = loginModel;
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK,this.iconClick);
        this.grid.addEventListener(this, FlexDataGridEvent.ITEM_CLICK,this.itemClick);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.REV_WORK_LIST, this.setWorkList);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.GET_REV_WORK_LIST, this.findWorklists);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.SAVED_SINGLE, this.updateWorkList);
        Object.keys(loginModel).length && this.findWorklists(null);
        return this;
    }
    public onUnRegister():void{

        GlobalEventDispatcher.instance().removeEventListener( WorkListEvent.REV_WORK_LIST, this.setWorkList);
        GlobalEventDispatcher.instance().removeEventListener( WorkListEvent.GET_REV_WORK_LIST, this.findWorklists);
        GlobalEventDispatcher.instance().removeEventListener( WorkListEvent.SAVED_SINGLE, this.updateWorkList);
    }

    private findWorklists(event: WorkListEvent): void {
        this.wlservice.findRevWorklists((resp) => {
            var list = new ArrayCollection()
            resp.result.forEach(data => {
                let workGroup = new IdWorklistGroup()
                workGroup.fromJson(data)
                workGroup.workLists.forEach(wl => (wl.worklistGroup = workGroup))
                list.addItem(workGroup)
            })
            var resultEvent:WorkListEvent = new WorkListEvent(WorkListEvent.REV_WORK_LIST);
            resultEvent.workList = list;
            this.setWorkList(resultEvent);
        }, MontefioreUtils.showError)
    }

    private setWorkList(event: WorkListEvent): void {
        var workListGroupArr: ArrayCollection = new ArrayCollection()
        var workListArr: ArrayCollection = new ArrayCollection()
        for (var workGroup of event.workList) {
            if (workGroup.workLists != null && workGroup.workLists.length == 1)
                workListArr.addAll(workGroup.workLists);
            else
                workListGroupArr.addItem(workGroup)
        }
        workListGroupArr.addAll(workListArr)
        this.grid.setDataProvider(workListGroupArr);
        this.grid.getColumnLevel().filterFunction = this.filterDeviceTypes;
        this.grid.getColumnLevel().nextLevel.filterFunction = this.filterDeviceTypesChild;
        this.grid.processFilter()
        //this.grid.expandAll()
    }

    private updateWorkList(event: any): void {
        var vpos: number = this.grid.getVerticalScrollPosition();
        var gridDP: ArrayCollection = <ArrayCollection>this.grid.getDataProvider();
        if (this.idx > 0) {
            gridDP.removeItemAt(this.idx)
        }
        var nitem: Object = null
        if (this.isWorklist) {
            gridDP.addItemAt((<IdWorklistGroup>event.eventObject).workLists.getItemAt(0), this.idx);
            nitem = (<IdWorklistGroup>event.eventObject).workLists.getItemAt(0)
        }
        else {
            gridDP.addItemAt(<IdWorklistGroup>event.eventObject, this.idx);
            nitem = event.eventObject
        }
        this.grid.refreshCells();
        this.grid.rebuildBody()
        this.grid.validateNow()
        this.grid.gotoVerticalPosition(vpos)
    }

    public filterDeviceTypes(item: any): boolean {
        if (item != null && (item.worklistStatus == 'Submitted' || item.worklistStatus == 'UnderReview')) {
            return true;
        }
        else
            return false;
    }

    public filterDeviceTypesChild(item: any): boolean {
        if (item != null && (item.worklistStatus == 'Submitted' || item.worklistStatus == 'UnderReview' || item.worklistStatus == 'Rejected')) {
            return true;
        }
        else
            return false;
    }

    private iconClick(event: FlexDataGridEvent): void {
        this.idx = -1
        var level: number = event.cell.getNestDepth();
        this.selectedRequest = event.item instanceof IdWorklist? event.item : null
        this.selectedGroup = event.item instanceof IdWorklistGroup? event.item : null
        
        this.selectedItem = event.cell.rowInfo.getData()
        this.isWorklistGroup = this.selectedGroup != null
        this.isWorklist = this.selectedRequest != null && level == 1
        this.isWorklistChild = this.selectedRequest != null && level == 2
        var alertMsg: string = ''
        var msg: string = this.isWorklistGroup ? 'Group:' : 'Request:'
        if (this.isWorklist || this.isWorklistChild)
            this.selectedGroup = this.selectedItem.worklistGroup
        var gridDP: ArrayCollection = this.grid.getDataProvider();
        this.idx = gridDP.getItemIndex(this.selectedItem)
        if (this.idx == -1)
            this.idx = gridDP.getItemIndex(this.selectedGroup)
        this.selectedGroup.updateRequestor = false
        if (event.cell instanceof FlexDataGridDataCell && event.cell.getColumn() != null) {
            if (event.cell.getColumn().getHeaderText() == 'View Docs') {
                store.dispatch(reviewerWorklistData(true))
                store.dispatch(showDelete(false))
                store.dispatch(showUpload(false))
                store.dispatch(setDocumentLibrary(this.selectedItem.fileList))
                store.dispatch(storeWorklist(this.selectedItem))
            }
            else if (event.cell.getColumn().getHeaderText() == "Under Review") {
                alertMsg=this.selectedGroup.worklistStatus != "UnderReview" ? "Are you sure you want to mark Request:" + this.selectedGroup.worklistId + " Under Review?" : "Are you sure you want to Cancel Review for Request:" + this.selectedGroup.worklistId + "?"
                if(confirm(alertMsg)){
                    var worklistGroup:IdWorklistGroup=this.selectedGroup
                    worklistGroup.worklistStatus=this.selectedItem.worklistStatus == "UnderReview" ? "Submitted" : "UnderReview"
                    worklistGroup.reviewerUserId=worklistGroup.worklistStatus == "UnderReview" ?  this.loginModel.user.userId : null
                    if (this.isWorklist)
                    {
                        this.selectedRequest.worklistStatus=worklistGroup.worklistStatus
                    }
                    this.wlservice.saveWorkGroup(worklistGroup)
                }

            }
            else if (event.cell.getColumn().getHeaderText() == "Reject") {
                if (this.selectedItem != null && this.selectedItem.worklistStatus != "Rejected" && (this.selectedItem.reviewerComments == null || this.selectedItem.reviewerComments.length < 1)) {
                    alert("Please fill in a Reject Reason before Rejecting"/* , "Reject Reason" */)
                    return;
                }
                alertMsg=this.selectedItem.worklistStatus != "Rejected" ? "Are you sure you want to Reject " + msg + this.selectedGroup.worklistId + "?" : "Are you sure you want to cancel Rejection of " + msg + this.selectedGroup.worklistId + "?"
                if (window.confirm(alertMsg))
                {
                    if (!this.isWorklistChild)
                        {
                            var worklistGroup:IdWorklistGroup=this.selectedGroup
                            worklistGroup.worklistStatus=worklistGroup.worklistStatus != "Rejected" ? "Rejected" : "Submitted"
                            if (this.isWorklist)
                            {
                                this.selectedRequest.worklistStatus=worklistGroup.worklistStatus
                                worklistGroup.reviewerComments=this.selectedRequest.reviewerComments
                            }
                            this.wlservice.saveWorkGroup(worklistGroup)
                            this.wlservice.sendRejectMailToRequestor(<IdWorklistGroup>worklistGroup )
                            gridDP.setItemAt(worklistGroup,this.idx)

                        }
                        else if (this.isWorklistChild)
                        {
                            this.selectedItem.worklistStatus=this.selectedItem.worklistStatus != "Rejected" ? "Rejected" : "Submitted"
                            this.wlservice.saveWorklist(this.selectedItem);
                            //CursorManager.removeBusyCursor()
                            gridDP.setItemAt(this.selectedItem,this.idx)

                        }
                }
            }
            else if (event.cell.getColumn().getHeaderText() == "Accept") {

                if (window.confirm("Are you sure you want to Accept this " + msg + this.selectedGroup.worklistId + "?")) 
                {
                    var worklistGroup:IdWorklistGroup=this.selectedGroup
                    worklistGroup.worklistStatus="Accepted"
                    worklistGroup.acceptDate= new Date()

                    worklistGroup.reviewerUserId=this.loginModel.user.userId
                    for  (var x of worklistGroup.workLists)
                    {
                        x.worklistStatus="Accepted"
                    }
                    if (worklistGroup.fileList != null && worklistGroup.fileList.length > 0)
                        this.bservice.sendDocumentsToBox(worklistGroup.worklistId) 
                    this.wlservice.saveWorkGroup((worklistGroup))
                    this.wlservice.sendAcceptMailToHelpDesk(this.selectedGroup)
                    gridDP.setItemAt(worklistGroup,this.idx)
                }
            }
        }
    }

    private itemClick(event: FlexDataGridEvent): void {
        if (event.cell instanceof FlexDataGridDataCell
            && event.cell.getColumn() != null
            && (event.cell.getColumn().getHeaderText() == 'Email')) {
            window.location.href = 'mailto:' + event.cell.rowInfo.getData().worklistGroup.requesterUser.userEmail;

        }
    }

}



