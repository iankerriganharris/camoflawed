import { merge } from 'lodash'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'

function entities(state = { industries: {} }, action: any) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

function result(state = {}, action: any) {
  if (action.response && action.response.result) {
    return merge({}, state, action.response.result)
  }
  return state
}

const rootReducer = combineReducers({
  entities,
  result
})

export default rootReducer
