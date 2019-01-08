const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

interface IRequestTypes {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
}

function createRequestTypes(base: string): any {
  return [REQUEST, SUCCESS, FAILURE].reduce(
    (acc: { [type: string]: string }, type: string) => {
      acc[type] = `${base}_${type}`
      return acc
    },
    {}
  )
}

export const INDUSTRIES = createRequestTypes('INDUSTRIES')

export const LOAD_INDUSTRIES_PAGE = 'LOAD_INDUSTRIES_PAGE'
export const LOAD_MORE_INDUSTRIES = 'LOAD_MORE_INDUSTRIES'

function action(type: string, payload = {}) {
  return { type, ...payload }
}

export const industries = {
  failure: (error: any) => action(INDUSTRIES[FAILURE], { error }),
  request: () => action(INDUSTRIES[REQUEST]),
  success: (response: any) => action(INDUSTRIES[SUCCESS], { response })
}

export const loadIndustriesPage = () => action(LOAD_INDUSTRIES_PAGE)

export const loadMoreIndustries = (cursor: string) =>
  action(LOAD_MORE_INDUSTRIES, { cursor })
