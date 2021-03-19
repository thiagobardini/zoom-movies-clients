import React, { Component } from 'react'
// withRouter is a function that gives our component access to the "route props"
// the "route props" are 'history', 'match', and 'location'
import { withRouter } from 'react-router-dom'

// import a signUp and signIn axios function
import { signUp, signIn } from '../../api/auth'

// importing any of our custom messages to show the user
import messages from '../AutoDismissAlert/messages'

// Import a react-bootstrap Form and Button. So the form and button look nicer.
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    // the SignUp component needs 3 pieces of state
    // the email, password, and password confirmation
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // update the state when an input (Form.Control) changes.
  handleChange = event => {
    console.log('name', event.target.name)
    console.log('value', event.target.value)
    this.setState({
      // event.target is the Form.Control (input) that called handleChange
      // set the state with that Form.Control's `name` to the Form.Control's new value
      [event.target.name]: event.target.value
    })
  }

  // when our form is submitted
  onSignUp = event => {
    // prevent the default action of the form refreshing the page
    event.preventDefault()

    // destructure props so they are easier to use
    const { msgAlert, history, setUser } = this.props

    // make an axios request to our API to sign up
    signUp(this.state)
      // make an axios request to our API to sign in
      .then(() => signIn(this.state))
      // if we signed in successfully, the `user` will be on the response's data (res.data)
      // call `setUser` so we have the `user's` token for future requests
      .then(res => setUser(res.data.user))
      // Show a message to the user that we signed up successfully
      .then(() => msgAlert({
        // the title of our message
        heading: 'Sign Up Success',
        // the body of our message is `messages.signUpSuccess`
        message: messages.signUpSuccess,
        // variant is the color (success is green)
        variant: 'success'
      }))
      // this says go to the home page. Similar to <Redirect to="/" />
      .then(() => history.push('/'))
      .catch(error => {
        // we reset the form's state to its initial values
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show an error message
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure the state
    const { email, password, passwordConfirmation } = this.state

    return (
      // We add a row to our sign up form so we can use the bootstrap grid
      <div className="row">
        {/* Add columns, so that on a small screen the form takes up 10/12 columns of space.
            On a medium screen it takes up 8/12 columns of space.
            mt-5 means set top margin to be fairly big (5 is large, 0 is none)
            mx-auto means set the margin of the x-axis (left and right) automatically
                    which centers the form. */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* Use a react bootstrap. This is just a prettier version of a normal form */}
          <Form onSubmit={this.onSignUp}>
            {/* Groups a Form.Control (which is like an input), a label, and
                (optional) helper text. The controlId is used for accessibility. */}
            <Form.Group controlId="email">
              {/* A label for our form control */}
              <Form.Label>Email address</Form.Label>
              {/* A form control can be an `input`, `select`, or `textarea`.
                  The props it accepts are very similar to an input. */}
              <Form.Control
                required
                type="email"
                // the name refers to the state which this Form.Control should update
                name="email"
                // the value of this form control is the `email` state
                value={email}
                placeholder="Enter email"
                // Whenever someone types in this Form.Control call `this.handleChange`
                // to update the state
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* This is a React Bootstrap button. Like a normal button but prettier */}
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

// call withRouter, to give our SignUp component access to the route props (history)
export default withRouter(SignUp)
