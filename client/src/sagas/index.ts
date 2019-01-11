import { all, call, fork, put, select, take } from 'redux-saga/effects'
import * as actions from '../actions'
import { getEntity, getIndustry } from '../reducers/selectors'
import { api } from '../services'

// entities
const { industries } = actions

// resuable fetch Subroutine
// entity :  industries
// apiFn  : api.fetchIndustries | api.fetchRepo | ...
function* fetchEntity(
  entity: any,
  apiFn: (param: any) => any,
  cursor?: number,
  id?: number
) {
  yield put(entity.request())
  console.log(cursor)
  const { response, error } = yield call(apiFn, cursor || id)
  console.log('fetch response')
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

export const fetchIndustry = fetchEntity.bind(
  null,
  industries,
  api.fetchIndustryById
)

function* loadIndustries(cursor?: number, loadMore = false) {
  const haveIndustries = yield select(getEntity, 'industries')
  if (!haveIndustries || (cursor && cursor > 0 && loadMore)) {
    yield call(fetchIndustries, cursor)
  }
}

function* loadIndustry(id: number) {
  yield call(fetchIndustry, id)
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLoadIndustriesPage() {
  while (true) {
    yield take(actions.LOAD_INDUSTRIES_PAGE)
    yield fork(loadIndustries)
  }
}

function* watchLoadMoreIndustries() {
  while (true) {
    console.log('I have been called')
    const { cursor } = yield take(actions.LOAD_MORE_INDUSTRIES)
    console.log(cursor)
    yield fork(loadIndustries, cursor, true)
  }
  // console.log('I have been called')
  // const { cursor } = yield take(actions.LOAD_MORE_INDUSTRIES)
  // yield fork(loadIndustries, cursor, true)
}

function* watchLoadIndustryPage() {
  while (true) {
    console.log('Loading industry page')
    const { id } = yield take(actions.LOAD_INDUSTRY_PAGE)
    console.log(id)
    yield fork(loadIndustry, id)
  }
}

export default function* root() {
  yield all([
    fork(watchLoadIndustriesPage),
    fork(watchLoadMoreIndustries),
    fork(watchLoadIndustryPage)
  ])
}
