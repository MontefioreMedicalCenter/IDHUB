import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './reviewWork.style.scss';
import ExampleUtils from '../../utils/ExampleUtils'
import DataGrid from '../../shared/components/ExtendedDataGrid'
import uploadIcon from '../../assets/images/folder-documents-icon.png'

import enableReview from "../../assets/images/binocular.png";
import disableReview from "../../assets/images/magnifying_glass.png";

import rejectIcon from "../../assets/images/cancel.png";
import cancelRejectIcon from "../../assets/images/cancel-reject.png";
import acceptIcon from "../../assets/images/dropbox.png";

import {
    ReactDataGridColumn,
    ReactDataGridColumnGroup,
    ReactDataGridColumnLevel,
    ToolbarAction,
    DateRange
} from '../../flexicious'
import { useDispatch } from 'react-redux'
import ReviewerWorkListMediator from './ReviewerWorkListMediator.ts';
import AdvanceDialog from '../../shared/components/AdvanceDialog';
import DocumentLibrary from '../RequestWorkList/DocumentLibrary';
import { reviewerWorklistData } from '../../AppConfig/store/actions/reviewerWorklistAction';
import DocumentViewer from '../RequestWorkList/DocumentViewer';
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
const placeExpandCollapseIcon = img => {
    img.move(0, 0)
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
/* [Embed('org/monte/edi/idhub/assets/img/binocular.png')]
private static var enableReview:Class;
[Embed('org/monte/edi/idhub/assets/img/magnifying_glass.png')]
private static var disableReview:Class; */

const dynamicIconFunction = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    /* var img  :Class ;
                cell.rowInfo.getData() as IdWorklistGroup
 */
    if (cell.rowInfo.getIsDataRow() && cell.level.getNestDepth() === 1) {
        if ((cell.rowInfo.getData().constructorName === "IdWorklistGroup"
            && cell.rowInfo.getData().worklistStatus === 'UnderReview')
            || (cell.rowInfo.getData().constructorName === "IdWorklist"
                && cell.rowInfo.getData().worklistGroup.worklistStatus === 'UnderReview'))
            return enableReview;
        else
            return disableReview;
    }
    return null;
}

const getColor = (cell/* :IFlexDataGridCell */) => {
    if (cell.level.getNestDepth() === 1
        && cell.getColumn() && cell.getColumn().dataField !== "worklistStatus"
        && cell.rowInfo.getIsDataRow())
        return null; //0xe1eef7;
    return null;
}
/* [Embed('org/monte/edi/idhub/assets/img/folder-documents-icon.png')]
private static var uploadIcon:Class; */

const dynamicIconFunctionUpload = (cell/* :IFlexDataGridCell */, state/* :String=''*/) => {
    var img/* :Class=null; */
    if (cell.rowInfo.getIsDataRow() && cell.level.getNestDepth() === 1) {
        img = uploadIcon;
    }
    return img;
}
/* [Embed('org/monte/edi/idhub/assets/img/cancel.png')]
private static var rejectIcon:Class;
[Embed('org/monte/edi/idhub/assets/img/cancel-reject.png')]
private static var cancelRejectIcon:Class;
*/

const dynamicIconFunctionReject = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    var img
    if (cell.rowInfo.getIsDataRow() && (cell.level.getNestDepth() === 1 || cell.level.getNestDepth() === 2)) {
        img = rejectIcon
        if (cell.level.getNestDepth() === 2) {
            var idWorklist = cell.rowInfo.getData();
            if (idWorklist.worklistStatus === "Rejected")
                img = cancelRejectIcon
        }
    }
    return img;
}
/* [Embed('org/monte/edi/idhub/assets/img/dropbox.png')]
private static var acceptIcon:Class; */

const dynamicIconFunctionAccept = (cell/* :IFlexDataGridCell */, state/* :String='' */) => {
    var img/* :Class=null; */
    var workListGroup/* :IdWorklistGroup */;
    if (cell.rowInfo.getIsDataRow() && cell.level.getNestDepth() === 1) {
        img = acceptIcon;
        workListGroup = cell.rowInfo.getData().constructorName === "IdWorklistGroup" ?
            cell.rowInfo.getData() : null/*  as IdWorklistGroup */
        if (workListGroup != null && workListGroup.workLists) {
            for (var i =0 ;  i< workListGroup.workLists.length  ; i++) {
                if (workListGroup.workLists[i].worklistStatus !== "Submitted") {
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
    var cell/* :IFlexDataGridCell */ = grid.getCurrentEditCell();
    var txt/* :ITextInput */ = editor/*  as ITextInput */;
    grid.clearErrorByObject(cell.rowInfo.getData());
    if (txt.getValue().length > 250) {
        valSuccess = false
        grid.setErrorByObject(cell.rowInfo.getData(), cell.getColumn().dataField, "Maximum Length for Reviewer Comment is 250 characters ");
    }
    return valSuccess
}

const ReviewWorkList = () => {
    const documentPopup = useSelector(state => state.reviewerState.documentPopup)
    const workList = useSelector(state => state.reviewerState.workList)
    const dispatch = useDispatch()
    const loginModel = useSelector(state => state.loginState.loginModel)
    const [documentFileUrl, setDocumentFileUrl] = useState('')
    const [openModal, setOpenModal] = useState(false)



    useEffect(() => {
        const mediator = new ReviewerWorkListMediator().onRegister(grid, loginModel);
        return () => {
            mediator.onUnRegister();
        }
        // eslint-disable-next-line
    }, [])

    const onOpenDocument = () => {
        dispatch(reviewerWorklistData(!documentPopup))
    }

    const onShowDocument = fileData => {
        setDocumentFileUrl(fileData)
        setOpenModal(true)
    }

    // const textFilterFunction = (item, filter) => {
    //     if (typeof filter.expression === 'string') {
    //         return (
    //             item[filter.columnName]
    //                 .toString()
    //                 .toLowerCase()
    //                 .indexOf(filter.expression.toLowerCase()) !== -1
    //         )
    //     }
    //     else if (
    //         typeof filter.expression === 'object' &&
    //         filter.expression.length > 0 && item[filter.columnName]
    //     ) {
    //         const filteredArr = filter.expression.map(list => {
    //             const temp = item[filter.columnName]
    //                 .toString()
    //                 .toLowerCase()
    //                 .indexOf(list.toLowerCase()) !== -1;

    //             return temp;
    //         })
    //         return filteredArr && filteredArr.length && filteredArr[0];
    //     }
    // }


    return (
        <div className="reviewWork-main-container">
            <DataGrid creationComplete={vbox1_creationCompleteHandler} ref={g => grid = g} enableDefaultDisclosureIcon={false}             
						clearOpenItemsOnDataProviderChange={false}
						selectedKeyField={'uniqueIdentifier'}
                        width="100%" height="100%" editable enableCopy enablePaging enableToolbarActions enableEagerDraw styleName="gridStyle" toolbarActionExecutedFunction={onExecuteToolbarAction} virtualScroll alternatingItemColors={[0xffffff, 0xffffff]} cellBackgroundColorFunction={getColor} horizontalScrollPolicy="auto" enableDrillDown >
                <ReactDataGridColumnLevel rowHeight="23" enablePaging alternatingItemColors={[0xe1eef7, 0xe1eef7]} horizontalGridLines pageSize="10000" childrenField="_workLists" enableFilters horizontalGridLineColor="#99BBE8" horizontalGridLineThickness="1">
                    <ReactDataGridColumnGroup headerText="ID">
                        <ReactDataGridColumn editable={false} columnLockMode="left" columnWidthMode="fitToContent" dataField="worklistId" expandCollapseIconPlacementFunction={placeExpandCollapseIcon} enableExpandCollapseIcon filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Worklist #" enableCellClickRowSelect={false} filterCompareFunction={null} />
                        <ReactDataGridColumn editable={false} columnLockMode="left" width="60" dataField="id.worklistSeqNum" enableCellClickRowSelect={false} headerText="Seq" />
                    </ReactDataGridColumnGroup>
                    <ReactDataGridColumn editable={false} columnLockMode="left" columnWidthMode="fitToContent" dataField="worklistStatus" headerText="Status" filterComboBoxBuildFromGrid filterControl="MultiSelectComboBox" cellBackgroundColorFunction={getCellBackgroundColor} enableCellClickRowSelect={false} filterCompareFunction={null} 
									filterComboBoxWidth={150}/>
                    <ReactDataGridColumn textAlign={'left'} editable={false} width="90" dataField="lastName" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Last Name" enableRecursiveSearch enableCellClickRowSelect={false} filterCompareFunction={null} />
                    <ReactDataGridColumn textAlign={'left'} editable={false} width="90" dataField="firstName" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="First Name" enableRecursiveSearch enableCellClickRowSelect={false} filterCompareFunction={null} />
                    <ReactDataGridColumnGroup headerText="Official Detail">
                        <ReactDataGridColumn textAlign={'left'} editable={false} width="95" dataField="campusCode" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Location" enableCellClickRowSelect={false} filterCompareFunction={null} />
                        <ReactDataGridColumn textAlign={'left'} editable={false} columnWidthMode="fixed" width="180" dataField="title" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Title" enableCellClickRowSelect={false} filterCompareFunction={null} />
                        <ReactDataGridColumn textAlign={'left'} editable={false} columnWidthMode="fixed" width="170" dataField="department" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" enableRecursiveSearch headerText="Department" enableCellClickRowSelect={false} filterCompareFunction={null} />
                        <ReactDataGridColumn editable={false} width="90" dataField="startDate" filterControl="DateComboBox" headerText="Start Date" enableRecursiveSearch formatter={ExampleUtils.dateFormatter3} enableCellClickRowSelect={false} filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]} sortable={false} />
                        <ReactDataGridColumn editable={false} width="90" dataField="endDate" filterControl="DateComboBox" headerText="End Date" enableRecursiveSearch formatter={ExampleUtils.dateFormatter3} enableCellClickRowSelect={false} filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]} sortable={false} />
                        <ReactDataGridColumn textAlign={'left'} editable={false} width="150" dataField="additionalComments" filterControl="TextInput" filterOperation="Contains" filterWaterMark="Contains" headerText="Requestors comment" enableRecursiveSearch headerWordWrap enableCellClickRowSelect={false} itemEditorApplyOnValueCommit sortable={false} />
                    </ReactDataGridColumnGroup>
                    <ReactDataGridColumnGroup headerText="Requestor Information">
                        <ReactDataGridColumn width="100" columnWidthMode="fixed" textAlign={'left'} dataField="requestorFullName" enableCellClickRowSelect={false} filterControl="MultiSelectComboBox" filterComboBoxBuildFromGrid enableRecursiveSearch headerText="Name" useHandCursor editable={false} sortable={false} 
									filterComboBoxWidth={150}/>
                        <ReactDataGridColumn editable={false} width="100" dataField="worklistGroup.requesterUser.userPhone" textAlign={'left'} enableCellClickRowSelect={false} sortable={false} />
                        <ReactDataGridColumn editable={false} width="100" columnWidthMode="fixed" cellTextColorFunction={getCellTextColor} dataField="worklistGroup.requesterUser.userEmail" headerText="Email" enableCellClickRowSelect={false} useHandCursor useUnderLine color="blue" fontWeight="bold" sortable={false} />
                    </ReactDataGridColumnGroup>
                    <ReactDataGridColumn editable={false} columnLockMode="right" headerText="View Docs" hideText headerWordWrap enableIcon useIconRollOverTimer={false} iconFunction={dynamicIconFunctionUpload} iconToolTip="View Request Document" iconHandCursor columnWidthMode="fixed" width="60" iconLeft="25" />
                    <ReactDataGridColumnGroup headerText="Under Review">
                        <ReactDataGridColumn editable={false} columnLockMode="right" width="90" dataField="reviewerUserId" filterControl="MultiSelectComboBox" enableRecursiveSearch headerText="Reviewer ID" filterComboBoxBuildFromGrid enableCellClickRowSelect={false} filterCompareFunction={null} 
									filterComboBoxWidth={150}/>
                        <ReactDataGridColumn editable={false} columnLockMode="right" hideText headerText="Under Review" enableIcon useIconRollOverTimer={false} iconHandCursor columnWidthMode="fixed" width="80" iconLeft="30" iconFunction={dynamicIconFunction} />
                    </ReactDataGridColumnGroup>
                    <ReactDataGridColumnGroup headerText="Reject">
                        <ReactDataGridColumn columnLockMode="right" itemEditorApplyOnValueCommit width="150" dataField="reviewerComments" headerText="Reject Reason" enableCellClickRowSelect={false} sortable={false} itemEditorValidatorFunction={validateReviewerComment} />
                        <ReactDataGridColumn columnLockMode="right" editable={false} hideText headerText="Reject" enableIcon useIconRollOverTimer={false} iconFunction={dynamicIconFunctionReject} iconToolTip="Reject Request" iconHandCursor columnWidthMode="fixed" width="80" iconLeft="30" sortable={false} />
                    </ReactDataGridColumnGroup>
                    <ReactDataGridColumn columnLockMode="right" editable={false} hideText headerText="Accept" enableIcon useIconRollOverTimer={false} iconFunction={dynamicIconFunctionAccept} iconToolTip="Accept Request" iconHandCursor columnWidthMode="fixed" width="60" iconLeft="20" sortable={false} />
                    <ReactDataGridColumnLevel enableFooters horizontalGridLines={false} horizontalGridLineColor="0xffffff" horizontalGridLineThickness="0" rowHeight="23" nestIndent="30" reusePreviousLevelColumns alternatingItemColors={[0xFFFFFF, 0xFFFFFF]} initialSortField="id.worklistSeqNum" />
                </ReactDataGridColumnLevel>
            </DataGrid>
            <AdvanceDialog
                open={openModal}
                handleClose={() => setOpenModal(false)}
                headerTitle="Document Viewer"
                bodyRenderer={<DocumentViewer documentFileUrl={documentFileUrl} />}
            />
            <DocumentLibrary
				worklist={workList}
				onShowDocument={onShowDocument}
				onOpenDocument={onOpenDocument}
				openDocumentLibrary={documentPopup}
				documentlibraryTitle='Request Documents'
			/>

        </div>
    )
}

export default ReviewWorkList;