import React from 'react'
import { css } from 'emotion'
import { Grid, Item } from 'semantic-ui-react'

const WizardHeader = ({ worstCase, icon, name, bestCase }) => (
  <Grid columns={3}>
    <Grid.Column
      textAlign="right"
      verticalAlign="middle"
      className={worstCaseText}
    >
      {worstCase}
    </Grid.Column>
    <Grid.Column>
      <Item className={missionItem}>
        <Item.Image src={icon} size="small" />
        <Item.Content className={iconContent}>
          <Item.Header>{name}</Item.Header>
        </Item.Content>
      </Item>
    </Grid.Column>
    <Grid.Column verticalAlign="middle" className={bestCaseText}>
      {bestCase}
    </Grid.Column>
  </Grid>
)

export default WizardHeader

// #region styles
const worstCaseText = css`
  border-right: 5px solid red;
  font-size: 1.2em;
  padding-right: 1em;
`

const bestCaseText = css`
  border-left: 5px solid green;
  font-size: 1.2em;
  padding-left: 1em;
`

const missionItem = css`
  text-align: center;
`

const iconContent = css`
  font-size: 1.4em;
  font-weight: 600;
  text-align: center;
`
// #endregion
