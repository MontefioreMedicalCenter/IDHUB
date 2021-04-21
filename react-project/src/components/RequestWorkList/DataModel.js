// @flow
// FIXME: Add correct types where FlowFixMe's have been used

export default class DataModel {
	view: Object

	constructor(view: Object) {
		/**
		 * @property
		 */
		this.view = view

		/**
		 * @deprecated
		 * @property
		 * use this.props instead of this.context.props
		 * & this.view instead of this.context
		 */
		this.context = view
	}

	get props() {
		return this.view ? this.view.props : {}
	}
}
