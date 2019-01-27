import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnyAction } from 'redux'
import {
  loadIndustriesPage,
  loadIndustryPage,
  loadMoreIndustries
} from '../actions'
import { Loader, SquareGrid, TeaserTile, VariedGrid } from '../components'

interface IAppState {
  result: {
    industries: []
  }
  entities: {
    industries: {}
  }
  cursors: {
    industries: {
      nextCursor: number
    }
  }
}

interface IImage {
  id: number
  dateStored?: Date
  originalUrl?: string
  storageBucket?: string
  storageKey?: string
  storagePrefix?: string
  storageProvider?: string
  storageUrl?: string
}

interface IIndustry {
  id: number
  name: string
  companies: number
  images: number
  primaryImage?: IImage
}

interface IIndustriesContainerProps {
  industries: IIndustry[]
  loadIndustriesPage: any
  loadMoreIndustries: any
  nextCursor?: number
}

class Industries extends React.Component<IIndustriesContainerProps, {}> {
  constructor(props: IIndustriesContainerProps) {
    super(props)
  }

  public componentDidMount = () => {
    this.props.loadIndustriesPage()
  }

  public loadMoreIndustries = () => {
    if (this.props.nextCursor) {
      // Simulate a delay for testing loader
      // setTimeout(
      //   () => this.props.loadMoreIndustries(this.props.nextCursor),
      //   2000
      // )
      this.props.loadMoreIndustries(this.props.nextCursor)
    }
  }

  public render() {
    const { industries, nextCursor } = this.props
    console.log(this.props)
    return (
      <>
        <h4>Industries</h4>
        {industries.length ? (
          <InfiniteScroll
            loadMore={this.loadMoreIndustries}
            hasMore={nextCursor !== undefined && nextCursor > 0}
            loader={<Loader key={0} />}
          >
            <SquareGrid>{industries.map(renderIndustryTile)}</SquareGrid>
          </InfiniteScroll>
        ) : (
          console.log('no industr ies loaded')
        )}
      </>
    )
  }
}

const sortByCompaniesCount = (a: IIndustry, b: IIndustry) =>
  a.companies > b.companies ? -1 : a.companies < b.companies ? 1 : 0

const renderIndustryTile = (industry: IIndustry, index: number) => (
  <Link key={industry.id} to={`/industries/${industry.id}`}>
    <TeaserTile
      backgroundImage={
        industry.primaryImage ? industry.primaryImage.originalUrl : undefined
      }
      fade={index > 20}
    >
      {industry.name}
    </TeaserTile>
  </Link>
)

const mapStateToProps = (state: IAppState) => {
  console.log(state)
  const industries =
    state.entities.industries && state.result.industries
      ? state.result.industries.map(i => state.entities.industries[i])
      : []
  const cursorState = state.cursors.industries
    ? { ...state.cursors.industries }
    : {}
  return {
    ...cursorState,
    industries
  }
}

export default connect(
  mapStateToProps,
  {
    loadIndustriesPage,
    loadMoreIndustries
  }
)(Industries)
