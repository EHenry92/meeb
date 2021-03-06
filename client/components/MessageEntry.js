import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../store/messageEntry'
import { fetchRoom } from '../store'
import { withRouter } from 'react-router'
import { me } from '../store/user'

class MessageEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getWhiteboard(id)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const whiteboardId = this.props.whiteboard.id
    const { text } = this.state
    const userId = this.props.user.id
    text && this.props.sendMessage({ text, whiteboardId, userId })
    this.setState({ text: '' })
  }

  handleChange(evt) {

    this.setState({ text: evt.target.value })
  }

  render() {
    const { text } = this.state
    return (
      !this.props.whiteboard.closed &&
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg row">
          <input
            className="form-control"
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="">
            <button className="black" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    whiteboard: state.singleWhiteboard,
    messageEntry: state.messageEntry,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getWhiteboard: (id) => {
      dispatch(fetchRoom(id))
    },
    sendMessage: (message) => {
      dispatch(addMessage(message))
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(MessageEntry))
