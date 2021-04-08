// import { TextField } from "@material-ui/core";
import React from 'react'

const SsnItemRender = props => {
	return props.row.rowPositionInfo.rowData.workLists ? (
		<div></div>
	) : (
		<div>
			<input
				value={props.row.rowPositionInfo.rowData.ssn}
				displayAsPassword={true}
				editable={false}
				text={props.row.rowPositionInfo.rowData.ssn}
				type="text"
				maxlength="10"
				style={{ height: '35px', width: '100%', textAlign: 'center' }}
			/>
		</div>
	)
}

export default SsnItemRender
