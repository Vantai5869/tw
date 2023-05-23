const url = {
  addressList: "/webbff/shipping/api/app/shipping-address",
  addressCreate: "/webbff/shipping/api/app/shipping-address",
  distributorInfo: "/webbff/partnership/api/app/distributor/info",
  addressEdit: (id: string) =>
    `/webbff/shipping/api/app/shipping-address/${id}`,
  addressGetById: (id: string) =>
    `/webbff/shipping/api/app/shipping-address/${id}`,
  addressSetDefault: (id: string) =>
    `/webbff/shipping/api/app/shipping-address/${id}/set-default`,
  addressDelete: (id: string) =>
    `/webbff/shipping/api/app/shipping-address/${id}`,

  getLocation: "/webbff/api/app/geo/search-place-by-position",

  getSuggestPlace: "/webbff/api/app/geo/suggest-place",
  getLocationByText: "/webbff/api/app/geo/search-place-by-text",

  // Profile delivery address
  getProvince: "/webbff/shipping/api/app/province",
  getDistrict: (id: string) =>
    `/webbff/shipping/api/app/district?provinceId=${id}`,

  getWard: (id: string) => `/webbff/shipping/api/app/ward?districtId=${id}`,
  changeInfo: "/webbff/partnership/api/app/distributor/contact-info",

  changeLanguage: "/auth/api/account/my-profile/my-settings",
};
export default url;
