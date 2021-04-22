import React, { useEffect } from 'react';
import './reviewWork.style.scss';
import ExampleUtils from '../../utils/ExampleUtils'
import DataGrid from '../../shared/components/ExtendedDataGrid'
import {
    ReactDataGridColumn,
    ReactDataGridColumnGroup,
    ReactDataGridColumnLevel,
    ToolbarAction,
    DateRange
} from '../../flexicious'
import ReviewerWorkListMediator from './ReviewerWorkListMediator.ts';
let grid;
const vbox1_creationCompleteHandler = (event) => {
    grid.toolbarActions.addItem(new ToolbarAction("Refresh", 1, "", "Refresh Worklist", "org/monte/edi/idhub/assets/img/refresh.png", false, true));
    grid.rebuildPager()
}

const onExecuteToolbarAction = (action, currentTarget, extendedPager) => {
    /* if (action.code == "Refresh") {
        dispatchEvent(new WorkListEvent(WorkListEvent.GET_REV_WORK_LIST));
    } */
}

const getCellBackgroundColor = (cell/* :IFlexDataGridCell */) =>/* :uint */ {
    var txtstatus/* :String */ = cell.rowInfo.getData().worklistStatus
    if (txtstatus === "Submitted") {
        return 0xE6E6FA;
    }
    else if (txtstatus === "UnderReview") {
        return 0xffffcc;
    }
    else if (txtstatus === "Rejected") {
        return 0xDC143C;
    }
    else
        return null
}

const getCellTextColor = (cell/* :IFlexDataGridDataCell */)/* :uint */ => {
    return 0x000080;
}
const enableReview = "org/monte/edi/idhub/assets/img/binocular.png";
const disableReview = "org/monte/edi/idhub/assets/img/magnifying_glass.png";
/* [Embed('org/monte/edi/idhub/assets/img/binocular.png')]
private static var enableReview:Class;
[Embed('org/monte/edi/idhub/assets/img/magnifying_glass.png')]
private static var disableReview:Class; */

const dynamicIconFunction = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    /* var img  :Class ;
                cell.rowInfo.getData() as IdWorklistGroup
 */
    if (cell.rowInfo.isDataRow && cell.level.nestDepth === 1) {
        if ((cell.rowInfo.getData().constructor.name === "IdWorklistGroup"
            && cell.rowInfo.getData().worklistStatus === 'UnderReview')
            || (cell.rowInfo.getData().constructor.name === "IdWorklist"
                && cell.rowInfo.getData().worklistGroup.worklistStatus === 'UnderReview'))
            return enableReview;
        else
            return disableReview;
    }
    return null;
}

const getColor = (cell/* :IFlexDataGridCell */) => {
    if (cell.level.nestDepth === 1
        && cell.column && cell.column.dataField !== "worklistStatus"
        && cell.rowInfo.isDataRow)
        return null; //0xe1eef7;
    return null;
}
/* [Embed('org/monte/edi/idhub/assets/img/folder-documents-icon.png')]
private static var uploadIcon:Class; */
const uploadIcon = "org/monte/edi/idhub/assets/img/folder-documents-icon.png";

const dynamicIconFunctionUpload = (cell/* :IFlexDataGridCell */, state/* :String=''*/) => {
    var img/* :Class=null; */
    if (cell.rowInfo.isDataRow && cell.level.nestDepth === 1) {
        img = uploadIcon;
    }
    return img;
}
/* [Embed('org/monte/edi/idhub/assets/img/cancel.png')]
private static var rejectIcon:Class;
[Embed('org/monte/edi/idhub/assets/img/cancel-reject.png')]
private static var cancelRejectIcon:Class;
*/
const rejectIcon = "org/monte/edi/idhub/assets/img/cancel.png";
const cancelRejectIcon = "org/monte/edi/idhub/assets/img/cancel-reject.png";

const dynamicIconFunctionReject = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    var img
    if (cell.rowInfo.isDataRow && (cell.level.nestDepth === 1 || cell.level.nestDepth === 2)) {
        img = rejectIcon
        if (cell.level.nestDepth === 2) {
            var idWorklist = cell.rowInfo.getData();
            if (idWorklist.worklistStatus === "Rejected")
                img = cancelRejectIcon
        }
    }
    return img;
}
/* [Embed('org/monte/edi/idhub/assets/img/dropbox.png')]
private static var acceptIcon:Class; */
const acceptIcon = "org/monte/edi/idhub/assets/img/dropbox.png";

const dynamicIconFunctionAccept = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    var img/* :Class=null; */
    var workListGroup/* :IdWorklistGroup */;
    if (cell.rowInfo.isDataRow && cell.level.nestDepth === 1) {
        img = acceptIcon;
        workListGroup = cell.rowInfo.getData().constructor.name === "IdWorklistGroup" ?
            cell.rowInfo.getData() : null/*  as IdWorklistGroup */
        if (workListGroup != null) {
            for (var worklist of workListGroup.workLists) {
                if (worklist.worklistStatus !== "Submitted") {
                    img = null
                    return
                }
            }
        }
    }
    return img;
}

const validateReviewerComment = (editor/* :UIComponent */)/* :Boolean */ => {
    var valSuccess/* :Boolean */ = true;
    var cell/* :IFlexDataGridCell */ = grid.getCurrentEditingCell();
    var txt/* :ITextInput */ = editor/*  as ITextInput */;
    grid.clearErrorByObject(cell.rowInfo.getData());
    if (txt.text.length > 250) {
        valSuccess = false
        grid.setErrorByObject(cell.rowInfo.getData(), cell.column.dataField, "Maximum Length for Reviewer Comment is 250 characters ");
    }
    return valSuccess
}

const ReviewWorkList = () => {
    useEffect(()=>{
        const mediator = new ReviewerWorkListMediator().onRegister(grid);
        return ()=>{
            mediator.onUnRegister();
        }
    },[])


    return (
        <div className="reviewWork-main-container">
                <DataGrid dataProvider={[]} creationComplete={vbox1_creationCompleteHandler} ref={g => grid = g} width="100%" height="100%" editable enableCopy enablePaging enableToolbarActions enableEagerDraw styleName="gridStyle" toolbarActionExecutedFunction={onExecuteToolbarAction} virtualScroll alternatingItemColors={[0xffffff, 0xffffff]} cellBackgroundColorFunction={getColor} horizontalScrollPolicy="auto" enableDrillDown >
                    <ReactDataGridColumnLevel rowHeight="23" enablePaging alternatingItemColors={[0xe1eef7, 0xe1eef7]} horizontalGridLines pageSize="10000" childrenField="workLists" enableFilters horizontalGridLineColor="#99BBE8" horizontalGridLineThickness="1">
                        <ReactDataGridColumnGroup headerText="ID">
                            <ReactDataGridColumn editable={false} columnLockMode="left" columnWidthMode="fitToContent" dataField="worklistId" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Worklist #" enableCellClickRowSelect={false} />
                            <ReactDataGridColumn editable={false} columnLockMode="left" width="60" dataField="id.worklistSeqNum" enableCellClickRowSelect={false} headerText="Seq" />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumn editable={false} columnLockMode="left" columnWidthMode="fitToContent" dataField="worklistStatus" headerText="Status" filterComboBoxBuildFromGrid filterControl="MultiSelectComboBox" cellBackgroundColorFunction={getCellBackgroundColor} enableCellClickRowSelect={false} />
                        <ReactDataGridColumn editable={false} width="90" dataField="lastName" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Last Name" enableRecursiveSearch enableCellClickRowSelect={false} />
                        <ReactDataGridColumn editable={false} width="90" dataField="firstName" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="First Name" enableRecursiveSearch enableCellClickRowSelect={false} />
                        <ReactDataGridColumnGroup headerText="Official Detail">
                            <ReactDataGridColumn editable={false} width="95" dataField="campusCode" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Location" enableCellClickRowSelect={false} />
                            <ReactDataGridColumn editable={false} columnWidthMode="fixed" width="180" dataField="title" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Title" enableCellClickRowSelect={false} />
                            <ReactDataGridColumn editable={false} columnWidthMode="fixed" width="170" dataField="department" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Department" enableCellClickRowSelect={false} />
                            <ReactDataGridColumn editable={false} width="90" dataField="startDate" filterControl="DateComboBox" headerText="Start Date" enableRecursiveSearch formatter={ExampleUtils.dateFormatter3} enableCellClickRowSelect={false} filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]} sortable={false} />
                            <ReactDataGridColumn editable={false} width="90" dataField="endDate" filterControl="DateComboBox" headerText="End Date" enableRecursiveSearch formatter={ExampleUtils.dateFormatter3} enableCellClickRowSelect={false} filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]} sortable={false} />
                            <ReactDataGridColumn editable={false} width="150" dataField="additionalComments" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Requestors comment" enableRecursiveSearch headerWordWrap enableCellClickRowSelect={false} itemEditorApplyOnValueCommit sortable={false} />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumnGroup headerText="Requestor Information">
                            <ReactDataGridColumn width="100" columnWidthMode="fixed" dataField="requestorFullName" enableCellClickRowSelect={false} filterControl="MultiSelectComboBox" filterComboBoxBuildFromGrid enableRecursiveSearch headerText="Name" useHandCursor editable={false} sortable={false} />
                            <ReactDataGridColumn editable={false} width="85" dataField="worklistGroup.requesterUser.userPhone" headerText="Phone" enableCellClickRowSelect={false} sortable={false} />
                            <ReactDataGridColumn editable={false} width="100" columnWidthMode="fixed" cellTextColorFunction={getCellTextColor} dataField="worklistGroup.requesterUser.userEmail" headerText="Email" enableCellClickRowSelect={false} useHandCursor useUnderLine color="blue" fontWeight="bold" sortable={false} />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumn editable={false} columnLockMode="right" headerText="View Docs" hideText headerWordWrap enableIcon iconFunction={dynamicIconFunctionUpload} iconToolTip="View Request Document" iconHandCursor columnWidthMode="fixed" width="60" iconLeft="25" />
                        <ReactDataGridColumnGroup headerText="Under Review">
                            <ReactDataGridColumn editable={false} columnLockMode="right" width="90" dataField="reviewerUserId" filterControl="MultiSelectComboBox" enableRecursiveSearch headerText="Reviewer ID" filterComboBoxBuildFromGrid enableCellClickRowSelect={false} />
                            <ReactDataGridColumn editable={false} columnLockMode="right" hideText headerText="Under Review" enableIcon iconHandCursor columnWidthMode="fixed" width="80" iconLeft="30" iconFunction={dynamicIconFunction} />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumnGroup headerText="Reject">
                            <ReactDataGridColumn columnLockMode="right" itemEditorApplyOnValueCommit width="150" dataField="reviewerComments" headerText="Reject Reason" enableCellClickRowSelect={false} sortable={false} itemEditorValidatorFunction={validateReviewerComment} />
                            <ReactDataGridColumn columnLockMode="right" editable={false} hideText headerText="Reject" enableIcon iconFunction={dynamicIconFunctionReject} iconToolTip="Reject Request" iconHandCursor columnWidthMode="fixed" width="80" iconLeft="30" sortable={false} />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumn columnLockMode="right" editable={false} hideText headerText="Accept" enableIcon iconFunction={dynamicIconFunctionAccept} iconToolTip="Accept Request" iconHandCursor columnWidthMode="fixed" width="60" iconLeft="20" sortable={false} />
                        <ReactDataGridColumnLevel horizontalGridLines={false} horizontalGridLineColor="0xffffff" horizontalGridLineThickness="0" rowHeight="23" nestIndent="30" reusePreviousLevelColumns alternatingItemColors={[0xFFFFFF, 0xFFFFFF]} initialSortField="id.worklistSeqNum" />
                    </ReactDataGridColumnLevel>
                </DataGrid>
        </div>
    )
}

export default ReviewWorkList;