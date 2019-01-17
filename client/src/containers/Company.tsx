import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { loadCompanyPage } from '../actions'
import { selectCompanyById } from '../reducers/selectors'
import { IAppState, ICompany, IImage, IIndustry } from '../typings'

interface ICompanyContainerProps extends RouteComponentProps<{ id: string }> {
  id: number
  name: string
  ticker: string
  loadCompanyPage: any
}

class Company extends React.Component<ICompanyContainerProps, {}> {
  public componentDidMount = () => {
    this.props.loadCompanyPage(this.props.match.params.id)
  }

  public render() {
    const { name, ticker } = this.props
    return (
      <>
        <h4>{name}</h4>
        <h3>{ticker}</h3>
      </>
    )
  }
}

const mapStateToProps = (
  state: IAppState,
  ownProps: ICompanyContainerProps
) => {
  const paramAsNum = Number(ownProps.match.params.id)
  const company = selectCompanyById(state, paramAsNum)
  return company ? { ...company } : {}
}

export default connect(
  mapStateToProps,
  {
    loadCompanyPage
  }
)(Company)
