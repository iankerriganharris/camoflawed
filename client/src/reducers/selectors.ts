import { createSelector } from 'reselect'
import { IAppState, ICompany, IImage, IIndustry } from '../typings'

function getSafe(fn: CallableFunction, fallback?: any): any | undefined {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export const getEntity = (state: any, entity: string) => state.entities[entity]
export const getIndustry = (state: any, industry: string) =>
  getSafe(() => state.entities.industries[industry])

export const selectCompanies = (state: IAppState): ICompany[] | [] =>
  getSafe(() => state.entities.companies, [])

export const selectImages = (state: IAppState): IImage[] | [] =>
  getSafe(() => state.entities.images, [])

export const selectCompanyById = (
  state: IAppState,
  id: number
): ICompany | undefined => getSafe(() => state.entities.companies[id])

export const selectIndustryById = (
  state: IAppState,
  id: number
): IIndustry | undefined => getSafe(() => state.entities.industries[id])

export const selectIndustryByIdWithRelations = createSelector(
  [selectIndustryById, selectCompanies],
  (industry, companies) =>
    !industry
      ? undefined
      : !industry.companies || !companies
      ? { ...industry }
      : {
          ...industry,
          companies: [...industry.companies.map(i => companies[i])]
        }
)

export const selectCompanyByIdWithRelations = createSelector(
  [selectCompanyById, selectImages],
  (company, images) =>
    !company
      ? undefined
      : !company.images || !images
      ? { ...company }
      : {
          ...company,
          images: [...company.images.map(i => images[i])]
        }
)
