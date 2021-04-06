import React from 'react';
import { useSelector } from 'react-redux';
import ComboBox from '../../../shared/components/ComboBox'

const Title = (props) => {
    const title = props.row.rowPositionInfo.rowData.title;
    const titleList = useSelector(state => state.workListState.workListmodel.lookupLists.titleList)


    const handleOnChange = (event) => {
        props.row.rowPositionInfo.rowData.title = event.target.value
        props.cell.refreshCell();
    }

    return (
        <div>
            <ComboBox
                labelKey="titleName"
                valueKey="titleName"
                value={title}
                dataProvider={titleList}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Title