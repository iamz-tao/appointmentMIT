import { all } from 'redux-saga/effects'
import authenticationSaga from '~/modules/authentication/sagas'
import userSaga from '~/modules/user/sagas'
import uploadSaga from '~/modules/upload/sagas'
import cookieSaga from '~/modules/storage/sagas'
import adminSaga from '~/modules/admin/sagas'

const sagas = [
  all(authenticationSaga),
  all(cookieSaga),
  all(userSaga),
  all(uploadSaga),
  all(adminSaga),
]

export default function* rootSaga() {
  yield all(sagas)
}
