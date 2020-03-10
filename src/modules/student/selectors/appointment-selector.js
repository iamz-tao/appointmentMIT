
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state.getIn(['student'])

export const getLecturers = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['appointment', 'lecturers'])
    } catch (error) {
      return fromJS({})
    }
  },
)

export const GetRequestAppointment = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['appointment', 'requestAppointment'])
    } catch (error) {
      return fromJS({})
    }
  },
)

export const studentGetAppointment = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['appointment', 'studentAppointment'])
    } catch (error) {
      return fromJS({})
    }
  },
)
