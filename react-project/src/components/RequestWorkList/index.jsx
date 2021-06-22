import React, { useEffect, useState } from 'react'
import './requestWork.style.scss'
import { Paper, Tab, Tabs } from '@material-ui/core'
import CurrentRequest from './CurrentRequest'
import { useDispatch } from 'react-redux'
import { setTabValue } from '../../AppConfig/store/actions/workListSheet'

const RequestWorkList = () => {
	const [tab, setTab] = useState(0)
	const dispatch = useDispatch();

	useEffect(() => {
		handleChange(null, tab)
		// eslint-disable-next-line
	}, [])

	const handleChange = (event, value) => {
		setTab(value)
		dispatch(setTabValue(value))
	}

	return (
		<div className="requestWork-main-container">
			{/* As idiotic as this looks, this is the only way to ask chrome not to autofill random text fields on the page! */}
			<div style={{ position: "fixed", top: "0px" }}>
				<input type="text" name="prevent_autofill" id="prevent_autofill" value="" style={{ display: "none" }} />
				<input type="password" name="password_fake" id="password_fake" value="" style={{ display: "none" }} />
				<input type="password" name="password" id="password" value="" style={{ height: "1px", width: "1px" }} />
			</div>
			<div className="changetabs">
				<Paper>
					<Tabs
						value={tab}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered>
						<Tab style={{ margin: "0px" }} label="Current Request" />
						<Tab style={{ margin: "0px" }} label="Search Request" />
					</Tabs>
				</Paper>
			</div>
			<CurrentRequest tabValue={tab} />
		</div>
	)
}

export default RequestWorkList
