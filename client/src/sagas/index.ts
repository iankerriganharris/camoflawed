import { all, call, fork, put, select, take } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'

// entities
const { industries } = actions

// resuable fetch Subroutine
// entity :  industries
// apiFn  : api.fetchIndustries | api.fetchRepo | ...
function* fetchEntity(entity: any, apiFn: () => any) {
  yield put(entity.request())
  const { response, error } = yield call(apiFn)
  console.log(response)
  if (response) {
    yield put(entity.success(response))
  } else {
    yield put(entity.failure(error))
  }
}

export const fetchIndustries = fetchEntity.bind(
  null,
  industries,
  api.fetchIndustries
)

function* loadIndustries() {
  // const repo = yield select(getRepo, fullName)
  // if (!repo || requiredFields.some(key => !repo.hasOwnProperty(key)))
  //   yield call(fetchRepo, fullName)
  yield call(fetchIndustries)
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLoadIndustriesPage() {
  // while (true) {
  //   yield fork(loadIndustries)
  // }
  yield fork(loadIndustries)
}

export default function* root() {
  yield all([fork(watchLoadIndustriesPage)])
}
