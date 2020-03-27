import {
  call,
  put,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import * as http from '~/helpers/axiosWrapperGet'
import * as httpPost from '~/helpers/axiosWrapperPostToken'
import * as httpDel from '~/helpers/axiosWrapperDelete'
import { loginAction } from '~/modules/authentication/actions'
import { appointmentAction } from '../actions'


export function* getLecturerAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: '/api/ListTeacher',
    payload: {
      token,
      data,
    },
  })
}

export function* getAppointTeacherAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: '/api/ListAppointMentTeacher',
    payload: {
      token,
      data,
    },
  })
}

export function* getRequestAppointmentAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.get, {
    url: '/api/ListAppointMent',
    payload: {
      token,
      data,
    },
  })
}

export function* createAppointmentAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(httpPost.post, {
    url: '/api/postAppointMent',
    payload: {
      token,
      data,
    },
  })
}


export function* studentGetAppointReqAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: '/api/ListStudentAppoint',
    payload: {
      token,
      data,
    },
  })
}

export function* cancelAppointmentAPI(id, role) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const response = yield call(httpDel.post, {
        url: `/api/cancel_request/${id}`,
        payload: {
          token,
          data: {
            id,
          },
        },
      })

      // yield put(appointmentAction.cancelAppointment(id))
      const { error } = response

      if (error) {
        yield put(loginAction.handleLogout())
        window.location.href = '/login'
        return
      }

      if (role === 'LECTURER') {
        yield put(appointmentAction.LecturercancelAppointmentSuccess(id))
      }
      if (role === 'NISIT') {
      yield put(appointmentAction.cancelAppointmentSuccess(id))
      }

    } else {
      yield put(loginAction.handleLogout())
      window.location.href = '/login'
    }
  } catch (error) {
    console.log('error', error)
    yield put(appointmentAction.cancelAppointmentSuccess())
  }
}

// export function* getYearAllAPI() {
//   const token = Cookie.get('token')
//   const email = Cookie.get('email')
//   const data = {}

//   return yield call(http.post, {
//     url: '/api/getYear',
//     payload: {
//       token,
//       email,
//       data,
//     },
//   })
// }

// export function* getCurrentYearAPI() {
//   const token = Cookie.get('token')
//   const data = {}

//   return yield call(http.post, {
//     url: '/api/getCurrentYear',
//     payload: {
//       token,
//       data,
//     },
//   })
// }

// export function* deleteUserAPI(id) {
//   try {
//     const token = Cookie.get('token')
//     const email = Cookie.get('email')

//     if (!isNil(token)) {
//       const response = yield call(httpDel.post, {
//         url: `/api/deleteUser/${id}`,
//         payload: {
//           email,
//           token,
//           data: {
//             id,
//           },
//         },
//       })

//       yield put(userAction.deleteUserSuccess(id))
//       const { error } = response

//       if (error) {
//         yield put(loginAction.handleLogout())
//         window.location.href = '/login'
//         return
//       }

//       yield put(userAction.requestSuccess())
//     } else {
//       yield put(loginAction.handleLogout())
//       window.location.href = '/login'
//     }
//   } catch (error) {
//     console.log('error', error)
//     yield put(userAction.requestSuccess())
//   }
// }

// export function* deleteYearAPI(id) {
//   try {
//     const token = Cookie.get('token')
//     const email = Cookie.get('email')

//     if (!isNil(token)) {
//       const response = yield call(httpDel.post, {
//         url: `/api/delYear/${id}`,
//         payload: {
//           email,
//           token,
//           data: {
//             id,
//           },
//         },
//       })

//       window.location.href = '/list-year'
//       const { error } = response

//       if (error) {
//         yield put(loginAction.handleLogout())
//         window.location.href = '/login'
//         return
//       }

//       yield put(userAction.requestSuccess())
//     } else {
//       yield put(loginAction.handleLogout())
//       window.location.href = '/login'
//     }
//   } catch (error) {
//     console.log('error', error)
//     yield put(userAction.requestSuccess())
//   }
// }

// export function* getBeaconAllAPI() {
//   const token = Cookie.get('token')
//   const data = {}

//   return yield call(http.post, {
//     url: '/api/listBeacon',
//     payload: {
//       token,
//       data,
//     },
//   })
// }

// export function* deleteBeaconAPI(id) {
//   try {
//     const token = Cookie.get('token')
//     const email = Cookie.get('email')

//     if (!isNil(token)) {
//       const response = yield call(httpDel.post, {
//         url: `/api/deleteBeacon/${id}`,
//         payload: {
//           email,
//           token,
//           data: {
//             id,
//           },
//         },
//       })

//       const { error } = response

//       if (error) {
//         yield put(loginAction.handleLogout())
//         window.location.href = '/login'
//         return
//       }

//       yield put(userAction.requestSuccess())
//     } else {
//       yield put(loginAction.handleLogout())
//       window.location.href = '/login'
//     }
//   } catch (error) {
//     console.log('error', error)
//     yield put(userAction.requestSuccess())
//   }
// }
