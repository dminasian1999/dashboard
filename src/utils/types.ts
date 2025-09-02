export interface NavItemT {
  title: string
  route: string
  icon :string
  // subItems?: NavItemT[];
}

export interface CollectionT {
  id: string
  name: string
  description?: string
  image: string
}

// export interface ProductT {
//   id?: string
//   name: string
//   imageUrls: string[]
//   quantity: number
//   price: number
//   category: string
//   desc: string
//   dateCreated?: Date
// }
/** Local type for a variant row in the editable table */
export type VariantT = {
  id: string;
  size?: string;
  color?: string;
  material?: string;
  quantity: number;
  price: number;
  sku?: string;
};

export interface ProductT {
  id?: string
  name: string
  imageUrls: string[]
  quantity: number
  price: number
  category: string
  weight : number,
  size: string,
  color: string
  material: string
  desc: string
  dateCreated?: Date
}


export interface Adjustment {
  num: number
  add: boolean
  user: string
  date: Date
}

export interface InfoCardT {
  logo: string
  title: string
  subtitle: string
  btn: {
    title: string
    route: string
  }
}

export interface cartItem {
  productID: string

quantity: number
}

export interface QueryT {
  sortField?: string;
  asc?: boolean;
  id?: string;
  name?: string;
  category?: string;
  color?: string;
  material?: string
  desc?: string,
  minPrice?: number,
  maxPrice?: number,
  dateCreated?: Date,
  dateFrom?: Date,
  dateTo?: Date,
}
export interface UserProfile {

  firstName: string
  lastName: string
  login: string
  roles: string[]
  address?: AddressT
  cart: Cart,
  paymentMethod?:paymentMethodT,
  wishList?: string[]
  orders: OrderT[]
}

export type paymentMethodT = {
  cardname: string
  cardtype: string
  cardno: string
  cvv: string
  exdate: string
}

export interface UserRegister {
  login: string
  firstName: string
  lastName: string
  password: string
}

export interface UserEditData {
  firstName: string
  lastName: string
}

export interface UserUpdatePassword {
  newPassword: string
  oldPassword: string
}

export interface AddressT {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}
export interface ReceiptT {
  id: string
  name: string
  imageUrl: string
  quantity: number
  sell: number
  buy: number
  income: number
  seller: string
  category: string
  type: string
  desc: string
  dateCreated: Date
}



export interface OrderItemT {
  productId?: string
  quantity: number
  unitPrice: number
}
export interface OrderT {
  orderId?: string
  userId: string
  status?: string
  orderItems: OrderItemT[]
  shippingAddress: AddressT
  paymentMethod: string
  dateCreated?:  Date  // ISO string preferred when sending
}

// export interface OrderT {
//   orderId: string
//   userId: string
//   status?: string
//   orderItems: OrderItemT[]
//   totalAmount: number
//   shippingAddress: AddressT
//   paymentMethod: string
//   dateCreated: Date
// }


export interface Cart {
  userId: string
  items: CartItem[]
  shippingPrice: number
  totalPrice: number
}

export interface CartItem {
  cartItemId: string;
   product: ProductT;
  quantity : number;
}

export interface ShipmentTracking {
  id: string // UUID
  orderId: string // UUID
  courier: string // String
  trackingNumber: string // String
  status: "processing" | "shipped" | "in_transit" | "delivered"
  estimatedDelivery: Date // Date
}
