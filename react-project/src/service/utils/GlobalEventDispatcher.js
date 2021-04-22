import { EventDispatcher } from '../../flexicious'

export default class GlobalEventDispatcher extends EventDispatcher {
	/*
    constructor(arg1, arg2, arg3) {
        super(arg1, arg2, arg3);
    }
    */

	getClassNames = () => ['GlobalEventDispatcher', ...super.getClassNames()]
}

GlobalEventDispatcher.prototype.typeName = GlobalEventDispatcher.typeName =
	'GlobalEventDispatcher'

GlobalEventDispatcher._instance = null

GlobalEventDispatcher.instance = () => {
	if (!GlobalEventDispatcher._instance)
		GlobalEventDispatcher._instance = new GlobalEventDispatcher()

	return GlobalEventDispatcher._instance
}
