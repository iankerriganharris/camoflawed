import { all, call, fork, put, select, take } from 'redux-saga/effects'
import * as actions from '../actions'
import {
  getEntity,
  selectCompanyById,
  selectIndustryById
} from '../reducers/selectors'
import { api } from '../services'
import { IEntity } from '../typings'

// entities
const { industries, companies } = actions

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

export const fetchCompany = fetchEntity.bind(
  null,
  companies,
  api.fetchCompanyById
)

const cacheInvalid = (ent: IEntity) =>
  !ent.timeFetched || ent.timeFetched < Date.now() - 30000 // 30 seconds

function* loadIndustries(cursor?: number, loadMore = false) {
  const haveIndustries = yield select(getEntity, 'industries')
  if (!haveIndustries || (cursor && cursor > 0 && loadMore)) {
    yield call(fetchIndustries, cursor)
  }
}

function* loadIndustry(id: number) {
  const industry = yield select(selectIndustryById, id)
  if (!industry || cacheInvalid(industry)) {
    yield call(fetchIndustry, id)
  }
}

function* loadCompany(id: number) {
  const company = yield select(selectCompanyById, id)
  if (!company || cacheInvalid(company)) {
    yield call(fetchCompany, id)
  }
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
    const { cursor } = yield take(actions.LOAD_MORE_INDUSTRIES)
    console.log(cursor)
    yield fork(loadIndustries, cursor, true)
  }
}

function* watchLoadIndustryPage() {
  while (true) {
    const { id } = yield take(actions.LOAD_INDUSTRY_PAGE)
    console.log(id)
    yield fork(loadIndustry, id)
  }
}

function* watchLoadCompanyPage() {
  while (true) {
    const { id } = yield take(actions.LOAD_COMPANY_PAGE)
    yield fork(loadCompany, id)
  }
}

export default function* root() {
  yield all([
    fork(watchLoadIndustriesPage),
    fork(watchLoadMoreIndustries),
    fork(watchLoadIndustryPage),
    fork(watchLoadCompanyPage)
  ])
}
