import React, { useState, useEffect, useRef } from 'react';
import './requestWork.style.scss';
import DataGrid from '../../shared/components/ExtendedDataGrid';
import { ReactDataGridColumn, ReactDataGridColumnGroup } from '../../flexicious';
import { Paper, Tab, Tabs, withStyles } from '@material-ui/core';
import WorklistService from '../../service/cfc/WorklistService'
import { toast } from 'react-toastify';

const styles = (theme) => ({
  gridHeader: {
    color: `${theme.palette.primary.contrastText}`,
    background: `${theme.palette.primary.main}`,
    fontWeight: "lighter !important",
  },
});

const RequestWorkList = (props) => {
  const dataGridRef = useRef(null)
  const [tab, setTab] = useState(0);
  const [gridData, setGridData] = useState([]);

  const handleChange = (event, value) => {
    setTab(value)
  }

  const worklistResultHandler = (resp) => {
    console.log("resp", resp)
    setGridData(resp.result[0].workLists)
  }

  const worklistFaultHandler = ({ error }) => {
    toast.error(error.response.data.reason);
  }

  useEffect(() => {
    dataGridRef && DataGrid.updatePresetStyle(props, dataGridRef.current);
    WorklistService.getInstance().findWorklistGroups(
      worklistResultHandler,
      worklistFaultHandler
    )
  }, [dataGridRef, tab, props]);


  return (
    <div className="requestWork-main-container">
      <div className="changetabs">
        <Paper>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Current Request" />
            <Tab label="Search Request" />
          </Tabs>
        </Paper>
      </div>
      { Boolean(tab === 0) && <div className="grid-container">
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
              width = {50}
              columnLockMode={"left"}
              enableCellClickRowSelect={"false"}
            />
            <ReactDataGridColumn
              dataField="id.worklistSeqNum"
              headerText="seq"
              width = {50}
              columnLockMode={"left"}
            />
          </ReactDataGridColumnGroup>
          <ReactDataGridColumn
            headerText="Status"
            headerAlign="center"
            dataField="worklistStatus"
            width = {80}
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
              width = {100}
            />
            <ReactDataGridColumn
              dataField="firstName"
              headerText="First Name"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="middleNameOrInitial"
              headerText="Init"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="noSSN"
              headerText="No SSN"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="dateOfBirth"
              headerText="DOB"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="gender"
              headerText="Gender"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="email"
              headerText="Personal or Business Email"
              width = {70}
            />
            </ReactDataGridColumnGroup>
            <ReactDataGridColumnGroup
            headerText="Official Details"
            headerAlign="center"
            dataField="requester-user-id"
          >
            <ReactDataGridColumn
              dataField="userType"
              headerText="User Type"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="vendorCompany"
              headerText="Vendor Consultant Company"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="location"
              headerText="Location"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="title"
              headerText="Title"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="department"
              headerText="Department"
              width = {100}
            />
            <ReactDataGridColumn
              dataField="accept-date"
              headerText="Start date"
              width = {100}
            />
          </ReactDataGridColumnGroup>
          <ReactDataGridColumn
            dataField="uploadDocs"
            headerText="Upload or view Docs"
            width = {60}
            columnLockMode={"right"}
          />
          <ReactDataGridColumn
            dataField="Save"
            headerText="Save"
            width = {60}
            columnLockMode={"right"}
          />
          <ReactDataGridColumn
            dataField="Edit"
            headerText="Edit"
            width = {60}
            columnLockMode={"right"}
          />
          <ReactDataGridColumn
            dataField="Delete"
            headerText="Delete"
            width = {60}
            columnLockMode={"right"}            
          />
          <ReactDataGridColumn
            dataField="Submit"
            headerText="Submit"
            width = {60}
            columnLockMode={"right"}
          />
        </DataGrid>
      </div>}
    </div>
  )
}

export default (withStyles(styles, { withTheme: true })(RequestWorkList));