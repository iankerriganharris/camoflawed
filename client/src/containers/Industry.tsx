import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { loadIndustryPage } from '../actions'
import { GridList, Tile } from '../components'

interface IAppState {
  result: {
    industries: []
  }
  entities: {
    industries: {
      [id: number]: IIndustry
    }
    companies: {
      [id: number]: any
    }
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
  companies: []
  images: number
  primaryImage?: IImage
}

interface ICompany {
  id: number
  name: string
  ticker: string
  website: string
  primaryImage?: IImage
}

interface IIndustryContainerProps extends RouteComponentProps<{ id: string }> {
  id: number
  name: string
  companies: [any]
  images: number
  primaryImage?: IImage
  loadIndustryPage: any
}

class Industry extends React.Component<IIndustryContainerProps, {}> {
  constructor(props: IIndustryContainerProps) {
    super(props)
  }

  public componentDidMount = () => {
    this.props.loadIndustryPage(this.props.match.params.id)
  }

  public render() {
    const { name, companies } = this.props
    return (
      <>
        <h4>{name}</h4>
        {companies && companies.length ? (
          <GridList items={companies} renderItem={renderCompanyTile} />
        ) : (
          console.log('no companies for industry')
        )}
      </>
    )
  }
}

const renderCompanyTile = (company: ICompany) => (
  <Link key={company.id} to={`/companies/${company.id}`}>
    <Tile
      backgroundImage={
        company.primaryImage ? company.primaryImage.originalUrl : undefined
      }
    >
      {company.name}
    </Tile>
  </Link>
)

const mapStateToProps = (
  state: IAppState,
  ownProps: IIndustryContainerProps
) => {
  console.log(state)
  const paramAsNum = Number(ownProps.match.params.id)
  console.log(paramAsNum)
  const industry =
    state.entities.industries && paramAsNum
      ? state.entities.industries[paramAsNum]
      : undefined

  const mappedCompanies =
    industry &&
    industry.companies &&
    industry.companies.length &&
    state.entities.companies
      ? industry.companies.map(i => state.entities.companies[i])
      : undefined

  if (industry && mappedCompanies) {
    const { companies, ...industryAsProp } = industry
    return {
      ...industryAsProp,
      companies: mappedCompanies
    }
  } else {
    return {}
  }
}

export default connect(
  mapStateToProps,
  {
    loadIndustryPage
  }
)(Industry)
