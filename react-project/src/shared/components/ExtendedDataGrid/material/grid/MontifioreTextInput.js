/* eslint-disable react/jsx-key */
import {
	TextInput,
	Constants,
    UIUtils
} from '../../../../../flexicious'

export default class MontifioreTextinput extends TextInput {
	componentDidMountCustom() {
        var txtBox = this.getTextBox();
        if (this._valuePending) {
            this.setValue(this._valuePending);
            this._valuePending = "";
        }
        if (this._focusPending) {
            this.focus();
            this._focusPending = "";
        }
        UIUtils.addDomEventListener(this, txtBox, Constants.EVENT_KEY_UP, this.setIconVisible);
        this.addEventListener(this, Constants.EVENT_KEY_UP, function (e) {
            // const str = String.fromCharCode(e.keyCode);
            // if ((str >= '0' && str <= '9') || (str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z') || e.keyCode == Constants.KEYBOARD_DELETE || e.keyCode == Constants.KEYBOARD_BACKSPACE) {
            //     this.dispatchEvent(new flexiciousNmsp.BaseEvent(Constants.EVENT_VALUE_COMMIT));
            // }
        });//so delay change is initialized
        this.addEventListener(this, Constants.EVENT_KEY_DOWN, function (e) {
            this.textBoxValue = this.getTextBox().value;
            const str = String.fromCharCode(e.keyCode);
            if ((str >= '0' && str <= '9') || (str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z')) {
                this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent(Constants.EVENT_CHANGE));
            }
        });//some browsers do not dispatch change on keydown.


        this.addEventListener(this, "delayedChange", this.onTextInputDelayedChange);
        this.addEventListener(this, Constants.EVENT_FOCUS_IN, this.onFocusIn);
        this.addEventListener(this, Constants.EVENT_FOCUS_OUT, this.onFocusOut);
        this.addEventListener(this, Constants.EVENT_KEY_DOWN, this.keyDownHandler);
        this.addEventListener(this, Constants.EVENT_KEY_UP, this.keyUpHandler);
        this.addEventListener(this, Constants.EVENT_KEY_PRESS, this.validate);

        // const txtBox = this.getTextBox();
        // UIUtils.addDomEventListener(this, txtBox, Constants.EVENT_KEY_UP, this.setIconVisible);


        // if (this.enableAutoComplete) {
        //     if (!this.autoCompleteOptions) this.autoCompleteOptions = {};
        //     this.autoCompleteOptions.autoCompleteSource = this.autoCompleteSource;
        //     UIUtils.adapter.setupAutoComplete(txtBox, this.autoCompleteOptions);
        // }

        const insideIconImg = this.getInsideIcon();
        const txt = this.getTextBox();
        const outsideIconImg = this.getInsideIcon();



        this.sizeComponents();




        UIUtils.addDomEventListener(this, txt, Constants.EVENT_KEY_UP, this.setIconVisible);

        if (this.getStyle("insideIcon")) {
            UIUtils.addDomEventListener(this, insideIconImg, Constants.EVENT_CLICK, this.onInsideIcon);
            UIUtils.addDomEventListener(this, insideIconImg, Constants.EVENT_LOAD, this.onInsideIconLoad);
        }

        if (this.getStyle("outsideIcon")) {
            UIUtils.addDomEventListener(this, outsideIconImg, Constants.EVENT_CLICK, this.onOutsideIcon);
            UIUtils.addDomEventListener(this, outsideIconImg, Constants.EVENT_LOAD, this.onOutsideIconLoad);
        }

        if (this.inputMask) {
            if (!this.inputMaskOptions) this.inputMaskOptions = {};
            this.inputMaskOptions.mask = this.inputMask;
            UIUtils.setupInputMask(txt, this.inputMaskOptions);
        }
        if (this.watermark) {
            if (!this.watermarkOptions) this.watermarkOptions = {};
            this.watermarkOptions.watermark = this.watermark;
            this.watermarkOptions.watermarkStyle = this.watermarkStyle;
            UIUtils.setupWaterMark(txt, this.watermarkOptions);
        }
        if (this.maxLength > 0) {
            this.setMaxLength(this.maxLength);
        }
    }
}
