export interface TransactionHistoryItem {
    walletId: string,
    type:number,
    amount:number,
    reference:any,
    paymentTransactionId:string,
    isDeleted:boolean,
    deleterId:any,
    deletionTime:any,
    lastModificationTime:any,
    lastModifierId:any,
    creationTime:string,
    creatorId:any,
    id: string,
    paymentSource:number
}
  
export interface ItransactionHistory{
    totalCount: number,
    items: TransactionHistoryItem[],
}
export interface Iwallet{
    loading: boolean,
    transactionHistory: ItransactionHistory ,
    hasMore: boolean,
    currentPage:number
}
export interface pageOption{
    skip?: number,
    take?: number,
}