import React, { useEffect, useRef, useState } from 'react';

import '../requestWork.style.scss';
import DataGrid from '../../../shared/components/ExtendedDataGrid';
import { ReactDataGridColumn, ReactDataGridColumnGroup } from '../../../flexicious';
import { withStyles } from '@material-ui/core';
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
        setGridData(workListGroupArr[0].workLists)
      }

    const worklistFaultHandler = ({ error }) => {
        toast.error(error.response.data.reason);
    }

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

    useEffect(() => {
        dataGridRef && DataGrid.updatePresetStyle(props, dataGridRef.current);
        WorklistService.getInstance().findWorklistGroups(
            worklistResultHandler,
            worklistFaultHandler
        )
    }, []);


    return (
        <div className="grid-container">
            <DataGrid
                ref={dataGridRef}
                textAlign={"center"}
                height={"100%"}
                width={"100%"}
                id="Requestor_WorkList_Grid"
                dataProvider={gridData}
                headerStyleName={props.classes.gridHeader}
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
                    />
                    <ReactDataGridColumn
                        dataField="id.worklistSeqNum"
                        headerText="seq"
                        width={50}
                        columnLockMode={"left"}
                        headerAlign="center"
                    />
                </ReactDataGridColumnGroup>
                <ReactDataGridColumn
                    headerText="Status"
                    headerAlign="center"
                    dataField="worklistStatus"
                    width={80}
                    columnLockMode={"left"}
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
                    />
                    <ReactDataGridColumn
                        dataField="firstName"
                        headerText="First Name"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="middleNameOrInitial"
                        headerText="Init"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="noSSN"
                        headerText="No SSN"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="dateOfBirth"
                        headerText="DOB"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="gender"
                        headerText="Gender"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="nonMonteEmail"
                        headerText="Personal or Business Email"
                        headerAlign="center"
                        width={70}
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
                    />
                    <ReactDataGridColumn
                        dataField="companyCode"
                        headerText="Vendor Consultant Company"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="campusCode"
                        headerText="Location"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="title"
                        headerText="Title"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="department"
                        headerText="Department"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="startDate"
                        headerText="Start date"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="endDate"
                        headerText="End Date"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="managerSourceUniqueId"
                        headerText="MHS Manager ID"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="managerPh"
                        headerText="MHS Manager Phone"
                        headerAlign="center"
                        width={100}
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
                    />
                    <ReactDataGridColumn
                        dataField="epicRequest"
                        headerText="EPIC"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="epfRequest"
                        headerText="EPF"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="epcsHardTokenRequest"
                        headerText="EPCS Hard Token"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="mmcEmailRequest"
                        headerText="MMC Email"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="additionalComments"
                        headerText="Requestors Comment"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="requestorFullName"
                        headerText="Requestor"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="reviewerComments"
                        headerText="Reject Reason"
                        headerAlign="center"
                        width={100}
                    />
                    <ReactDataGridColumn
                        dataField="createDate"
                        headerText="Create Date"
                        headerAlign="center"
                        width={100}
                    />
                </ReactDataGridColumnGroup>
                <ReactDataGridColumn
                    dataField="uploadDocs"
                    headerText="Upload or view Docs"
                    headerAlign="center"
                    width={60}
                    columnLockMode={"right"}
                    itemRenderer={uploadOrViewFile}
                />
                <ReactDataGridColumn
                    dataField="Save"
                    headerText="Save"
                    headerAlign="center"
                    width={60}
                    columnLockMode={"right"}
                    itemRenderer={save}
                />
                <ReactDataGridColumn
                    dataField="Edit"
                    headerText="Edit"
                    headerAlign="center"
                    width={60}
                    columnLockMode={"right"}
                    itemRenderer={edit}
                />
                <ReactDataGridColumn
                    dataField="Delete"
                    headerText="Delete"
                    headerAlign="center"
                    width={60}
                    columnLockMode={"right"}
                    itemRenderer={remove}
                />
                <ReactDataGridColumn
                    dataField="Submit"
                    headerText="Submit"
                    headerAlign="center"
                    width={60}
                    columnLockMode={"right"}
                    itemRenderer={submit}
                />
            </DataGrid>
        </div>
    )
}

export default (withStyles(styles, { withTheme: true })(CurrentRequest));