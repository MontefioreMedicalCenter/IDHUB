/*[Bindable]*/
/*[RemoteClass(alias="org.mit.idhub.model.IdUser")]*/
import IdUserBase from './IdUserBase'
import ArrayCollection from '../ArrayCollection'
import IdUserRoleMap from './IdUserRoleMap'
export default class IdUser extends IdUserBase {
	constructor(userId = null, password = null) {
		super()
		this._adds = new ArrayCollection()
		this._rems = new ArrayCollection()
		this._addMaps = new ArrayCollection()
		this._remMaps = new ArrayCollection()
		this._fsaAdds = new ArrayCollection()
		this._fsaRems = new ArrayCollection()
		this._facilityMap = new ArrayCollection()
		this.userId = userId
		this.password = password
	}
	//For JSON deserialization
	getComplexProperty(key) {
		if (
			[
				'facilityMap',
				'adds',
				'rems',
				'addMaps',
				'remMaps',
				'fsaAdds',
				'fsaRems'
			].indexOf(key) >= 0
		) {
			return new IdUserRoleMap()
		}
		return super.getComplexProperty(key)
	}
	get password() {
		return this._password
	}
	set password(value) {
		this._password = value
	}
	get userFullName() {
		this._userFullName = this.userLastName + ', ' + this.userFirstName
		return this._userFullName
	}
	set userFullName(value) {
		this._userFullName = value
	}
	hasRole(role) {
		if (this.isAdmin() === true) return true
		var grantedRoles = this.roleMap
		for (var i in grantedRoles) {
			var userRole = grantedRoles[i]
			if (userRole.id.roleId === role && userRole.accessActiveFlag === 1)
				return true
		}
		return false
	}
	isAdmin() {
		var grantedRoles = this.roleMap
		for (var i in grantedRoles) {
			var userRole = grantedRoles[i]
			if (userRole.id.roleId === 'Admin' && userRole.accessActiveFlag === 1)
				return true
		}
		return false
	}
	get edit() {
		return this._edit
	}
	set edit(value) {
		this._edit = value
	}
	set add(value) {
		this._add = value
	}
	get add() {
		return this._add
	}
	get addMaps() {
		return this._addMaps
	}
	get remMaps() {
		return this._remMaps
	}
	set facilityMap(value) {
		this._facilityMap = value
	}
	get facilityMap() {
		return this._facilityMap
	}
	removeEntry(map) {
		var exadd = this.exists(map.id, this._addMaps)
		// if (exadd >= 0) {
			this._addMaps.removeItemAt(exadd)
		// } else {
			this._remMaps.addItem(map)
		// }
	}
	addEntry(map) {
		var exadd = this.exists(map.id, this._remMaps)
		// if (exadd >= 0) {
			this._remMaps.removeItemAt(exadd)
		// } else {
			this._addMaps.addItem(map)
		// }
	}
	exists(val, vs) {
		var exist = -1
		for (var i = 0; i < vs.length; i++) {
			var one = vs.getItemAt(i)
			if (val.userId === one.id.userId && val.roleId === one.id.roleId) {
				exist = i
				break
			}
		}
		return exist
	}
	undo() {
		this._addMaps.removeAll()
		this._remMaps.removeAll()
	}
	reshuffle() {
		//Alert.show("IdUser:reshuffle(): _addMaps: " + _addMaps.length + ", _remMaps: " + _remMaps.length)
		if (this._addMaps != null && this._addMaps.length > 0) {
			for (var i = 0; i < this._addMaps.length; i++) {
				var oneAdd = this._addMaps[i]
				//var ms:ListCollectionView=roleCapabilityMaps
				var ex = false
				for (var j = 0; j < this.roleMap.length; j++) {
					var onemp = this.roleMap[j]
					//Alert.show("IdUser:reshuffle(): check add " + onemp.id.userId + "/" + onemp.id.roleId + "v.s. " + oneAdd.id.userId + "/" + oneAdd.id.roleId)
					if (
						onemp.id.userId === oneAdd.id.userId &&
						onemp.id.roleId === oneAdd.id.roleId
					) {
						ex = true
						break
					}
					//if(!ex) _roleCapabilityMaps.addItem(oneAdd)
				}
				if (!ex) {
					this.roleMap.addItem(oneAdd)
					//Alert.show("IdUser:reshuffle(): add one role [" + oneAdd.id.roleId + "].")
				}
			}
		}
		if (this._remMaps != null && this._remMaps.length > 0) {
			for (var l = 0; l < this._remMaps.length; l++) {
				var oneRem = this._remMaps[l]
				//var ms:ListCollectionView=roleCapabilityMaps
				//var ex:Boolean=false
				for (var k = 0; k < this.roleMap.length; k++) {
					var aonemp = this.roleMap[k]
					//Alert.show("IdUser:reshuffle(): check add " + aonemp.id.userId + "/" + aonemp.id.roleId + "v.s. " + oneRem.id.userId + "/" + oneRem.id.roleId)
					if (
						aonemp.id.userId === oneRem.id.userId &&
						aonemp.id.roleId === oneRem.id.roleId
					) {
						this.roleMap.removeItemAt(k)
						//Alert.show("IdUser:reshuffle(): remove one role [" + oneAdd.id.roleId + "].")
						break
					}
				}
			}
		}
		this._addMaps.removeAll()
		this._remMaps.removeAll()
		//Alert.show("IdUser:reshuffle(): roleMap [" + (roleMap[0] as IdUserRoleMap).id.roleId + "]")
	}
	fsaRefresh() {
		//Alert.show("refreshFsa")
		if (this._fsaAdds != null && this._fsaAdds.length > 0) {
			for (var i = 0; i < this._fsaAdds.length; i++) {
				var oneAddFsa = this._fsaAdds[i]
				//var ms:ListCollectionView=roleCapabilityMaps
				var ex = false
				for (var j = 0; j < this.facilityMap.length; j++) {
					var onefsamp = this.facilityMap[j]
					if (
						onefsamp.id.userId === oneAddFsa.id.userId &&
						onefsamp.id.roleId === oneAddFsa.id.roleId
						//&&onefsamp.id.serviceAreaId==oneAddFsa.id.serviceAreaId
						/*||(onemp.serviceAreaName==oneAdd.serviceAreaName)
                ||(onemp.ufsaId==oneAdd.ufsaId)*/
					) {
						ex = true
						break
					}
					//if(!ex) _roleCapabilityMaps.addItem(oneAdd)
				}
				if (!ex) {
					//var cpAdd:RcUserFacilityMap=oneAddFsa.clone()
					this.facilityMap.addItem(oneAddFsa)
				}
			}
		}
		if (this._fsaRems != null && this._fsaRems.length > 0) {
			for (var l = 0; l < this._fsaRems.length; l++) {
				var oneRemFsa = this._fsaRems[l]
				//var ms:ListCollectionView=roleCapabilityMaps
				//var ex:Boolean=false
				for (var k = 0; k < this.facilityMap.length; k++) {
					var anofsamp = this.facilityMap[k]
					if (
						anofsamp.id.userId === oneRemFsa.id.userId &&
						anofsamp.id.roleId === oneRemFsa.id.roleId
						//&&anofsamp.id.serviceAreaId==oneRemFsa.id.serviceAreaId
						/*||(anomp.serviceAreaName==oneRem.serviceAreaName)
                ||(anomp.ufsaId==oneRem.ufsaId)*/
					) {
						this.facilityMap.removeItemAt(k)
						break
					}
				}
			}
		}
		if (this._fsaAdds != null) this._fsaAdds.removeAll()
		if (this._fsaRems != null) this._fsaRems.removeAll()
	}
}
