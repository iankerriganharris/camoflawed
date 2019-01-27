import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { loadCompanyPage } from '../actions'
import { SquareGrid, TeaserTile } from '../components'
import {
  selectCompanyById,
  selectCompanyByIdWithRelations
} from '../reducers/selectors'
import { IAppState, ICompany, IImage, IIndustry } from '../typings'

interface ICompanyContainerProps extends RouteComponentProps<{ id: string }> {
  id: number
  name: string
  ticker: string
  website: string
  loadCompanyPage: any
  images: IImage[]
}

class Company extends React.Component<ICompanyContainerProps, {}> {
  public componentDidMount = () => {
    this.props.loadCompanyPage(this.props.match.params.id)
  }

  public render() {
    const { name, ticker, website, images } = this.props
    return (
      <>
        <h4>{name}</h4>
        <h3>{ticker}</h3>
        <h2>{website}</h2>
        {images && images.length ? (
          <SquareGrid>{images.map(renderImageTile)}</SquareGrid>
        ) : (
          console.log('no images for company')
        )}
      </>
    )
  }
}

const renderImageTile = (image: IImage) => (
  <TeaserTile
    backgroundImage={image.originalUrl ? image.originalUrl : undefined}
  />
)

const mapStateToProps = (
  state: IAppState,
  ownProps: ICompanyContainerProps
) => {
  const paramAsNum = Number(ownProps.match.params.id)
  const company = selectCompanyByIdWithRelations(state, paramAsNum)
  return company ? { ...company } : {}
}

export default connect(
  mapStateToProps,
  {
    loadCompanyPage
  }
)(Company)
