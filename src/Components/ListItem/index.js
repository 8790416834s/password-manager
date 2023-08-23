import './index.css'

const ListItem = props => {
  const {passwordDetails, deleteItem, checkbox} = props
  const {website, username, password, id} = passwordDetails

  const onDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-item">
      <div className="letter-icon">
        <p className="letter">{website[0]}</p>
      </div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {checkbox ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <div>
        <button
          type="button"
          data-testid="delete"
          onClick={onDelete}
          className="delete-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default ListItem
