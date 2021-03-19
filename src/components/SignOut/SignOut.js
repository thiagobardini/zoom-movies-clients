import { Component } from 'react'
// we import withRouter, so the SignOut component has access to the `history` object
import { withRouter } from 'react-router-dom'

// import the signOut axios call
import { signOut } from '../../api/auth'

import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // when we go to the /sign-out route
  componentDidMount () {
    // destructure our props
    const { msgAlert, history, clearUser, user } = this.props

    // call our signOut axios request. Pass it the user, so it has access to
    // the user's token
    signOut(user)
      // whether signing out was successful or not tell the user we signed out successfully
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      // then redirect to the root path (home page)
      .finally(() => history.push('/'))
      // then set the user back to null (reset the user)
      .finally(() => clearUser())
  }

  render () {
    // the sign out component, never needs to be seen on the screen. it will
    // automatically redirect to the home page when you visit the /sign-out
    // path.

    // we return a falsy value, so nothing is shown on the screen ('')
    return ''
  }
}

export default withRouter(SignOut)
