import AdminEvent from "./AdminEvent.ts";

	export default class AdminEditEvent extends AdminEvent
	{
		public static EDIT:string = "edit";
		public static SAVE:string = "save"
		public static DELETE:string = "delete";
		public static GET:string="get"
		public static FILL:string="fill"	
		public static REFILL:string="refill"
		public static ERR:string="err"	
		private _eventObject:Object;
		private _errMsg:string;
		
		constructor(type:string, val:Object = null)
		{
			super(type);
			this._eventObject = val;
		}
		
		public set eventObject(value:Object){
			this._eventObject = value;
		}
		public get eventObject():Object{
			return this._eventObject;
		}
		
		public set errMsg(value:string){
			this._errMsg = value;
		}
		public get errMsg():string{
			return this._errMsg;
		}
		
	}
