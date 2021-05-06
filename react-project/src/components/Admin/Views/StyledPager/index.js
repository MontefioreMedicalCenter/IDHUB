import React from 'react'
import './styledPager.scss'
import { Button } from '@material-ui/core'
import { PagerControl } from '../../../../flexicious'
import Add from '../../../../assets/images/add.png'

export default class StyledPagerRenderer extends PagerControl {

	onAddClick = () => {
        this.grid.addClick()
    }

	render() {
		return (
			<div className="pager-main-container">
				<Button onClick={this.onAddClick}>
					<img src={Add} alt="Add" />
					<span className="pager-add-txt">Add</span>
				</Button>
				<span className="pager-label">Manage Users</span>
				<div />
			</div>
		)
	}
}
