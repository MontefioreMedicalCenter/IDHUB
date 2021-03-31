import moment from "moment";
import { DateFormatter, UIUtils } from "../../flexicious";

const MontefioreUtils = () => { };
const formatter = (item, dataField, formatString) => {
    const dateFormatter = new DateFormatter();

    if (item[dataField] instanceof Date) {
        return dateFormatter.format(item.Start_Date);
    } else if (typeof item[dataField] === "string") {
        let dateStr = item[dataField];
        if (dateStr.length > 10) {
            dateStr = dateStr.slice(0, 10);
        }

        if (dateStr.includes("-")) {
            const newStrArray = dateStr.split("-");
            dateStr = `${newStrArray[1]}/${newStrArray[2]}/${newStrArray[0]}`;
        }
        return dateFormatter.format(moment(dateStr, formatString).toDate());
    } else {
        return UIUtils.toString(item[dataField]);
    }
}

MontefioreUtils.dateFormatter2 = (item, { dataField }) => {
    return formatter(item, dataField, "MMM D, YYYY")
};
MontefioreUtils.dateFormatter3 = (item, { dataField }) => {
    return formatter(item, dataField, "MM/DD/YY")
}
MontefioreUtils.globalDateFormatter = (item, { dataField }) => {
    return formatter(item, dataField, "MM/DD/YY K:NN A")
}

export default MontefioreUtils;