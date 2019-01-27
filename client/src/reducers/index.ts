import { isArray, merge, mergeWith } from 'lodash'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'
import paginate from './paginate'

function entities(state = {}, action: any) {
  console.log(state)
  console.log(action.response)
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

function result(state = { industries: [] }, action: any) {
  if (action.response && action.response.result) {
    return mergeWith(state, action.response.result, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue)
      }
    })
  }
  return state
}

// Updates the pagination data for different actions.
function cursors(state = {}, action: any) {
  if (action.response && action.response.nextCursor !== undefined) {
    return merge({}, state, {
      industries: {
        isFetching: false,
        nextCursor: action.response.nextCursor
      }
    })
  }
  return state
}
// const pagination = combineReducers({
//   industries: paginate({
//     mapActionToKey: (action: any) => action.response.nextCursor,
//     types: [
//       ActionTypes.INDUSTRIES.REQUEST,
//       ActionTypes.INDUSTRIES.SUCCESS,
//       ActionTypes.INDUSTRIES.FAILURE
//     ]
//   })
// })

const rootReducer = combineReducers({
  cursors,
  entities,
  result
})

export default rootReducer
