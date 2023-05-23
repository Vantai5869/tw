const DistributorCart = "/webbff/cart/api/app/distributor-cart";

const url = {
  getCarts: "/webbff/api/app/distributor-cart-aggregate-data",
  add: DistributorCart + "/item",
  detai: (id: string) => DistributorCart + `/${id}`,
  deleteCart: (id: string, distributorCartItemId: string) =>
    DistributorCart + `/${id}/item/` + distributorCartItemId,
  deleteList: (id: string) => DistributorCart + `/${id}/delete-list`,
  changeQuantity: DistributorCart + "/change-quantity",
  listProductToCart: DistributorCart + `/list-product-to-cart`,
};

export default url;
