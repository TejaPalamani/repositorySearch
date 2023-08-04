import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const statusDetails = {
  initial: 'INITIAL',
  loading: 'lOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {status: statusDetails.initial, searchValue: 'ALL', fetchedData: []}

  componentDidMount() {
    this.getProductsDetails()
  }

  getProductsDetails = async () => {
    this.setState({status: statusDetails.loading})
    const {searchValue} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${searchValue}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.status === 200) {
      const data = await response.json()
      const data1 = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({status: statusDetails.success, fetchedData: data1})
    } else {
      this.setState({status: statusDetails.failure})
    }
    console.log(url)
  }

  itemFunction = id => {
    this.setState({searchValue: id}, this.getProductsDetails)
  }

  successFunction = () => {
    const {status, fetchedData} = this.state
    console.log(fetchedData)
    return (
      <ul className="ul">
        {fetchedData.map(each => (
          <RepositoryItem cardDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  loaderFunction = () => (
    <div data-testid="loader" className="main_bg_card">
      <Loader type="ThreeDots" color="black" width={50} height={50} />
    </div>
  )

  failureFunction = () => (
    <div className="main_bg_card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  checking = () => {
    const {status} = this.state
    switch (status) {
      case statusDetails.success:
        return this.successFunction()
      case statusDetails.loading:
        return this.loaderFunction()
      default:
        return this.failureFunction()
    }
  }

  render() {
    return (
      <div className="main_bg_card">
        <h1>Popular</h1>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              filterDetails={each}
              itemFunction={this.itemFunction}
              key={each.id}
            />
          ))}
        </ul>
        {this.checking()}
      </div>
    )
  }
}

export default GithubPopularRepos
