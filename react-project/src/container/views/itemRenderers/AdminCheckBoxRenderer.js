import { Checkbox } from '@material-ui/core'
import React from 'react'
import { UIComponent } from '../../../flexicious'

const AdminCheckBoxRenderer = props => {
	const data = props.row.getData()

	const changeData = () =>{
		if(data.activeFlag === 0){
			data.activeFlag = 1
		}else{
			data.activeFlag = 0
		}
		props.cell.refreshCell()
	}

	return (
		<div >      
			<Checkbox
			id="activeChkBox"
			disabled={!data.edit}
			checked={
				(data.activeFlag === 1)?true:false
			}
			onClick={changeData}
			 />
		</div>
	)
}

class EditorWrapper extends UIComponent {
	render() {
		const cell = this.cell
		const cellProps = {
			cell: cell,
			row: cell.rowInfo,
			column: cell._column,
			level: cell.level,
			grid: cell.level.grid
		}
		this.children = [<AdminCheckBoxRenderer {...cellProps} />]
		return super.render()
	}
}
AdminCheckBoxRenderer.editorWrapper = EditorWrapper
export default AdminCheckBoxRenderer
