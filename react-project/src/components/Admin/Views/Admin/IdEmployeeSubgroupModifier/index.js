import React from 'react'
import '../admin.style.scss'
import DataGrid from '../../../../../shared/components/ExtendedDataGrid';
// import ExampleUtils from '../../../../utils/ExampleUtils';
import {
    ClassFactory,
    ExtendedExportController,
    FlexDataGridEvent,
    ReactDataGridColumn,
    ReactDataGridColumnLevel,
} from '../../../../../flexicious';
import MontefioreUtils from '../../../../../service/utils/MontefioreUtils';
import IdEmployeeSubgroupAdminEvent from "../../../../../events/IdEmployeeSubgroupAdminEvent.ts"
import InActive from '../../../../../assets/images/Edit-inactive.png'
import Active from '../../../../../assets/images/Edit-active.png'
import saveB from '../../../../../assets/images/saveB.png'
import deleteIcon from '../../../../../assets/images/delete.png'


import { toast } from 'react-toastify'
import { ToolbarAction } from '../../../../../flexicious';
import IdEmployeeSubgroup from '../../../../../vo/admin/IdEmployeeSubgroup';
import ExampleUtils from '../../../../../utils/ExampleUtils';
import IdEmployeeSubgroupMediator from '../../../Mediators/IdEmployeeSubgroupMediator.ts';
import AdminCheckBoxRenderer from '../../../../../container/views/itemRenderers/AdminCheckBoxRenderer';
import store from '../../../../../AppConfig/store/configureStore';
import { showMessage } from '../../../../../AppConfig/store/actions/homeAction';
import MontifioreTextinput from '../../../../../shared/components/ExtendedDataGrid/material/grid/MontifioreTextInput';

const AdminCheckBox = new ClassFactory(AdminCheckBoxRenderer)
const testBoxRenderer = new ClassFactory(MontifioreTextinput)

const dateLabel = (item, col) => {
    var dateStr/*:String*/ = ''
    if (item != null) {
        if (item.updateDate != null && col.dataField === "updateDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.updateDate)
        if (item.createDate != null && col.dataField === "createDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.createDate)
    }
    return dateStr;
}
const gridIconClick = (evt) => {
    evt.column.iconClick(evt.item);
}
const getSaveB = (cell) => { return cell.rowInfo.getIsDataRow() ? saveB : null };
const getDeleteIcon = (cell) => { return cell.rowInfo.getIsDataRow() ? deleteIcon : null };

const dynamicIconFunction = (cell/**/) => {
    if (!cell.rowInfo.getIsDataRow()) return null;
    var data = cell.rowInfo.getData();
    if (data == null) return null;
    var ret;
    if (data.edit === true) ret = Active;
    else ret = InActive;
    return ret;

}

export default class TitleModifier extends React.Component {
    constructor(props) {
        super(props);
        this.keeper = "";
        this.lastN = 0;
        this.grid = null;
        this._indEdit/*:int*/ = -1;
    }


    onEdit(data) {
        var idx;
        var gridDP = this.grid.getDataProvider();
        if (data.edit && this._indEdit === (this.grid.getDataProvider()).getItemIndex(data)) {
            store.dispatch(showMessage('Confirm change',
                'Are you sure you want to cancel your changes?',
                'Yes_No',
                () => {
                    idx = gridDP.getItemAt(this._indEdit);
                    if (this._indEdit === 0 && idx.employeeSubGroupId >= this.lastN) {
                        gridDP.removeItemAt(0);
                    }
                    else {
                        idx.employeeSubGroupName = this.keeper;
                        gridDP.setItemAt(idx, this._indEdit);
                    }
                    data.edit = false;
                    this._indEdit = -1;
                    this.grid.refreshCells();
                    return;
                },
                () => { }
            ))
        } else {
            if (this._indEdit < 0) {
                data.edit = true
                data.updateDate = new Date();
                this._indEdit = (this.grid.getDataProvider()).getItemIndex(data);
                this.keeper = (gridDP.getItemAt(this._indEdit)).employeeSubGroupName;
            }
            else
                toast.warning("Please save the row previously being edited first !")
        }
        this.grid.refreshCells();
    }

    onToolbarExport() {
        ExtendedExportController.instance().export(this.grid);
    }

    onExecuteToolbarAction(action) {

        if (action.code === "Add Employee Subgroup") {
            if (this._indEdit >= 0) {
                toast.warning("Please save the row previously being edited first !");
                return;
            }

            this._indEdit = -10;
            var gridDP = this.grid.getDataProvider()
            var val = new IdEmployeeSubgroup();
            val.edit = true;
            var lastRow = gridDP.getItemAt(gridDP.length - 1);
            // var maxAcId:int = lastRow.employeeSubGroupId
            val.employeeSubGroupId = lastRow.employeeSubGroupId + 1;
            val.createDate = new Date();
            val.updateDate = new Date();
            val.activeFlag = 1;
            this.lastN = lastRow.employeeSubGroupId + 1
            this._indEdit = 0;
            gridDP.addItemAt(val, 0);
            this.grid.rebuildBody();
            this.grid.refreshCells()
        }
        else
        toast.warning("Invalid action!")
    }


    onDelete(data) {
        store.dispatch(
            showMessage('Confirm delete',
                'Are you sure you want to delete this item?',
                'Ok_Cancel',
                () => {
                    this.lastN = 0;
                    this._indEdit = -1;
                    this.grid.dispatchEvent(new IdEmployeeSubgroupAdminEvent(IdEmployeeSubgroupAdminEvent.DELETE, data));
                    this.grid.refreshCells();
                },
                () => {
                    toast.warning("Cancel the delete.")
                }
            ))
        return true;
    }

    onSave(data) {

        if (data.employeeSubGroupName != null) {
            data.edit = false;
            this._indEdit = -1;
            this.grid.dispatchEvent(new IdEmployeeSubgroupAdminEvent(IdEmployeeSubgroupAdminEvent.SAVE, data));
            this.grid.refreshCells();
        }
        return false;
    }

    checkId(data) {
        var oid = (data).employeeSubGroupId;
        if (this.lastN === 0 || oid <= this.lastN)
            return true;
        else
            return false;
    }
    validateuseridtype(editor) {
        var valSuccess = false;
        var cell = this.grid.getCurrentEditingCell();
        var txt = editor;
        this.grid.clearErrorByObject(cell.rowInfo.data);

        if (txt.getValue().length < 1) {
            this.grid.setErrorByObject(
                cell.rowInfo.getData(),cell.getColumn().dataField, "Missing required field :Name"
            );
            valSuccess = false;
        }
        else {

            valSuccess = true;
        }

        //If you return true, the grid will highlight the error in red and move on to the next row. 
        //If you return false, the edit box would stay in place and not let the user move forward 
        //unless the error is corrected.
        return valSuccess;
    }
    componentDidMount() {
        this.grid.toolbarActions.push(new ToolbarAction("Add Employee Subgroup", -1, "", "Add Employee Subgroup", "org/monte/edi/idhub/assets/img/add.png", false, true));
        this.grid.rebuildPager();
        this.mediator = new IdEmployeeSubgroupMediator().onRegister(this.grid);
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK, gridIconClick);
    }
    componentWillUnmount() {
        this.grid.removeEventListener(FlexDataGridEvent.ICON_CLICK, gridIconClick);
        this.mediator.onUnRegister();
    }
    render() {
        return (
            <DataGrid id="grid" ref={g => this.grid = g} width="100%" height="100%" enableEagerDraw="true" filterVisible={false} pagerRenderer={MontefioreUtils.pagerFactory} enablePaging="true" enableToolbarActions="true"
                horizontalScrollPolicy="auto" styleName="gridStyle" toolbarActionExecutedFunction={this.onExecuteToolbarAction.bind(this)}
                editable="true" cellEditableFunction={this.isCellEditable} enableCopy="true" enableExport="true">
                <ReactDataGridColumnLevel rowHeight="21" enableFilters="true" enablePaging="true" pageSize="50">
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="employeeSubGroupId" enableCellClickRowSelect="false" filterControl="TextInput" filterOperation="Contains" headerText="User Type ID" itemEditorApplyOnValueCommit="true" editable="false" />
                    <ReactDataGridColumn width="350" columnWidthMode="fitToContent" dataField="employeeSubGroupName" enableCellClickRowSelect="false" filterControl="TextInput" filterOperation="Contains" headerText="User Type" itemEditor={testBoxRenderer} itemEditorApplyOnValueCommit="true" itemEditorValidatorFunction={this.validateuseridtype.bind(this)} />
                    <ReactDataGridColumn headerText="Active" dataField="activeFlag" editable="false" enableCellClickRowSelect="false" itemRenderer={AdminCheckBox}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn width="100" dataField="createDate" enableCellClickRowSelect="false" filterOperation="Contains" headerText="Create Date" labelFunction={dateLabel} editable="false" filterControl="DateComboBox" />
                    <ReactDataGridColumn width="100" dataField="updateDate" enableCellClickRowSelect="false" filterControl="DateComboBox" filterOperation="Contains" headerText="Update Date" labelFunction={dateLabel} editable="false" />
                    <ReactDataGridColumn width="100" dataField="updatedBy" enableCellClickRowSelect="false" filterControl="TextInput" filterOperation="Contains" headerText="Updated By" editable="false" />
                    <ReactDataGridColumn headerText="Edit" width="50" excludeFromExport="true" editable="false"
                        sortable={false} iconFunction={dynamicIconFunction} iconPlacementFunction={MontefioreUtils.placeIcon} iconHandCursor enableIcon useIconRollOverTimer={false} iconClick={this.onEdit.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Delete" width="50" excludeFromExport="true" editable="false"
                        sortable={false} enableIcon useIconRollOverTimer={false} iconFunction={getDeleteIcon} iconPlacementFunction={MontefioreUtils.placeIcon} iconHandCursor iconClick={this.onDelete.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Save" width="50" excludeFromExport="true" editable="false"
                        sortable={false} iconHandCursor enableIcon useIconRollOverTimer={false} iconPlacementFunction={MontefioreUtils.placeIcon} iconFunction={getSaveB} iconClick={this.onSave.bind(this)}>
                    </ReactDataGridColumn>
                </ReactDataGridColumnLevel>
            </DataGrid>);
    }
}
