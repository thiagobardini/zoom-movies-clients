import React from 'react'
// Import the Bootsrap Alert component to use later
import Alert from 'react-bootstrap/Alert'

// Importing our custom scss styles for the AutoDismissAlert component
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)

    // by default, we want to show the AutoDismissAlert. So we set the
    // `show` state to true
    this.state = {
      show: true
    }

    // this is an id, that keeps track of our timer
    this.timeoutId = null
  }

  // once the AutoDismissAlert is shown on the screen (is mounted)
  componentDidMount () {
    // after 5000 milliseconds (5 seconds), call the `this.handleClose` function
    // store the timeoutId, so we can cancel the timer if needed
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // once the AutoDismissAlert is removed from the screen (is unmounted)
  componentWillUnmount () {
    // stop the timer that would have called `handleClose`
    // so that `handleClose` doesn't try to set the state, of a component that does
    // not exist anymore
    clearTimeout(this.timeoutId)
  }

  // the handleClose method, sets the show state to false. So our component
  // is not shown on the screen
  handleClose = () => this.setState({ show: false })

  render () {
    // Destructure the props that are passed in from App.js
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        // this removes our AutoDismissAlert
        deleteAlert(id)
      }, 300)
    }

    return (
      // Return a bootstrap Alert component
      <Alert
        // the dismissable prop will add an x button to stop showing the alert
        dismissible
        // if true, we see the Alert
        show={this.state.show}
        // The color of the alert
        variant={variant}
        // when the close button is clicked, set the show state to false
        onClose={this.handleClose}
      >
        <div className="container">
          {/* The title to use for the alert */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          {/* The body of the alert */}
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
