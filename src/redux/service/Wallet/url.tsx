const ROOT = "/webbff/wallet/api/app";

const url = {
  myTransactionHistory:(skip=0, take=10)=> ROOT+`/wallet-transaction/my-transaction-history?skip=${skip}&take=${take}`
};

export default url;
