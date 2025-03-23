export interface RateInterface {
    [key: string]: RateInfo
  }
  
  export interface RateInfo {
    currency: string
    price: string
    timestamp: string
  }
  