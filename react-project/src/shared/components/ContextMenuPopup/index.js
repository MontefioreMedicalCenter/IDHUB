// @flow
import React from 'react'
import { Paper, List, ListItem } from '@material-ui/core'
import styles from './styles.scss'

type Props = {
  width: *,
  handleOnProcessAction: *,
  SelectionMode: string,
}

const copyCell = {
  primaryText: 'Copy Cell',
  value: 'copyCell',
}

const copyRow = {
  primaryText: 'Copy Row',
  value: 'copyRow',
}

const copyTable = {
  primaryText: 'Copy All Rows',
  value: 'copyTable',
}

const copySelectedCells = {
  primaryText: 'Copy Selected Cells',
  value: 'copySelectedCells',
}

const copySelectedRecords = {
  primaryText: 'Copy Selected Rows',
  value: 'copySelectedRecords',
}

class ContextPoupContent extends React.PureComponent<Props> {
  render() {
    const { width, handleOnProcessAction, SelectionMode } = this.props

    return (
      <Paper className={styles.paper} width={width}>
        <List>
          <ListItem
            button
            className={styles.root}
            onClick={() => handleOnProcessAction(copyCell.value)}
            value={copyCell.value}
          >
            {copyCell.primaryText}
          </ListItem>
          <ListItem
            button
            className={styles.root}
            onClick={() => handleOnProcessAction(copyRow.value)}
            value={copyRow.value}
          >
            {copyRow.primaryText}
          </ListItem>
          <ListItem
            button
            className={styles.root}
            onClick={() => handleOnProcessAction(copyTable.value)}
            value={copyTable.value}
          >
            {copyTable.primaryText}
          </ListItem>
          {SelectionMode === 'multipleCells' ? (
            <ListItem
              button
              className={styles.root}
              onClick={() => handleOnProcessAction(copySelectedCells.value)}
              value={copySelectedCells.value}
            >
              {copySelectedCells.primaryText}
            </ListItem>
          ) : (
            <ListItem
              button
              className={styles.root}
              onClick={() => handleOnProcessAction(copySelectedRecords.value)}
              value={copySelectedRecords.value}
            >
              {copySelectedRecords.primaryText}
            </ListItem>
          )}
        </List>
      </Paper>
    )
  }
}

export default ContextPoupContent
