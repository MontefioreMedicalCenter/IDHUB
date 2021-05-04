import { Checkbox } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { UIComponent } from '../../../../flexicious'
import { camelizeKeys } from '../../../../shared/utils'
import IdUser from '../../../../vo/main/IdUser'
import IdUserRoleMap from '../../../../vo/main/IdUserRoleMap'
import IdUserRoleMapPK from '../../../../vo/main/IdUserRoleMapPK'

const UsrRole = props => {
	const [roleChkbx, setRoleChkbx] = useState(false)
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		setData(props.row.getData())
		// eslint-disable-next-line
	}, [])

	const setData = value => {
		var headerTxt = props.column.getHeaderText()

		if (headerTxt === 'Admin' || headerTxt === 'SDEmailer') {
			// roleChkbx.enabled = false
			setDisabled(true)
		}
		var lst
		if (value.edit) lst = value.addMaps
		else lst = value.roleMap
		for (var i in lst) {
			var isSelected = false
			lst[i].id.roleId === headerTxt && value['userId'] === lst[i].id.userId
				? (isSelected = true)
				: (isSelected = false)
			setRoleChkbx(isSelected)
			if (isSelected === true) {
				break
			}
		}
	}

	const chkbx_handler = event => {
		// TODO Auto-generated method stub
		var tgt = event.target
		// var t = event.target.parent.parent
		const idUser = new IdUser()
		// var usr:IdUser=t.data as IdUser
		var usr = idUser.fromJson( camelizeKeys(props.row.getData()) )
		// var p:Object=t.parent
		// var cp:FlexDataGridDataCell=t.parent as FlexDataGridDataCell
		var ht = props.column.getHeaderText()
		// var pg=props.grid
		var caps = usr.roleMap
		var adds = usr.addMaps
		var rems = usr.remMaps
		var dif = caps.length + adds.length - rems.length
		//Alert.show("dif is: [" + dif + "].")
		if(usr.add&&(usr.userId === null || usr.userId.length <= 0)){
			alert("Please type in Capability first !")
		}else if (!usr.edit){
			alert("Please Click the Edit icon first !")
			//var grid:FlexDataGrid=pg as FlexDataGrid
			if(tgt.checked) setRoleChkbx(false)
			else setRoleChkbx(true)
		}else{
			var chbx=event.target
			if((dif/*caps.length*/<1)||(!chbx.checked)){
				//var chbx:CheckBox=event.target as CheckBox
				var rlcapm=new IdUserRoleMap()
				var rlcapk=new IdUserRoleMapPK()
				rlcapk.userId=usr.userId
				rlcapk.roleId=ht
				rlcapm.id=rlcapk
				// var edin=exists(rlcapk, caps)
				if(chbx.checked===true){
					usr.addEntry(rlcapm)
				}else{
					usr.removeEntry(rlcapm)
				}
					//Alert.show("UsrRole.mxml: usr: addMaps: " + usr.addMaps.length + ", remMaps: " + usr.remMaps.length)
			}else{
				alert("One user should have only ONE role !")
				// var grid=pg 
				if(tgt.selected) setRoleChkbx(false)
					//else tgt.selected=true

			}
		}
	}

	// const exists =(pk, caps) => {
	// 	var ex=-1
	// 	for(var i=0;i<caps.length;i++){
	// 		const idUserRoleMap =  new IdUserRoleMap()
	// 		var one = idUserRoleMap.fromJson(camelizeKeys(caps.getItemAt(i)))
	// 		if (pk.userId===one.id.userId && pk.roleId===one.id.roleId){
	// 			ex=i
	// 			break	
	// 		}
	// 	}
	// 	return ex
	// }

	return (
		<div>
			<Checkbox
				id="UsrRoleChkBox"
				onClick={chkbx_handler}
				checked={roleChkbx}
				disabled={disabled}
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
		this.children = [<UsrRole {...cellProps} />]
		return super.render()
	}
}
UsrRole.editorWrapper = EditorWrapper
export default UsrRole
