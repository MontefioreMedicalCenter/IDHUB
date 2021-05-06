import { FlexDataGridEvent } from "../flexicious";

export default class BaseEvent extends FlexDataGridEvent {
    public defaultPrevented:boolean;
    public triggerEvent:any;
    constructor(type, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable)
        
        /**
         * Has the default for this event been prevented
         * @type {Boolean}
         * @property defaultPrevented
         * @default false
         */
        this.defaultPrevented = false;
    }

    /**
     * Has the default for this event been prevented. This is true if the preventDefault method has been called.
     * @return {Boolean}
     * @method isDefaultPrevented
     */
    isDefaultPrevented() {
        return this.defaultPrevented;
    }

    /**
     * If this event is cancelable, then the default prevented flag is set to true.
     * @return {Boolean}
     * @method preventDefault
     */
    preventDefault() {
        this.defaultPrevented = true;
        if(this.triggerEvent && this.triggerEvent!=this){
            this.triggerEvent.preventDefault();
        }

    }

    /**
     * If this event is cancelable, then the default prevented flag is set to true.
     * @return {Boolean}
     * @method stopPropagation
     */
    stopPropagation() {
        if(this.triggerEvent && this.triggerEvent!=this){
            this.triggerEvent.stopPropagation();
        }

    }
}
