import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { loadCompanyPage } from '../actions'
import { ImageDetail, Modal, SquareGrid, TeaserTile } from '../components'
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

interface ICompanyContainerState {
  modalOpen?: boolean
  selectedImage?: IImage
}

class Company extends React.Component<
  ICompanyContainerProps,
  ICompanyContainerState
> {
  public state: ICompanyContainerState = {
    modalOpen: false
  }

  public componentDidMount = () => {
    this.props.loadCompanyPage(this.props.match.params.id)
  }

  public render() {
    const { id, name, ticker, website, images } = this.props
    const { modalOpen, selectedImage } = this.state
    console.log(modalOpen)
    return (
      <>
        <h4>{name}</h4>
        <h3>{ticker}</h3>
        <h2>{website}</h2>
        <div>
          <Modal closeFunction={this.toggleModal} open={modalOpen}>
            {selectedImage && selectedImage.originalUrl ? (
              <ImageDetail src={selectedImage.originalUrl} />
            ) : null}
          </Modal>
          <section className={modalOpen ? 'blurred' : ''}>
            {images && images.length ? (
              <SquareGrid>{images.map(this.renderImageTile)}</SquareGrid>
            ) : null}
          </section>
        </div>
      </>
    )
  }

  private renderImageTile = (image: IImage) => (
    <div
      onClick={() => this.setState({ modalOpen: true, selectedImage: image })}
    >
      <TeaserTile
        backgroundImage={image.originalUrl ? image.originalUrl : undefined}
      />
    </div>
  )

  private selectImage = (image: IImage) =>
    this.setState({ selectedImage: image })
  private toggleModal = () =>
    this.setState({ modalOpen: !this.state.modalOpen })
}

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
