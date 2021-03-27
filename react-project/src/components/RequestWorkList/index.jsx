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
    setGridData(resp.result)
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
            headerAlign="center" >
            <ReactDataGridColumn
              dataField="worklist-id"
              headerText="worklist#"
            />
            <ReactDataGridColumn
              dataField="id.worklistSeqNum"
              headerText="seq"
            />
          </ReactDataGridColumnGroup>
          <ReactDataGridColumn
            headerText="Status"
            headerAlign="center"
            dataField="worklist-status"
          />
          <ReactDataGridColumnGroup
            headerText="Personal"
            headerAlign="center"
            dataField="requester-user-id"
          >
            <ReactDataGridColumn
              dataField="requester-user-id"
              headerText="Last name"
            />
            <ReactDataGridColumn
              dataField="firstName"
              headerText="First Name"
            />
            <ReactDataGridColumn
              dataField="init"
              headerText="Init"
            />
            <ReactDataGridColumn
              dataField="noSsn"
              headerText="No SSN"
            />
            <ReactDataGridColumn
              dataField="dob"
              headerText="DOB"
            />
            <ReactDataGridColumn
              dataField="gender"
              headerText="Gender"
            />
            <ReactDataGridColumn
              dataField="email"
              headerText="Personal or Business Email"
            />
            <ReactDataGridColumn
              dataField="userType"
              headerText="User Type"
            />
            <ReactDataGridColumn
              dataField="vendorCompany"
              headerText="Vendor Consultant Company"
            />
            <ReactDataGridColumn
              dataField="location"
              headerText="Location"
            />
            <ReactDataGridColumn
              dataField="title"
              headerText="Title"
            />
            <ReactDataGridColumn
              dataField="department"
              headerText="Department"
            />
            <ReactDataGridColumn
              dataField="accept-date"
              headerText="Start date"
            />
          </ReactDataGridColumnGroup>
          <ReactDataGridColumn
            dataField="uploadDocs"
            headerText="Upload or view Docs"
          />
          <ReactDataGridColumn
            dataField="Save"
            headerText="Save"
          />
          <ReactDataGridColumn
            dataField="Edit"
            headerText="Edit"
          />
          <ReactDataGridColumn
            dataField="Delete"
            headerText="Delete"
          />
          <ReactDataGridColumn
            dataField="Submit"
            headerText="Submit"
          />
        </DataGrid>
      </div>}
    </div>
  )
}

export default (withStyles(styles, { withTheme: true })(RequestWorkList));