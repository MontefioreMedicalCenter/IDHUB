import React from 'react';
import { DateComboBox, DateRangePicker,  DateRange, ToolbarAction, Constants, UIUtils } from '../../../flexicious';
// import DateRangePicker from '../DateRangePicker';

export default class CustomDateComboBox extends DateComboBox {
    constructor(props) {
        super(props);
        this.setDateRangeOptions([ 
            DateRange.DATE_RANGE_LAST_24_HOURS,
            DateRange.DATE_RANGE_LAST_7_DAYS,
            DateRange.DATE_RANGE_THISWEEK,
            DateRange.DATE_RANGE_THISMONTH,
            DateRange.DATE_RANGE_THISQUARTER,
            DateRange.DATE_RANGE_THISYEAR, 
            DateRange.DATE_RANGE_CUSTOM
        ]);
        this.dateFormatString = "LLLL dd, yyyy";
    }

    onClick(e) {
        const domTarget = (e.triggerEvent.currentTarget || e.triggerEvent.srcElement);
        const si = this.getDataProvider()[this.domElement.selectedIndex];
        if (si && (si[this.dataField] === DateRange.DATE_RANGE_CUSTOM)) {
            if (e.localX > domTarget.offsetWidth - DateComboBox.DROPDOWN_BUTTON_WIDTH) return;
            
            const actions = [ToolbarAction.create("OK", this.onDatePicker, true),
            ToolbarAction.create(Constants.MCS_BTN_CANCEL_LABEL, this.onDatePickerCancel.bind(this), true),
            ];

            this.popup = <DateRangePicker combo={this} grid={this.grid} dateFormatString={this.dateFormatString} />
            this.popup = UIUtils.addPopUp(this.popup, this.domElement, true, null, "Choose a Date Range", actions);
            this.grid.addPopup(this.popup);
            e.triggerEvent.preventDefault();
            this.domElement.blur();
        }
    }
}