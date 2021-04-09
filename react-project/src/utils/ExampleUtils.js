import {
	CurrencyFormatter,
	DateFormatter,
	NumberFormatter
} from '../flexicious'
class MontefioreDateFormatter extends DateFormatter {
	format(value) {
		let result = null;
		if (value instanceof String)
			result= super.format(new Date(parseFloat(value)));
		else
			result= super.format(value);
		console.log(value + ":" + result);
		return result;
	}
}
export default class ExampleUtils {
	static get globalCurrencyFormatter() {
		if (!ExampleUtils._currencyFormatter) {
			ExampleUtils._currencyFormatter = new CurrencyFormatter()
			ExampleUtils._currencyFormatter.precision = 2
			ExampleUtils._currencyFormatter.currencySymbol = '$'
			ExampleUtils._currencyFormatter.alignSymbol = 'left'
			ExampleUtils._currencyFormatter.precision = '2'
			ExampleUtils._currencyFormatter.decimalSeparatorTo = '.'
			ExampleUtils._currencyFormatter.thousandsSeparatorTo = ','
			ExampleUtils._currencyFormatter.useThousandsSeparator = 'true'
		}
		return ExampleUtils._currencyFormatter
	}
	static get globalDateFormatter() {
		if (!ExampleUtils._dateFormatter) {
			ExampleUtils._dateFormatter = new MontefioreDateFormatter()
			//_dateFormatter.formatString="MMM. D,YYYY - H:NN A";
			ExampleUtils._dateFormatter.formatString = 'MM/DD/YY K:NN A'
		}
		return ExampleUtils._dateFormatter
	}
	static get dateFormatter2() {
		if (!ExampleUtils._dateFormatter2) {
			ExampleUtils._dateFormatter2 = new MontefioreDateFormatter()
			ExampleUtils._dateFormatter2.formatString = 'MMM D, YYYY'
		}
		return ExampleUtils._dateFormatter2
	}
	static get dateFormatter3() {
		if (!ExampleUtils._dateFormatter3) {
			ExampleUtils._dateFormatter3 = new MontefioreDateFormatter()
			ExampleUtils._dateFormatter3.formatString = 'MM/DD/YY'
		}
		return ExampleUtils._dateFormatter3
	}
	static get dateFormatter5() {
		if (!ExampleUtils._dateFormatter5) {
			ExampleUtils._dateFormatter5 = new MontefioreDateFormatter()
			ExampleUtils._dateFormatter5.formatString = 'MM/DD/YYYY'
		}
		return ExampleUtils._dateFormatter5
	}
	static get phoneFormatter1() {
		if (!ExampleUtils._phoneFormatter1) {
			ExampleUtils._phoneFormatter1 = new NumberFormatter()
			ExampleUtils._phoneFormatter1.formatString = '###-###-####'
		}
		return ExampleUtils._phoneFormatter1
	}
	static set phoneFormatter1(value) {
		ExampleUtils._phoneFormatter1 = value
	}
	static get phoneFormatter2() {
		if (!ExampleUtils._phoneFormatter2) {
			ExampleUtils._phoneFormatter2 = new NumberFormatter()
			ExampleUtils._phoneFormatter2.formatString = '###-##-####'
		}
		return ExampleUtils._phoneFormatter2
	}
	static set phoneFormatter2(value) {
		ExampleUtils._phoneFormatter2 = value
	}
}
