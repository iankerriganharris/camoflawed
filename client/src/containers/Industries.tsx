import React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { loadIndustriesPage } from '../actions'
import { GridList, Tile } from '../components'

interface IAppState {
  result: {
    industries: []
  }
  entities: {
    industries: {}
  }
}

interface IIndustry {
  id: number
  name: string
}

interface IIndustriesContainerProps {
  industries: IIndustry[]
  loadIndustriesPage: any
}

class Industries extends React.Component<IIndustriesContainerProps, {}> {
  constructor(props: IIndustriesContainerProps) {
    super(props)
  }

  public componentDidMount = () => {
    this.props.loadIndustriesPage()
  }

  public render() {
    const { industries } = this.props
    console.log(this.props)
    return (
      <>
        <h4>Industries</h4>
        {industries.length ? (
          <GridList items={industries} renderItem={renderIndustryTile} />
        ) : (
          console.log('no industries loaded')
        )}
      </>
    )
  }
}

const renderIndustryTile = (industry: IIndustry) => (
  <Tile key={industry.id}>{industry.name}</Tile>
)

const mapStateToProps = (state: IAppState) => {
  const industries =
    state.entities.industries && state.result.industries
      ? state.result.industries.map(i => state.entities.industries[i])
      : []
  return {
    industries
  }
}

export default connect(
  mapStateToProps,
  {
    loadIndustriesPage
  }
)(Industries)
