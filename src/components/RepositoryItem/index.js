import './index.css'

const RepositoryItem = props => {
  const {cardDetails} = props
  const {id, name, avatarUrl, issuesCount, forksCount, starsCount} = cardDetails
  return (
    <li className="card">
      <img src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="col">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="l"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="col">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="l"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="col">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="l"
        />
        <p>{issuesCount} open issues}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
