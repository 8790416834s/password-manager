import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ListItem from './Components/ListItem'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    count: 0,
    empty: true,
    searchInput: '',
    checkbox: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {website, username, password, passwordList} = this.state
    const newItem = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    const newCount = passwordList.length + 1
    if (newCount === 0) {
      this.setState(prevState => ({empty: !prevState.empty}))
    } else {
      this.setState(prevState => ({
        website: '',
        username: '',
        password: '',
        passwordList: [...prevState.passwordList, newItem],
        count: newCount,
        empty: false,
      }))
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(each => each.id !== id)
    const newCount = passwordList.length
    if (newCount === 0) {
      this.setState(prevState => ({empty: !prevState.empty, count: 0}))
    } else {
      this.setState(prevState => ({
        count: prevState.count - 1,
        passwordList: filteredList,
      }))
    }
  }

  onCheckbox = () => {
    this.setState(prevState => ({checkbox: !prevState.checkbox}))
  }

  render() {
    const {
      website,
      password,
      username,
      passwordList,
      empty,
      searchInput,
      checkbox,
    } = this.state
    const searchResult = passwordList.filter(each =>
      each.website.includes(searchInput),
    )
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="new-add-password-container">
          <form onSubmit={this.onAdd} className="add-password-container">
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="combined-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="combined-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="combined-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="password-input"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
            </div>
            <div className="add-button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="old-password-container">
          <div className="heading-container">
            <div className="count-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{searchResult.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-search"
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="check-box"
              onClick={this.onCheckbox}
            />
            <label htmlFor="checkbox" className="checkbox-name">
              Show passwords
            </label>
          </div>
          {empty || searchResult.length === 0 ? (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p className="text">No Passwords</p>
            </div>
          ) : (
            <ul className="password-list-container">
              {searchResult.map(each => (
                <ListItem
                  passwordDetails={each}
                  key={each.id}
                  deleteItem={this.deleteItem}
                  checkbox={checkbox}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
