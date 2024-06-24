export interface IAccess {
    id: string;
  }
  
  export interface IRefresh {
    id: string;
  }
  
  export interface ISign {
    meeting: string;
    member: string;
  }
  

  export interface ISignDataResponse {
    token: string;
    refreshToken: string;
  }