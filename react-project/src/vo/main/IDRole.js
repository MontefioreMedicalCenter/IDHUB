import IDRoleBase from './IDRoleBase'
export default class IDRole extends IDRoleBase {
	get edit() {
		return this._edit
	}
	set edit(value) {
		this._edit = value
	}
}
