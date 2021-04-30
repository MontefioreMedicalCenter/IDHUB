import BaseEvent from "./BaseEvent.ts";

export default class FileEditorEvent extends BaseEvent {
	public static VIEW_FILE: string = 'view';
	public static FILE_CONTENT: string = 'content';

	private _fileId: number;
	//private var _file:EdiFileBase;

	constructor(type: string, file: string, bubbles: boolean = false, cancelable: boolean = false) {

		//_file=file;
		super(type);

	}


}

