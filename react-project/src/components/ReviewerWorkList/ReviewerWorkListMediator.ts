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


export default class ReviewerWorkListMediator {
    /*[Inject]*/
    public grid: DataGrid;
    /*[Inject]*/
    public loginModel: LoginModel;
    /*[Inject]*/
    public wlservice: WorklistService = WorklistService.getInstance();
    /*[Inject]*/
    public bservice: BoxService = BoxService.getInstance();

    private _workList: ArrayCollection
    private _selectedGroup: IdWorklistGroup;
    private _selectedRequest: IdWorklist;
    private selectedItem: Object
    private isWorklistGroup: boolean;
    private isWorklist: boolean
    private isWorklistChild: boolean
    private _index: number

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

    public get index(): number {
        return this._index;
    }

    public set index(value: number) {
        this._index = value;
    }
    //private log:ILogger=this.Log.getLogger("ReviewerWorkListMediator"); 

    /*override*/ public onRegister(grid:DataGrid): ReviewerWorkListMediator {
        this.grid = grid;
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK,this.iconClick);
        this.grid.addEventListener(this, FlexDataGridEvent.ITEM_CLICK,this.itemClick);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.REV_WORK_LIST, this.setWorkList);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.GET_REV_WORK_LIST, this.findWorklists);
        GlobalEventDispatcher.instance().addEventListener(this, WorkListEvent.SAVED_SINGLE, this.updateWorkList);
        this.findWorklists(null);
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
                workGroup.fromJson(camelizeKeys(data))
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
        this.grid.expandAll()
    }

    private updateWorkList(event: WorkListEvent): void {
        var vpos: number = this.grid.getVerticalScrollPosition();
        var gridDP: ArrayCollection = <ArrayCollection>this.grid.getDataProvider();
        if (this.index > 0) {
            gridDP.removeItemAt(this.index)
        }
        var nitem: Object = null
        if (this.isWorklist) {
            gridDP.addItemAt((<IdWorklistGroup>event.eventObject).workLists.getItemAt(0), this.index);
            nitem = (<IdWorklistGroup>event.eventObject).workLists.getItemAt(0)
        }
        else {
            gridDP.addItemAt(<IdWorklistGroup>event.eventObject, this.index);
            nitem = event.eventObject
        }
        this.grid.expandAll()
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
        this.index = -1
        var level: number = event.cell.nestDepth
        this.selectedRequest = <IdWorklist>event.item
        this.selectedGroup = <IdWorklistGroup>event.item
        this.selectedItem = event.cell.rowInfo.getData()
        this.isWorklistGroup = this.selectedGroup != null
        this.isWorklist = this.selectedRequest != null && level == 1
        this.isWorklistChild = this.selectedRequest != null && level == 2
        var alertMsg: string = ''
        var msg: string = this.isWorklistGroup ? 'Group:' : 'Request:'
        if (this.isWorklist || this.isWorklistChild)
            this.selectedGroup = this.selectedItem.worklistGroup
        var gridDP: ArrayCollection = <ArrayCollection>this.grid.getDataProvider();
        this.index = gridDP.getItemIndex(this.selectedItem)
        if (this.index == -1)
            this.index = gridDP.getItemIndex(this.selectedGroup)
        this.selectedGroup.updateRequestor = false
        if (event.cell instanceof FlexDataGridDataCell && event.cell.column != null) {
            if (event.cell.column.headerText == 'View Docs') {
                alert("Add DocumentLibrary based on code below")
                // var worklistDocument:DocumentLibrary=new DocumentLibrary()
                // worklistDocument.height=this.contextView.height - 200;
                // worklistDocument.width=this.contextView.width - 100;
                // PopUpManager.addPopUp(worklistDocument, this.contextView, true);
                // PopUpManager.centerPopUp(worklistDocument);
                // worklistDocument.title='Request Documents'
                // worklistDocument.showDelete=false
                // worklistDocument.uploadHbx.visible=false
                // this.mediatorMap.createMediator(worklistDocument);
                // worklistDocument.grid.dataProvider=this.selectedItem.fileList
                // worklistDocument.workList=this.selectedItem
            }
            else if (event.cell.column.headerText == "Under Review") {
                alert("implement code below")
                // alertMsg=this.selectedGroup.worklistStatus != "UnderReview" ? "Are you sure you want to mark Request:" + this.selectedGroup.worklistId + " Under Review?" : "Are you sure you want to Cancel Review for Request:" + this.selectedGroup.worklistId + "?"
                // Alert.show(alertMsg, "Confirm", Alert.OK | Alert.CANCEL, null, function(event:CloseEvent):void
                // {
                //     if (event.detail == Alert.OK)
                //     {
                //         var worklistGroup:IdWorklistGroup=this.selectedGroup
                //         worklistGroup.worklistStatus=this.selectedItem.worklistStatus == "UnderReview" ? "Submitted" : "UnderReview"
                //         worklistGroup.reviewerUserId=worklistGroup.worklistStatus == "UnderReview" ?  this.loginModel.user.userId : null
                //         if (this.isWorklist)
                //         {
                //             this.selectedRequest.worklistStatus=worklistGroup.worklistStatus
                //         }
                //         this.wlservice.saveWorkGroup(worklistGroup)
                //     }
                // })
            }
            else if (event.cell.column.headerText == "Reject") {
                if (this.selectedItem != null && this.selectedItem.worklistStatus != "Rejected" && (this.selectedItem.reviewerComments == null || this.selectedItem.reviewerComments.length < 1)) {
                    alert("Please fill in a Reject Reason before Rejecting"/* , "Reject Reason" */)
                    return;
                }
                alert("implement code below")
                // alertMsg=this.selectedItem.worklistStatus != "Rejected" ? "Are you sure you want to Reject " + msg + this.selectedGroup.worklistId + "?" : "Are you sure you want to cancel Rejection of " + msg + this.selectedGroup.worklistId + "?"
                // Alert.show(alertMsg, "Confirm", Alert.OK | Alert.CANCEL, null, function(event:CloseEvent):void
                // {
                //     if (event.detail == Alert.OK)
                //     {
                //         if (!this.isWorklistChild)
                //         {
                //             var worklistGroup:IdWorklistGroup=this.selectedGroup
                //             worklistGroup.worklistStatus=worklistGroup.worklistStatus != "Rejected" ? "Rejected" : "Submitted"
                //             if (this.isWorklist)
                //             {
                //                 this.selectedRequest.worklistStatus=worklistGroup.worklistStatus
                //                 worklistGroup.reviewerComments=this.selectedRequest.reviewerComments
                //             }
                //             this.wlservice.saveWorkGroup(worklistGroup)
                //             this.wlservice.sendRejectMailToRequestor(<IdWorklistGroup>worklistGroup )
                //             gridDP.setItemAt(worklistGroup,this.index)

                //         }
                //         else if (this.isWorklistChild)
                //         {
                //             this.selectedItem.worklistStatus=this.selectedItem.worklistStatus != "Rejected" ? "Rejected" : "Submitted"
                //             this.wlservice.saveWorkListSingle(this.selectedItem)
                //             //CursorManager.removeBusyCursor()
                //             gridDP.setItemAt(this.selectedItem,this.index)

                //         }

                //     }
                // })
            }
            else if (event.cell.column.headerText == "Accept") {
                alert("implement code below")

                // Alert.show("Are you sure you want to Accept this " + msg + this.selectedGroup.worklistId + "?", "Confirm Accept", Alert.OK | Alert.CANCEL, null, function(event:CloseEvent):void
                // {
                //     if (event.detail == Alert.OK)
                //     {
                //         var worklistGroup:IdWorklistGroup=this.selectedGroup
                //         worklistGroup.worklistStatus="Accepted"
                //         worklistGroup.acceptDate= new Date()

                //         worklistGroup.reviewerUserId=this.loginModel.user.userId
                //         for  (var x:IdWorklist of worklistGroup.workLists)
                //         {
                //             x.worklistStatus="Accepted"
                //         }
                //         if (worklistGroup.fileList != null && worklistGroup.fileList.length > 0)
                //             this.bservice.sendDocumentsToBox(worklistGroup.worklistId) 
                //         this.wlservice.saveWorkGroup(worklistGroup)
                //         this.wlservice.sendAcceptMailToHelpDesk(this.selectedGroup)
                //         gridDP.setItemAt(worklistGroup,this.index)
                //     }
                // })
            }
        }
    }

    private itemClick(event: FlexDataGridEvent): void {
        if (event.cell instanceof FlexDataGridDataCell
            && event.cell.column != null
            && (event.cell.column.headerText == 'Email')) {
            alert("Implement code below")
            // var mailMsg:URLRequest=new URLRequest('mailto:' + event.cell.rowInfo.getData().worklistGroup.requesterUser.userEmail);
            // var variables:URLVariables=new URLVariables();
            // mailMsg.contentType='text/plain; charset=utf-8'
            // mailMsg.data=variables;
            // mailMsg.method=URLRequestMethod.GET;
            // this.flash.net.navigateToURL(mailMsg, "_self");
        }
    }

}



