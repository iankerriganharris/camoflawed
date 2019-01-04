import Axios from 'axios'
import { camelizeKeys } from 'humps'
import { normalize, schema, Schema } from 'normalizr'

async function callApi(endpoint: string, schema: Schema) {
  try {
    const { data } = await Axios.get(endpoint)
    return {
      response: normalize(data, schema)
    }
  } catch {
    return
  }
}

const company = new schema.Entity('companies')

const industry = new schema.Entity('industries')

const industrySchema = { industries: [industry] }

export const fetchIndustries = () => callApi(`industries`, industrySchema)
