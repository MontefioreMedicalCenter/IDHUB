export default class AdminMediator{
	
}
	// export default class AdminMediator extends Mediator
	// {
	// 	/*[Inject]*/
	// 	public view:Admin;
	// 	/*[Inject]*/
	// 	public adminService:AdminService


	// 	private log:ILogger=this.Log.getLogger("adminMediator");

	// 	/*override*/ public onRegister():void
	// 	{

	// 		this.mapListener(this.view.viewStackAdmin, Event.CHANGE, this.refreshTab, Event);
	// 		this.mapListener(this.eventDispatcher, AdminEditEvent.ERR, this.errMsg, AdminEditEvent);
	// 		this.mapListener(this.eventDispatcher, this.MainEvent.ADMIN, this.startAdmin, this.MainEvent);
	// 	}




	// 	private errMsg(event:AdminEditEvent):void{
	// 		Alert.show("Error when saving the change. Please check the type-in value and make sure it is Correct !")	
	// 	}


	// 	private startAdmin(event:MainEvent):void{

	// 		this.dispatch(new ManageUserEvent(ManageUserEvent.USER_START));
	// 	}
	// 	private refreshTab(event:Event):void
	// 	{

	// 		var idStr:string=(<Object>this.view.viewStackAdmin.getChildAt(this.view.viewStackAdmin.selectedIndex) ).id
	// 		/*if (idStr == "usr")
	// 		{
	// 			dispatch(new AdminEvent(AdminEvent.GET_USERS));
	// 		}*/
	// 		if (idStr == "role")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_ALL_ROLES));
	// 		}
	// 		if (idStr == "dept")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "ins")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "rc")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "rt")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "rec")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "sub")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "sd")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "su")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_DEPT));
	// 		}
	// 		if (idStr == "title")
	// 		{
	// 			this.dispatch(new AdminEvent(AdminEvent.GET_TITLE));
	// 		}
	// 	}

	// }



