import { compact, sumBy } from "lodash";
import moment from "moment";
import { formatNumber } from "../../../common/utils";
import { ACTION_TYPE, TAddressObject } from "../../../constants/type.interface";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
import { CartProductType, CartType } from "../../../redux/type/Cart/cart";

export const getItems = (items: any[]) => {
  return items?.filter(
    (el) => el?.isOutOfStock === false && el?.isDeleted === false
  );
};

export const getSumPrice = (
  items: any[],
  isFormat?: boolean,
  isActive?: boolean
) => {
  const newItems = isActive ? getItems(items) : items;
  const price = sumBy(newItems, function (item: any) {
    return item?.price * item?.quantity;
  });
  if (isFormat) {
    return formatNumber(price, ",");
  } else {
    return price;
  }
};

export const getSumQuantity = (
  items: any[],
  isFormat?: boolean,
  isActive?: boolean
) => {
  const newItems = isActive ? getItems(items) : items;
  const q = sumBy(newItems, function (item: any) {
    return item?.quantity;
  });
  if (isFormat) {
    return formatNumber(q, ",");
  } else {
    return q;
  }
};

export const getTotalPrice = (carts: CartType[]) => {
  const newArr = carts?.map((el) => {
    return {
      ...el,
      price:
        Number(getSumPrice(el?.items || [], false)) + (el?.shippingFee || 0),
    };
  });
  const price = sumBy(newArr, function (item: any) {
    return item?.price;
  });
  return formatNumber(price, ",");
};

export const getTotalQuantity = (carts: any[]) => {
  const newArr = carts?.map((el) => {
    return {
      ...el,
      quantity: getSumQuantity(el?.items, false),
    };
  });
  const quantity = sumBy(newArr, function (item: any) {
    return item?.quantity;
  });
  return formatNumber(quantity, ",");
};

export const getDateOrder = (date: string) => {
  return date ? moment(date).format("HH:mm DD/MM/YYYY") : null;
};

export const getAddress = (address: TAddressObject) => {
  if (address) {
    const newAddress = compact([
      address?.specificAddress,
      address?.wardName,
      address?.districtName,
      address?.provinceName,
    ]);
    return newAddress?.join(", ");
  }
  return "";
};

export const getCheckedCart = (cart: CartType[], ids: string[]) => {
  
  const data = compact(
    cart?.map((el) => {
      const items =
        el?.items?.filter((i: CartProductType) =>
          ids?.includes(i?.distributorCartItemId || "")
        ) || [];
      if (items.length <= 0) {
        return false;
      }
      return {
        ...el,
        items: el?.items?.filter((i: any) =>
          ids?.includes(i?.distributorCartItemId || "")
        ),
      };
    }) || []
  );

  return data;
};
export const onBuyNow = async (data: any, quantity?: number) => {
  if (!getReadyProduct(data)) {
    return false;
  }
  const params: CartType[] = [
    {
      supplierId: data?.supplierId || "",
      supplierName: data?.supplierName || data?.supplierId || "",
      items: [
        {
          productId: data?.id?.toString() || "",
          code: data?.code,
          image: data?.image || [],
          isDeleted: false,
          price: data?.price || 0,
          productName: data?.name,
          quantity: quantity || 1,
          supplierId: data?.supplierId,
          unit: data?.unit,
        },
      ],
    },
  ];
  navigate(
    ScreenNames.Payment as never,
    {
      products: params,
      type: ACTION_TYPE.BUYNOW,
    } as never
  );
  return true;
};

export const getReadyProduct = (product: any) => {
  let isReady = true;
  if (
    product?.isDeleted === true ||
    product?.isOutOfStock === true ||
    product?.distributorTotalQuantity === 0
  ) {
    isReady = false;
  }

  return isReady;
};

export const getInActiveItems = (carts: CartType[]) => {
  const newArr = carts?.map((el) => {
    return {
      ...el,
      items: el?.items?.filter(
        (el: CartProductType) =>
          el?.isOutOfStock === true || el?.isDeleted === true
      ),
    };
  });

  let newIds: string[] = [];
  newArr?.forEach((el) => {
    el?.items?.forEach((e) => {
      newIds.push(e?.distributorCartItemId || "");
    });
  });

  return newIds;
};
