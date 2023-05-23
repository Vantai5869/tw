const SUPPLIER = "/webbff/partnership/api/app/supplier";

const url = {
  allSupplier: SUPPLIER + "/all",
  search: SUPPLIER + "/search",
  detail: (id: string) => SUPPLIER + `/${id}/supplier-by-id`,
};

export default url;
