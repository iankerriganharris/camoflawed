import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { loadIndustryPage } from '../actions'
import { SquareGrid, TeaserTile } from '../components'
import { selectIndustryByIdWithRelations } from '../reducers/selectors'
import { IAppState, ICompany, IImage, IIndustry } from '../typings'

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
          <SquareGrid>{companies.map(renderCompanyTile)}</SquareGrid>
        ) : (
          console.log('no companies for industry')
        )}
      </>
    )
  }
}

const renderCompanyTile = (company: ICompany) => (
  <Link key={company.id} to={`/companies/${company.id}`}>
    <TeaserTile
      backgroundImage={
        company.primaryImage ? company.primaryImage.originalUrl : undefined
      }
    >
      {company.name}
    </TeaserTile>
  </Link>
)

const mapStateToProps = (
  state: IAppState,
  ownProps: IIndustryContainerProps
) => {
  const paramAsNum = Number(ownProps.match.params.id)
  const industry = selectIndustryByIdWithRelations(state, paramAsNum)
  console.log(industry)
  return industry ? { ...industry } : {}
}

export default connect(
  mapStateToProps,
  {
    loadIndustryPage
  }
)(Industry)
