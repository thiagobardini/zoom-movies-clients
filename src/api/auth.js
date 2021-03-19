import apiUrl from '../apiConfig'
import axios from 'axios'

// the signUp asios call accepts a credentials object w/ an email, password, and
// password confirmation property. (The same format as SignUp's state object)
// we use a named export, so we can export each of the auth axios calls
export const signUp = credentials => {
  return axios({
    // the method and url are similar to the jquery-ajax-token-auth (using the same API)
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

// The signIn function is similar to the signUp function
export const signIn = credentials => {
  return axios({
    // it has a different path
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        // and it doesn't need the password confirmation
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    // We have the same url path and method from the jquery-ajax-token-auth lesson
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
