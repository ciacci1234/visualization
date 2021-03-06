import React, { Component } from 'react'
import { connect } from 'react-redux'

/**
 * StatsPanel displays statistics for the
 * currently selected district
 */
@connect(state => {
  const { activeDistrict, branch } = state.mapControllerReducer
  let stats

  if (activeDistrict) {
    const districtId = `${branch}_${activeDistrict.properties.GEOID.substring(2)}`
    stats = state.mapDataReducer.stats[districtId]
  }

  return { activeDistrict, stats }
})
class StatsPanel extends Component {
  districtStats () {
    if (this.props.stats) {
      const district = this.props.activeDistrict
      const { stats } = this.props
      return (
        <div className='statsPanel-ResultsDiv'>
          <div>
            <h2 className='resultDistrictHeader'>{stats.District}&#039;s Election Results</h2>

            <dl>
              <dt><span className='spanUnderline'>Compactness</span></dt>
              <dd><span className='spanItalics'>{district.properties.Compactness}</span></dd>
            </dl>

            <div className='resultSpacer' />

            <div className='electionResultsOuterDiv'>
              {stats.Candidates.map(candidate =>
                <div key={candidate.CandidateName} className='electionResultsInnerDiv'>
                  <h4>{candidate.CandidateName}</h4>
                  <dl>
                    <dt>Party: {candidate.PartyName}</dt>
                    <dd><div className='resultSpacer' /></dd>
                    <dt><span className='spanUnderline'>Percentage of Vote</span></dt>
                    <dd><span className='spanItalics'>{candidate.Percentage} %</span></dd>
                  </dl>
                </div>
          )}
            </div>
          </div></div>
      )
    } else {
      return (
        <span>Select a district to see more information about that district.</span>
      )
    }
  }

  render () {
    return (
      <div id='stats'>
        {this.districtStats()}
      </div>
    )
  }
}

export default StatsPanel
