import React from 'react'
import '../admin.style.scss'
import DataGrid from '../../../../../shared/components/ExtendedDataGrid';
// import ExampleUtils from '../../../../utils/ExampleUtils';
import {
    FlexDataGridEvent,
    ReactDataGridColumn,
    ReactDataGridColumnLevel,
} from '../../../../../flexicious';
import MontefioreUtils from '../../../../../service/utils/MontefioreUtils';
import IdCampusCodeAdminEvent from "../../../../../events/IdCampusCodeAdminEvent.ts"
import InActive from '../../../../../assets/images/Edit-inactive.png'
import Active from '../../../../../assets/images/Edit-active.png'
import saveB from '../../../../../assets/images/saveB.png'
import deleteIcon from '../../../../../assets/images/delete.png'


import { toast } from 'react-toastify'
import { ToolbarAction } from '../../../../../flexicious';
import IdCampusCode from '../../../../../vo/admin/IdCampusCode';
import ExampleUtils from '../../../../../utils/ExampleUtils';
import IdCampusCodeMediator from '../../../Mediators/IdCampusCodeMediator.ts';

const isCellEditable = (cell) => {
    return cell.rowInfo.getData().edit === true
}

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
        this.keepa = "";
    }

    onEdit(data) {
        var idx;
        var grid = this.grid;
        var gridDP = grid.getDataProvider();
        if (data.edit && this._indEdit === (grid.getDataProvider()).getItemIndex(data)) {
            MontefioreUtils.showConfirm("Are you sure you want to cancel your changes?", "Confirm Cancel", MontefioreUtils.YES | MontefioreUtils.NO, this, (event) => {
                if (event.detail === MontefioreUtils.YES) {
                    idx = gridDP.getItemAt(this._indEdit);
                    if (this._indEdit === 0 && idx.campusCodeId >= this.lastN) {
                        gridDP.removeItemAt(0);
                    }
                    else {
                        idx.campusCodeName = this.keeper;
                        idx.activeFlag = this.keepa;
                        gridDP.setItemAt(idx, this._indEdit);
                    }
                    data.edit = false;
                    this._indEdit = -1;
                    grid.refreshCells();
                    return;
                } else if (event.detail === MontefioreUtils.NO) {
                }
            })
        } else {
            if (this._indEdit < 0) {
                data.edit = true
                this._indEdit = (grid.getDataProvider()).getItemIndex(data);
                this.keeper = (gridDP.getItemAt(this._indEdit)).campusCodeName;
                this.keepa = (gridDP.getItemAt(this._indEdit)).activeFlag;
            }
            else
                toast.warning("Please save the row previously being edited first !")
        }
        grid.refreshCells();
    }
    vbox1_creationCompleteHandler(event) {
        this.grid.toolbarActions.addItem(new ToolbarAction("Add Location", -1, "", "Add Location", "org/monte/edi/idhub/assets/img/add.png", false, true));
    }
    onExecuteToolbarAction(action) {
        var gridDP = this.grid.getDataProvider()
        if (action.code === "Add Location") {
            if (this._indEdit >= 0) {
                toast.warning("Please save the row previously being edited first !");
                return;
            }
            if (this._indEdit === 0) { return; }
            this._indEdit = -10;
            var idcampuscodeClass = new IdCampusCode();
            idcampuscodeClass.edit = true;
            idcampuscodeClass.activeFlag = 1;
            var lastRow = gridDP.getItemAt(gridDP.length - 1);
            // var maxAcId:int = lastRow.campusCodeId
            idcampuscodeClass.campusCodeId = lastRow.campusCodeId + 1;
            this._indEdit = 0;
            gridDP.addItemAt(idcampuscodeClass, 0);
            this.lastN = lastRow.campusCodeId + 1;
            this.grid.refreshCells()
        }
        else
            toast.warning("Invalid action!")
    }
    onDelete(data) {
        MontefioreUtils.showConfirm("Are you sure you want to delete this item?", "Confirm Delete", MontefioreUtils.OK | MontefioreUtils.CANCEL, this, (event) => {
            if (event.detail === MontefioreUtils.OK) {
                this.lastN = 0;
                this._indEdit = -1;
                this.grid.dispatchEvent(new IdCampusCodeAdminEvent(IdCampusCodeAdminEvent.DELETE, data));
                this.grid.refreshCells();
            }
            else if (event.detail === MontefioreUtils.NO) {
                toast.warning("Cancel the delete.")
            }
        })
        return true;
    }

    onSave(data) {
        if (data.campusCodeName != null) {
            data.edit = false;
            this._indEdit = -1;
            this.grid.dispatchEvent(new IdCampusCodeAdminEvent(IdCampusCodeAdminEvent.SAVE, data));
            this.grid.refreshCells();
        }
        //data.edit
        this.editable = false
        return false;
    }

    checkId(cell) {
        var data = cell.rowInfo.getData()
        var oid = (data).campusCodeId;
        if (this.lastN === 0 || oid <= this.lastN)
            return getDeleteIcon(cell);
        else
            return null;
    }

    validatecampus(editor) {
        var valSuccess = false;
        var cell = this.grid.getCurrentEditingCell();
        var txt = editor;
        this.grid.clearErrorByObject(cell.rowInfo.data);

        if (txt.getValue().length < 1) {
            this.grid.setErrorByObject(cell.rowInfo.getData(), cell.getColumn().dataField, "Missing required field :Name");
            valSuccess = false;
        }
        else {

            valSuccess = true;
        }
        return valSuccess;
    }
    componentDidMount() {
        this.mediator = new IdCampusCodeMediator().onRegister(this.grid);
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK, gridIconClick);
    }
    componentWillUnmount() {
        this.grid.removeEventListener(FlexDataGridEvent.ICON_CLICK, gridIconClick);
        this.mediator.onUnRegister();
    }
    render() {
        return (
            <DataGrid id="grid" ref={g => this.grid = g} width="100%" height="100%" enableEagerDraw="true" enablePaging="true" enableToolbarActions="true" horizontalScrollPolicy="auto" styleName="gridStyle"
                toolbarActionExecutedFunction={this.onExecuteToolbarAction.bind(this)}
                creationComplete={this.vbox1_creationCompleteHandler.bind(this)} editable="true"
                cellEditableFunction={isCellEditable} enableCopy="true" enableExport="true">
                <ReactDataGridColumnLevel rowHeight="21" enableFilters="true" enablePaging="true" pageSize="50">
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="campusCodeId" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Location ID" itemEditorApplyOnValueCommit="true" editable={false} />
                    <ReactDataGridColumn width="350" columnWidthMode="fitToContent" dataField="campusCodeName" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Location Name" itemEditorApplyOnValueCommit="true" itemEditorValidatorFunction={this.validatecampus.bind(this)} />
                    <ReactDataGridColumn headerText="Active" editable={false} enableCellClickRowSelect={false}>
                        {/* <nestedtreedatagrid:itemRenderer>
							<fx:Component>
								<mx:HBox width="100%" horizontalAlign="center" >
									<s:CheckBox id="activeChkBox" enabled="{data.edit}" selected="{data.activeFlag==1?true:false}"  click="if(data.activeFlag==0) data.activeFlag=1; else data.activeFlag=0;" styleName="checkBoxStyle"/>
								</mx:HBox>
							</fx:Component>
						</nestedtreedatagrid:itemRenderer> */}
                    </ReactDataGridColumn>
                    <ReactDataGridColumn width="100" dataField="createDate" enableCellClickRowSelect={false} filterOperation="Contains" headerText="Create Date" labelFunction={dateLabel} editable={false} filterControl="DateComboBox" />
                    <ReactDataGridColumn width="100" dataField="updateDate" enableCellClickRowSelect={false} filterControl="DateComboBox" filterOperation="Contains" headerText="Update Date" labelFunction={dateLabel} editable={false} />
                    <ReactDataGridColumn width="100" dataField="updatedBy" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Updated By" editable={false} />

                    <ReactDataGridColumn headerText="Edit" width="50" excludeFromExport="true" editable={false}
                        iconHandCursor enableIcon iconFunction={dynamicIconFunction} iconClick={this.onEdit.bind(this)}>


                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Delete" width="50" excludeFromExport="true" editable={false}
                        iconHandCursor enableIcon iconFunction={this.checkId.bind(this)} iconClick={this.onDelete.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Save" width="50" excludeFromExport="true" editable={false}
                        iconHandCursor enableIcon iconFunction={getSaveB} iconClick={this.onSave.bind(this)}>
                    </ReactDataGridColumn>
                </ReactDataGridColumnLevel>
            </DataGrid>);
    }
}
