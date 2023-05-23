import { ItransactionHistory, pageOption } from '../../type/Wallet';
import httpService from '../httpService';
import url from './url';

const walletApi = {
  list: (params: pageOption) => {
    const uri = url.myTransactionHistory(params.skip,params.take);
    return httpService.GET<pageOption, ItransactionHistory>({
      uri,
      params,
    });
  },

};

export default walletApi;
