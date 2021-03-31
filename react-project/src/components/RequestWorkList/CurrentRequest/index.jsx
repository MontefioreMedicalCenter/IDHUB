import React, { useEffect, useRef, useState } from 'react';

import '../requestWork.style.scss';
import DataGrid from '../../../shared/components/ExtendedDataGrid';
import { ReactDataGridColumn, ReactDataGridColumnGroup, ReactDataGridColumnLevel, ClassFactory } from '../../../flexicious';
import { Paper, withStyles } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import WorklistService from '../../../service/cfc/WorklistService';
import { toast } from 'react-toastify';
import IdWorklistGroup from '../../../vo/worklist/IdWorklistGroup';
import ArrayCollection from '../../../vo/ArrayCollection';
import { camelizeKeys } from '../../../shared/utils';
import BulkFileUpload from '../../../shared/components/BulkFileUpload';
import MontefioreUtils from '../../../service/utils/MontefioreUtils';
import NoSSNItemRenderer from '../../../container/views/itemRenderers/NoSSNItemRenderer'
import SsnItemRender from '../../../container/views/itemRenderers/SsnItemRender'
import EpicRequestRenderer from '../../../container/views/itemRenderers/EpicRequestRenderer'

const noSSNItemRenderer = new ClassFactory(NoSSNItemRenderer);
const ssnItemRenderer = new ClassFactory(SsnItemRender);
const epicRequestRenderer = new ClassFactory(EpicRequestRenderer)

const styles = (theme) => ({
    gridHeader: {
        color: `${theme.palette.primary.contrastText}`,
        background: `${theme.palette.primary.main}`,
        fontWeight: "lighter !important",
    },
});

const CurrentRequest = (props) => {

    const dataGridRef = useRef(null)
    const [gridData, setGridData] = useState([]);


    const worklistResultHandler = (resp) => {
        var workListGroupArr = new ArrayCollection()
        var workListArr = new ArrayCollection()
        resp.result.forEach((data) => {
            let workGroup = new IdWorklistGroup()
            workGroup.fromJson(camelizeKeys(data))
            if (workGroup.workLists != null && workGroup.workLists.length === 1)
                workListArr.addItem(workGroup.workLists);
            else
                workListGroupArr.addItem(workGroup)
        })
        setGridData((workListGroupArr[0].workLists))
    }

    const worklistFaultHandler = ({ error }) => {
        toast.error(error.toString());
    }

    useEffect(() => {
        WorklistService.getInstance().findWorklistGroups(
            worklistResultHandler,
            worklistFaultHandler
        )
    }, []);
    useEffect(() => {
        dataGridRef && DataGrid.updatePresetStyle(props, dataGridRef.current);
    }, [props])

    const uploadOrViewFile = () => {
        return (
            <Button>
                <FolderIcon fontSize="small" style={{ fill: '#1daed6' }} />
            </Button>
        )
    }

    const save = () => {
        return (
            <Button>
                <SaveIcon fontSize="small" />
            </Button>
        )
    }

    const edit = () => {
        return (
            <Button>
                <EditIcon fontSize="small" />
            </Button>
        )
    }

    const remove = () => {
        return (
            <Button>
                <DeleteIcon fontSize="small" />
            </Button>
        )
    }

    const submit = () => {
        return (
            <Button>
                <CheckCircleTwoToneIcon fontSize="small" style={{ fill: '#008000' }} />
            </Button>
        )
    }




    return (
        <div className="grid-container">
            <Paper style={{ height: "100%", width: "100%", marginTop: "10px" }}>
                <div className="header-field">
                    <BulkFileUpload />
                </div>
                <DataGrid
                    ref={dataGridRef}
                    textAlign={"center"}
                    height={"90%"}
                    width={"100%"}
                    id="Requestor_WorkList_Grid"
                    dataProvider={gridData}
                    enablePrint
                    enablePreferencePersistence
                    enableDrag
                    showSpinnerOnFilterPageSort
                    enableEagerDraw
                    enableDrop
                    enableExport
                    enableCopy
                    preferencePersistenceKey={'simpleGrid'}
                    enableMultiColumnSort
                    useCompactPreferences
                    horizontalScrollPolicy={'auto'}
                    footerDrawTopBorder
                    enablePdf
                    // cellBackgroundColorFunction="getColor"
                    //  alternatingItemColors="[0xffffff,0xffffff]" 
                    enableToolbarActions="true"
                    styleName="gridStyle"
                    toolbarActionExecutedFunction="onExecuteToolbarAction"
                    editable="true"
                    cellEditableFunction="isCellEditable"
                    //  enableDrillDown="true" 
                    filterVisible="false"
                >
                    <ReactDataGridColumnLevel
                        rowHeight={10}
                        enablePaging={true}
                        horizontalGridLines={false}
                        pageSize={10000}
                        childrenField={"workLists"}
                        alternatingItemColors="[0xe1eef7,0xe1eef7]"
                        enableFilters={true}
                        horizontalGridLineColor={"#99BBE8"}
                        horizontalGridLineThickness={1}
                    >
                        <ReactDataGridColumnGroup
                            headerText="ID"
                            headerAlign="center"
                        >
                            <ReactDataGridColumn
                                dataField="id.worklistId"
                                headerText="worklist#"
                                width={50}
                                columnLockMode={"left"}
                                enableCellClickRowSelect={"false"}
                                headerAlign="center"
                                editable="false"
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                            // filterWaterMark={"Contains"}                                
                            />
                            <ReactDataGridColumn
                                dataField="id.worklistSeqNum"
                                headerText="seq"
                                width={50}
                                columnLockMode={"left"}
                                headerAlign="center"
                                editable="false"
                                enableCellClickRowSelect="false"
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                            />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumn
                            headerText="Status"
                            headerAlign="center"
                            dataField="worklistStatus"
                            width={80}
                            columnLockMode={"left"}
                            enableCellClickRowSelect="false"
                            editable="false"
                            filterComboBoxBuildFromGrid="true"
                            filterControl="MultiSelectComboBox"
                            //  cellBackgroundColorFunction={"getCellBackgroundColor"}
                            enableIcon="true"
                            //  iconFunction="dynamicIconFunction" 
                            paddingRight="20"
                            iconRight="5"
                            iconHandCursor="true"
                            iconToolTip="Hover over to view Errors."
                        />
                        <ReactDataGridColumnGroup
                            headerText="Personal"
                            headerAlign="center"
                            dataField="requester-user-id"
                        >
                            <ReactDataGridColumn
                                dataField="lastName"
                                headerText="Last name"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                headerWordWrap="true"
                                enableRecursiveSearch="true"
                                //  itemEditorValidatorFunction="validateLname" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="firstName"
                                headerText="First Name"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                headerWordWrap="true"
                                enableRecursiveSearch="true" i
                                //  temEditorValidatorFunction="validateFname" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="middleNameOrInitial"
                                headerText="Init"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                //  itemEditorValidatorFunction="validateInitial" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="noSSN"
                                headerText="No SSN"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                editable="false"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                                itemRenderer={noSSNItemRenderer}
                            />
                            <ReactDataGridColumn
                                width={90}
                                dataField="ssn"
                                headerText="SSN"
                                headerWordWrap="true"
                                //  itemEditorValidatorFunction="validateSSN" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                                itemRenderer={ssnItemRenderer}
                            />
                            <ReactDataGridColumn
                                dataField="dateOfBirth"
                                headerText="DOB"
                                headerAlign="center"
                                width={100}
                                editorDataField="selectedDate"
                                filterControl="DateComboBox"
                                enableRecursiveSearch="true"
                                //  formatter={ExampleUtils.dateFormatter3} 
                                //  itemEditorValidatorFunction="validateDOB" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                //  filterDateRangeOptions="{[DateRange.DATE_RANGE_CUSTOM]}" 
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="gender"
                                headerText="Gender"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                filterControl="MultiSelectComboBox"
                                //  filterComboBoxDataProvider="{combogenderDP}" 
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="nonMonteEmail"
                                headerText="Personal or Business Email"
                                headerAlign="center"
                                width={70}
                                headerWordWrap="true"
                                //  itemEditorValidatorFunction="validatePersonEmail" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumnGroup
                            headerText="Official Details"
                            headerAlign="center"
                            dataField="requester-user-id"
                        >
                            <ReactDataGridColumn
                                dataField="employeeSubGroup"
                                headerText="User Type"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                editable="true"
                                itemEditorApplyOnValueCommit="false"
                                enableCellClickRowSelect="false"
                                itemEditorManagesPersistence="true"
                            />
                            <ReactDataGridColumn
                                dataField="companyCode"
                                headerText="Vendor Consultant Company"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="True"
                                //  itemEditorValidatorFunction="validateCompanyCode" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="campusCode"
                                headerText="Location"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="false"
                                enableCellClickRowSelect="false"
                                itemEditorManagesPersistence="true"
                            />
                            <ReactDataGridColumn
                                dataField="title"
                                headerText="Title"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="false"
                                enableCellClickRowSelect="false"
                                itemEditorManagesPersistence="true"
                            />
                            <ReactDataGridColumn
                                dataField="department"
                                headerText="Department"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="false"
                                enableCellClickRowSelect="false"
                                itemEditorManagesPersistence="true"
                            />
                            <ReactDataGridColumn
                                dataField="startDate"
                                headerText="Start date"
                                headerAlign="center"
                                width={100}
                                editorDataField="selectedDate"
                                filterControl="DateComboBox"
                                enableRecursiveSearch="true"
                                headerWordWrap="false"
                                //  formatter="{ExampleUtils.dateFormatter3}" 
                                //  itemEditorValidatorFunction="validateStartDate" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                labelFunction={MontefioreUtils.dateFormatter2}
                            />
                            <ReactDataGridColumn
                                dataField="endDate"
                                headerText="End Date"
                                headerAlign="center"
                                width={100}
                                editorDataField="selectedDate"
                                filterControl="DateComboBox"
                                enableRecursiveSearch="true"
                                headerWordWrap="false"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                labelFunction={MontefioreUtils.dateFormatter2}
                            />
                            <ReactDataGridColumn
                                dataField="managerSourceUniqueId"
                                headerText="MHS Manager ID"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterOperation="Contains"
                                filterWaterMark="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                //  itemEditorValidatorFunction="validatesmanagersource" 
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="managerPh"
                                headerText="MHS Manager Phone"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                //  itemEditorValidatorFunction="validatePhone" 
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="managerExt"
                                headerText="MHS Manager Ext"
                                headerAlign="center"
                                width={100}
                            />
                            <ReactDataGridColumn
                                dataField="managerEmail"
                                headerText="MHS Manager Email"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                //  itemEditorValidatorFunction="validatePersonEmail" 
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="epicRequest"
                                headerText="EPIC"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                filterControl="MultiSelectComboBox"
                                //  filterComboBoxDataProvider="{comboDP}" 
                                editable="false"
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                itemRenderer={epicRequestRenderer}
                            />
                            <ReactDataGridColumn
                                dataField="epfRequest"
                                headerText="EPF"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                filterControl="MultiSelectComboBox"
                                //  filterComboBoxDataProvider="{comboDP}" 
                                editable="false"
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="epcsHardTokenRequest"
                                headerText="EPCS Hard Token"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                filterControl="MultiSelectComboBox"
                                //  filterComboBoxDataProvider="{comboDP}" 
                                editable="false"
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="mmcEmailRequest"
                                headerText="MMC Email"
                                headerAlign="center"
                                width={100}
                                headerWordWrap="true"
                                filterControl="MultiSelectComboBox"
                                //  filterComboBoxDataProvider="{comboDP}" 
                                editable="false"
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                            />
                            <ReactDataGridColumn
                                dataField="additionalComments"
                                headerText="Requestors Comment"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterWaterMark="Contains"
                                filterOperation="Contains"
                                headerWordWrap="true"
                                enableRecursiveSearch="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            //  itemEditorValidatorFunction="validateAdditionalComment"
                            />
                            <ReactDataGridColumn
                                dataField="requestorFullName"
                                headerText="Requestor"
                                headerAlign="center"
                                width={100}
                                columnWidthMode="fixed"
                                enableCellClickRowSelect="false"
                                filterControl="MultiSelectComboBox"
                                filterComboBoxBuildFromGrid="true"
                                useHandCursor="true"
                                editable="false"
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="reviewerComments"
                                headerText="Reject Reason"
                                headerAlign="center"
                                width={100}
                                filterControl="TextInput"
                                filterWaterMark="Contains"
                                filterOperation="Contains"
                                enableRecursiveSearch="true"
                                headerWordWrap="true"
                                itemEditorApplyOnValueCommit="true"
                                enableCellClickRowSelect="false"
                                sortable="false"
                            />
                            <ReactDataGridColumn
                                dataField="createDate"
                                headerText="Create Date"
                                headerAlign="center"
                                width={100}
                                filterControl="DateComboBox"
                                enableRecursiveSearch="true"
                                headerWordWrap="false"
                                //  formatter="{ExampleUtils.dateFormatter3}" 
                                editable="false"
                                enableCellClickRowSelect="false"
                                //  filterDateRangeOptions="{[DateRange.DATE_RANGE_CUSTOM]}" 
                                sortable="false"
                            />
                        </ReactDataGridColumnGroup>
                        <ReactDataGridColumn
                            dataField="uploadDocs"
                            headerText="Upload or view Docs"
                            headerAlign="center"
                            width={60}
                            columnLockMode={"right"}
                            itemRenderer={uploadOrViewFile}
                            editable="false"
                            hideText="true"
                            headerWordWrap="true"
                            //  enableIcon="true" 
                            //  iconFunction="dynamicIconFunctionUpload" 
                            iconToolTip="View/Upload Request Document"
                            iconHandCursor="true"
                            columnWidthMode="fixed"
                            iconLeft="25"
                            sortable="false"
                        />
                        <ReactDataGridColumn
                            dataField="Save"
                            headerText="Save"
                            headerAlign="center"
                            width={60}
                            columnLockMode={"right"}
                            itemRenderer={save}
                            editable="false"
                            hideText="true"
                            //  enableIcon="true" 
                            //  iconFunction="dynamicIconFunctionSave" 
                            iconToolTip="Save Request"
                            iconHandCursor="true"
                            columnWidthMode="fixed"
                            iconLeft="20"
                            sortable="false"
                        />
                        <ReactDataGridColumn
                            dataField="Edit"
                            headerText="Edit"
                            headerAlign="center"
                            width={60}
                            columnLockMode={"right"}
                            itemRenderer={edit}
                            editable="false"
                            hideText="true"
                            //  enableIcon="true" 
                            //  iconFunction="dynamicIconFunctionEdit" 
                            iconToolTip="Edit Request"
                            iconHandCursor="true"
                            columnWidthMode="fixed"
                            iconLeft="20"
                            sortable="false"
                        />
                        <ReactDataGridColumn
                            dataField="Delete"
                            headerText="Delete"
                            headerAlign="center"
                            width={60}
                            columnLockMode={"right"}
                            itemRenderer={remove}
                            editable="false"
                            hideText="true"
                            //  enableIcon="{this.searchTb.viewStack.selectedIndex==0}" 
                            //  iconFunction="dynamicIconFunctionDelete" 
                            iconToolTip="Delete Request"
                            iconHandCursor="true"
                            columnWidthMode="fixed"
                            iconLeft="20"
                            sortable="false"
                        />
                        <ReactDataGridColumn
                            dataField="Submit"
                            headerText="Submit"
                            headerAlign="center"
                            width={60}
                            columnLockMode={"right"}
                            itemRenderer={submit}
                            editable="false"
                            hideText="true"
                            headerWordWrap="true"
                            //  enableIcon="true" 
                            //  iconFunction="dynamicIconFunctionSubmit" 
                            iconToolTip="Submit/Accept Request"
                            iconHandCursor="true"
                            columnWidthMode="fixed"
                            iconLeft="20"
                            sortable="false"
                        />
                    </ReactDataGridColumnLevel>
                </DataGrid>
            </Paper>
        </div>
    )
}

export default (withStyles(styles, { withTheme: true })(CurrentRequest));