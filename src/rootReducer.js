import { combineReducers } from 'redux-immutable'

import { reducer as formReducer } from 'redux-form/immutable'
import authenticationReducer from '~/modules/authentication/reducers'
import userReducer from '~/modules/user/reducers'
import loadingReducer from '~/modules/upload/reducers'
import adminReducer from '~/modules/admin/reducers'
import modalReducer from '~/modules/modal/reducer'

export default combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  form: formReducer,
  loading: loadingReducer,
  admin: adminReducer,
  modal: modalReducer,
})
