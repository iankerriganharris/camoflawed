import Axios from 'axios'
import { camelizeKeys } from 'humps'
import { omit } from 'lodash'
import { normalize, schema, Schema } from 'normalizr'

async function callApi(endpoint: string, schema: Schema) {
  try {
    const { data } = await Axios.get(endpoint)
    const { nextCursor, meta, ...entityData } = data
    console.log('api resp')
    console.log(nextCursor)
    return {
      response: { ...normalize(entityData, schema), nextCursor, meta }
    }
  } catch {
    return
  }
}

const company = new schema.Entity('companies')

const industry = new schema.Entity('industries')

const industrySchema = { industries: [industry] }

export const fetchIndustries = (cursor?: number) =>
  callApi(`industries?cursor=${cursor ? cursor : ''}`, industrySchema)
