import React, { useState } from 'react'
import './requestWork.style.scss'
import { Paper, Tab, Tabs } from '@material-ui/core'
import CurrentRequest from './CurrentRequest'
import { useDispatch } from 'react-redux'
import { setTabValue } from '../../AppConfig/store/actions/workListSheet'

const RequestWorkList = () => {
	const [tab, setTab] = useState(0)
	const dispatch = useDispatch();

	const handleChange = (event, value) => {
		setTab(value)
		dispatch(setTabValue(value))
	}

	return (
		<div className="requestWork-main-container">
			<div className="changetabs">
				<Paper>
					<Tabs
						value={tab}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered>
						<Tab style={{margin: "0px"}} label="Current Request" />
						<Tab style={{margin: "0px"}} label="Search Request" />
					</Tabs>
				</Paper>
			</div>
			 <CurrentRequest tabValue={tab} />
		</div>
	)
}

export default RequestWorkList
