// Import React, so we can use JSX. Also import Component for our class component
import React, { Component, Fragment } from 'react'
// Import Route from react-router for our SignIn and SignUp components
import { Route } from 'react-router-dom'
// Import the v4 function from the `uuid` package. Rename the `v4` function to
// be `uuid` (as uuid)
import { v4 as uuid } from 'uuid'

// This is a route we can only go to if we are signed in. Otherwise, it send us to
// the root path "/"
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
// A component to show a user a message. Then dismiss that message after 5 seconds
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
// The header component has our navigation links to different pages
import Header from './components/Header/Header'

// Our 4 auth components, for signing up/in, changing the password, and signing out
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  constructor (props) {
    super(props)

    // Set the initial state of our App to be a user that starts as `null` (until we've signed in)
    // and an array of messages to show the user (initially empty)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // this method will set the user state, to the user passed as a parameter
  setUser = user => this.setState({ user })

  // this method will reset the user state, to its inital value of null
  clearUser = () => this.setState({ user: null })

  // remove an alert from our `msgAlerts` state
  // the `id` is the unique id of the msg we want to remove
  deleteAlert = (id) => {
    // sets the `msgAlerts` state to an array, with all of the msgAllerts
    // except the one whose id was passed in (by using filter)
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // show a message to our user
  // heading - the title of the message
  // message - the body of the message
  // variant - this is the bootstap color to use as styling
  //           (primary, secondary, success, danger, etc.)
  msgAlert = ({ heading, message, variant }) => {
    // create a unique id for this message
    const id = uuid()

    // set the `msgAlerts` state, so that it contains a new message with the properties
    // of `heading`, `message`, `variant`, and `id`
    this.setState((state) => {
      // Bad don't do. Because this modifies state directly.
      // this.state.msgAlerts.push({ heading, message, variant, id })
      // return { msgAlerts: this.state.msgAlerts }

      // the reason we are using this syntax instead of `push` is so that we never
      // modify the `msgAlerts` state directly
      const newMsgAlerts = [...state.msgAlerts, { heading, message, variant, id }]
      return { msgAlerts: newMsgAlerts }
    })
  }

  render () {
    // destructure the msgAlerts and user state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        {/* This is the top bar with our navigation links */}
        <Header user={user} />

        {/* For each of our messages in msgAlerts: show an AutoDismissAlert
            component. Which will show up on the screen and disappear after 5
            seconds. */}
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        {/* Add a container to center our content and allow us to use the bootstrap grid */}
        <main className="container">
          {/* Add a sign up route, similar to the react-router lesson */}
          <Route path='/sign-up' render={() => (
            // Show the SignUp component. Pass it the `msgAlert` prop to show a
            // signed up successfully message. And pass it `setUser` to automatically
            // sign in.
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* Same as /sign-up, but with the path of /sign-in and the component
              SignIn */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* An AuthenticatedRoute is used just like a normal Route, except:
              1. The component is called AuthenticatedRoute
              2. We pass it a `user` prop, which it can use to tell if we are
                 signed in */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            // SignOut accepts a msgAlert prop to tell us when we have signed out
            // It accepts the clearUser, to set the user back to `null`
            // It also accepts the `user`, since signing out needs the user's token
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
