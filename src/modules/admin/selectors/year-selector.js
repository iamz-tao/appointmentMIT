
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state.getIn(['admin'])

export const getAllYear = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['year', 'yearAll'])
    } catch (error) {
      return fromJS({})
    }
  },
)
