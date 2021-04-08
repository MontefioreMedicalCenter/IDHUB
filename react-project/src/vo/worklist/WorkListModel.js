import IdCampusCode from '../admin/IdCampusCode'
import IdDepartment from '../admin/IdDepartment'
import IdEmployeeSubgroup from '../admin/IdEmployeeSubgroup'
import IdTitle from '../admin/IdTitle'
import ArrayCollection from '../ArrayCollection'
import VoBase from '../VoBase'

export default class WorkListModel extends VoBase {
	constructor(userId = null, password = null) {
		super()
	}
	get lookupLists() {
		return this._lookupLists
	}
	set lookupLists(value) {
		this._lookupLists = value
	}

	getComplexProperty(key) {
		if (key === 'lookupLists') {
			return new LookupList()
		}
		return super.getComplexProperty(key)
	}
}
class LookupList extends VoBase {
	constructor(userId = null, password = null) {
		super()
		this.titleList = new ArrayCollection()
		this.employeeSubgroupList = new ArrayCollection()
		this.departmentList = new ArrayCollection()
		this.campusCodeList = new ArrayCollection()

		this.campusCodeNames = new ArrayCollection()
		this.departmentNames = new ArrayCollection()
		this.titleNames = new ArrayCollection()
		this.employeeSubgroupNames = new ArrayCollection()
	}
	getComplexProperty(key) {
		if (key === 'titleList') {
			return new IdTitle()
		} else if (key === 'employeeSubgroupList') {
			return new IdEmployeeSubgroup()
		} else if (key === 'departmentList') {
			return new IdDepartment()
		} else if (key === 'campusCodeList') {
			return new IdCampusCode()
		}
		return super.getComplexProperty(key)
	}
}
