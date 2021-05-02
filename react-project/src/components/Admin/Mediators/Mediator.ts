import GlobalEventDispatcher from "../../../service/utils/GlobalEventDispatcher";
import { toast } from 'react-toastify'

export default class Mediator {
    public eventDispatcher = GlobalEventDispatcher.instance();
    public mappedListeners = [];
    public dispatch(evt):void{
        this.eventDispatcher.dispatchEvent(evt);
    }
	public mapListener(dispatcher, evt, listener, type){
        if(!dispatcher){
            toast.warning('Dispatcher cannot be empty!!' + evt);
        } else{
            this.mappedListeners.push([dispatcher,evt,listener]);
            dispatcher.addEventListener(this, evt, listener);    
        }
    }
    public onUnRegister(){
        for(const wiredListener of this.mappedListeners){
            wiredListener[0].removeEventListener(wiredListener[1],wiredListener[2]);
        }
    }
}