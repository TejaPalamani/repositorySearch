import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, itemFunction} = props
  const {id, language} = filterDetails

  const listItemClicked = () => {
    itemFunction(id)
  }

  return (
    <li>
      <button type="button" onClick={listItemClicked}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
