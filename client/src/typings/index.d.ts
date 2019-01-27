export interface IAppState {
  result: {
    industries: []
  }
  entities: {
    industries: {
      [id: number]: IIndustry
    }
    companies: {
      [id: number]: ICompany
    }
    images: {
      [id: number]: IImage
    }
  }
  cursors: {
    industries: {
      nextCursor: number
    }
  }
}

export interface IEntity {
  timeFetched: number
}

export interface IImage {
  id: number
  dateStored?: Date
  originalUrl?: string
  storageBucket?: string
  storageKey?: string
  storagePrefix?: string
  storageProvider?: string
  storageUrl?: string
}

export interface IIndustry {
  id: number
  name: string
  companies: number[]
  images: number
  primaryImage?: IImage
}

export interface ICompany extends IEntity {
  id: number
  name: string
  ticker: string
  website: string
  primaryImage?: IImage
  images: number[]
}
