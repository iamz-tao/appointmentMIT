
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
