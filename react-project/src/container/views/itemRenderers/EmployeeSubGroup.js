import React from 'react';
import { useSelector } from 'react-redux';
import ComboBox from '../../../shared/components/ComboBox'

const EmployeeSubGroup = (props) => {
    const employeeSubGroup = props.row.rowPositionInfo.rowData.employeeSubGroup;
    const employeeSubgroupList = useSelector(state => state.workListState.workListmodel.lookupLists.employeeSubgroupList)

    const handleOnChange = (event) => {
        props.row.rowPositionInfo.rowData.employeeSubGroup = event.target.value
        props.cell.refreshCell();
    }

    return (
        <div>
            <ComboBox
                labelKey="employeeSubGroupName"
                valueKey="employeeSubGroupName"
                value={employeeSubGroup}
                dataProvider={employeeSubgroupList}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default EmployeeSubGroup