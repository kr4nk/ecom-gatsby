// Product

export interface IncProductVersion {
  id: string;
  productId: string;
  sku: string;
  size: number;
  unit: string;
  price: number;
  isPublished: boolean;
  isUsed: boolean;
}

export interface IncBreakpoint {
  path: string;
  blur?: string;
  type: string;
  media: string;
  width: number;
  height: number;
}

export interface IncProductImage {
  src: string;
  alt: string;
  breakpoints: IncBreakpoint[];
}

export interface IncProductFile {
  src: string;
  name: string;
  desc: string;
}

export interface IncProductShort {
  id: string;
  name: string;
  slug: string;
  manufacturerId: string;
  isPublished: boolean;
  images: IncProductImage[];
  versions: IncProductVersion[];
  exclusive?: string[];
}

export interface IncProduct {
  id: string;
  name: string;
  slug: string;
  manufacturerId: string;
  descShort: string;
  descFull: string;
  details: string;
  certificates: string[];
  exclusive?: string[];
  files: IncProductFile[];
  versions: IncProductVersion[];
  images: IncProductImage[];
  groups: IncGroupProduct[];
  categories: string[];
  seoTitle: string;
  seoDesc: string;
  rating: number;
  isBestseller: boolean;
  isPublished: boolean;
  isUsed: boolean;
}

// Category

export interface IncCategoryShort {
  parentId: string;
  id: string;
  name: string;
  slug: string;
  sort: number;
  isPublished: boolean;
}

export interface IncCategory {
  parentId: string;
  id: string;
  slug: string;
  name: string;
  desc: string;
  seoTitle: string;
  seoDesc: string;
  sort: number;
  isPublished: boolean;
  isUsed: boolean;
  products: string[];
}

export interface IncCategoryProduct {
  categoryId: string;
  productId: string;
}

// Manufacturer

export interface IncManufacturer {
  id: string;
  url: string;
  name: string;
  slug: string;
  descShort: string;
  descFull: string;
  seoTitle: string;
  seoDesc: string;
}

export interface IncManufacturerShort {
  id: string;
  name: string;
  slug: string;
}

// Certificate

export interface IncCertificateShort {
  id: string;
  abbr: string;
  name: string;
  icon: string;
  slug: string;
  descShort: string;
  url: string;
  sort: number;
}

export type IncCertificate = IncCertificateShort & {
  descFull: string;
  seoTitle: string;
  seoDesc: string;
}

// Warehouse

export interface IncWarehouse {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  state: string;
  phone: string;
  zip: string;
  postOfficeBox?: string;
  isActive: boolean;
}

// SiteDocument

export interface IncSiteDocument {
  id: string;
  src: string;
  name: string;
  type: string;
  size: number;
  date: number;
  section: string;
  namespace: string;
}

// Group

export interface IncGroup {
  id: string;
  name: string;
  slug: string;
  desc: string;
}

export type IncGroupItem = IncGroup & {
  numberOfUsers: number;
}

export interface IncGroupUser {
  groupId: string;
  userId: string;
}

export interface IncGroupProduct {
  groupId: string;
  productId: string;
  versionId: string;
  discount: number;
}

// User

export interface IncUserShort {
  id: string;
  role: number;
  createdAt: number;
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessPhone: string;
}

export interface IncUser {
  id: string;
  role: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  businessPhone: string;
  isAddressVerified: boolean;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  isVerified: boolean;
  note: string;
  groups: string[];
  fileResellersPermit: string;
  resellersPermitUntil: number;
  fileTaxExemptionForm: string;
  taxExemptionUntil: number;
}

// Order

export interface ResultGetOrder {
  order: IncOrder;
  products: IncOrderProductVersion[];
  events: IncOrderEvent[];
  refunds: IncOrderRefund[];
}

export interface IncOrderShort {
  id: string;
  userId: string;
  customerName: string;
  managerId: string;
  managerName: string;
  status: number;
  isPaid: boolean;
  updatedAt: number;
  pendingAt: number;
  processingAt: number;
  shippedAt: number;
  completeAt: number;
  canceledAt: number;
  refundAt: number;
  refundedAt: number;
  paymentAt: number;
  totalCost: number;
}

export interface IncOrdersDashboard {
  [key: string]: IncOrderShort[] | undefined;
}

export interface IncAddress {
  country: string;
  state: string;
  city: string;
  zip: string;
  addressLine1: string;
  addressLine2?: string;
}

export interface IncProductTax {
  id: string;
  amount: number;
}

export interface IncOrder {
  id: string;
  userId: string;
  status: number;
  managerId?: string;
  shipping: string;
  shippingAddress: IncAddress;
  warehouseId?: string;
  productsCost: number;
  shippingCost: number;
  taxesValue: number;
  taxes: IncProductTax[];
  totalCost: number;
  payment: string;
  quarterOfYear: number;
  updatedAt: number;
  pendingAt: number;
  processingAt: number;
  shippedAt: number;
  completeAt: number;
  canceledAt: number;
  refundAt: number;
  refundedAt: number;
  isPaid: boolean;
  paymentAt: number;
  estimateDeliveryDate: string;
  user: IncUser;
}

export interface IncOrderEvent {
  eventId: string;
  orderId: string;
  createdAt: number;
  userId: string;
  userName: string;
  action: string;
  message?: string;
}

export interface IncOrderProductVersion {
  productId: string;
  versionId: string;
  name: string;
  slug: string;
  images: IncProductImage[];
  certificates: string[];
  manufacturerName: string;
  manufacturerSlug: string;
  sku: string;
  size: number;
  unit: string;
  price: number;
  quantity: number;
  refunded: number;
  discount: number;
  purchasePrice: number;
}

// Refund

export interface IncOrderRefundEvent {
  id: string;
  refundId: string;
  createdAt: number;
  actorId: string;
  actorName: string;
  action: string;
  message?: string;
}

export interface IncOrderRefundProduct {
  versionId: string;
  quantity: number;
}

export interface IncOrderRefund {
  id: string;
  orderId: string;
  createdAt: number;
  products: IncOrderRefundProduct[];
  productsCost: number;
  taxesValue: number;
  totalCost: number;
  status: string;
}

// Namespace User

// Cart

export interface IncCartProductVersion {
  versionId: string;
  value: number;
}

export interface IncCartProduct {
  productId: string;
  versions: IncCartProductVersion[];
}

export interface IncCart {
  orderId: string;
  items: IncCartProduct[];
}

// Order

export interface IncUserOrderProduct {
  orderId: string;
  productId: string;
  versionId: string;
  value: number;
}

// Group

export interface IncUserGroupProduct {
  productId: string;
  versionId: string;
  discount: number;
}

export interface IncUserGroup {
  groupId: string;
  products: IncUserGroupProduct[];
}
