// import { TextField } from "@material-ui/core";
import React /* , { useState }  */ from 'react'

const SsnItemRender = props => {
	// const [displayAsPassword, setDisplayAsPassword] = useState(true)

	const data = props.row.rowPositionInfo.rowData

	// const handleOnFocus = (e) => {
	// 	setDisplayAsPassword(!displayAsPassword)
	// }
	return (
		<div>
			<input
				defaultValue={data.ssn || ""}
				// type={data.constructorName !== "IdWorklist" ? "hidden" : (displayAsPassword ? "password" : "text")}
				type={data.constructorName !== 'IdWorklist' ? 'hidden' : 'password'}
				editable={"false"}
				key={data.ssn}
				text={data.ssn}
				style={{
					height: '35px',
					width: '100%',
					textAlign: 'center',
					backgroundColor:
						data.worklistGroup && data.worklistGroup.workLists.length === 1
							? '#e1eef7'
							: '#ffffff'
				}}
				maxLength={11}
				restrict="0-9"
				// onFocus={handleOnFocus}
				// onfocusout={handleOnFocus}
			/>
		</div>
	)
}

export default SsnItemRender
