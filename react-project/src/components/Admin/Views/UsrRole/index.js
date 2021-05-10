import { Checkbox } from '@material-ui/core'
import React from 'react'
import IdUserRoleMap from '../../../../vo/main/IdUserRoleMap'
import IdUserRoleMapPK from '../../../../vo/main/IdUserRoleMapPK'

class UsrRole extends React.Component {
	constructor(props) {
		super(props)
		this.chkbx_handler = this.chkbx_handler.bind(this)
		this.state = this.initializeFromProps(props.row.getData())
	}

	// componentWillReceiveProps(nextProps) {
	// 	this.setState(this.initializeFromProps(nextProps.row.getData()))
	// }

	initializeFromProps = value => {
		var headerTxt = this.props.column.getHeaderText()
		let roleChkbx = false
		let disabled = false

		if (headerTxt === 'Admin' || headerTxt === 'SDEmailer') {
			disabled = true
		}
		var lst
		if (value.edit) lst = value.addMaps
		else lst = value.roleMap
		for (var i in lst) {
			var isSelected = false
			lst[i].id.roleId === headerTxt && value['userId'] === lst[i].id.userId
				? (isSelected = true)
				: (isSelected = false)
			roleChkbx = isSelected
			if (isSelected === true) {
				break
			}
		}

		return {
			roleChkbx: roleChkbx,
			disabled: disabled
		}
	}

	chkbx_handler(event) {
		// TODO Auto-generated method stub
		var tgt = event.target
		// var t = event.target.parent.parent
		// var usr:IdUser=t.data as IdUser
		var usr = this.props.row.getData()
		// var p:Object=t.parent
		// var cp:FlexDataGridDataCell=t.parent as FlexDataGridDataCell
		var ht = this.props.column.getHeaderText()
		// var pg=props.grid
		var caps = usr.roleMap
		var adds = usr.addMaps
		var rems = usr.remMaps
		var dif = caps.length + adds.length - rems.length
		//Alert.show("dif is: [" + dif + "].")
		if (usr.add && (usr.userId === null || usr.userId.length <= 0)) {
			alert('Please type in Capability first !')
		} else if (!usr.edit) {
			alert('Please Click the Edit icon first !')
			//var grid:FlexDataGrid=pg as FlexDataGrid
			if (tgt.checked) this.setState({ roleChkbx: false })
			else this.setState({ roleChkbx: true })
		} else {
			var chbx = event.target
			if (dif /*caps.length*/ < 1 || !chbx.checked) {
				//var chbx:CheckBox=event.target as CheckBox
				var rlcapm = new IdUserRoleMap()
				var rlcapk = new IdUserRoleMapPK()
				rlcapk.userId = usr.userId
				rlcapk.roleId = ht
				rlcapm.id = rlcapk
				// var edin=exists(rlcapk, caps)
				if (chbx.checked === true) {
					usr.addEntry(rlcapm)
				} else {
					usr.removeEntry(rlcapm)
				}
				//Alert.show("UsrRole.mxml: usr: addMaps: " + usr.addMaps.length + ", remMaps: " + usr.remMaps.length)
			} else {
				alert('One user should have only ONE role !')
				// var grid=pg
				if (tgt.selected) this.setState({ roleChkbx: false })
				//else tgt.selected=true
			}
		}
		this.setState(this.initializeFromProps(usr))
	}
	render = () => (
		<div
			style={{
				width: '100%',
				height: '100%',
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'center'
			}}>
			<Checkbox
				id="UsrRoleChkBox"
				onClick={this.chkbx_handler}
				checked={this.state.roleChkbx}
				disabled={this.state.disabled}
			/>
		</div>
	)
}

export default UsrRole
