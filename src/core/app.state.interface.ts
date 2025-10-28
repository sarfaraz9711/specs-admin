/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// This should hold the AppState interface
// Ideally importing all the substate for the application
import { AuthState } from './admin/auth/reducer/auth.state';
import { CommonState } from './admin/logout/reducer/common.state';
import { Media } from './admin/catalog/media/reducer/media.state';
import { CategoriesState } from './admin/catalog/category/reducer/categories.state';
import { CouponState } from './admin/catalog/coupon/reducer/coupon.state';
import { BrandState } from './admin/catalog/brand/reducer/brand.state';
import { ChangePasswordState } from './admin/profile/changepassword/changepassword-store/changepassword.state';
import { CustomerState } from './admin/Customers/customers/customer-reducer/customer.state';
import { CustomersGroupState } from './admin/Customers/customers-group/customers-group-reducer/customers-group.state';
import { OrderStatusState } from './admin/settings/localizations/orderstatus/orderstatus-reducer/orderstatus.state';
import { CountryState } from './admin/settings/localizations/country/country-reducer/country.state';
import { ZoneState } from './admin/settings/localizations/zone/zone-reducer/zone.state';
import { LocationState } from './admin/settings/localizations/location/location-reducer/location.state';
import { RoleState } from './admin/settings/role/role-reducer/role.state';
import { PermissionState } from './admin/settings/permission/permission-reducer/permission.state';
import { PageState } from './admin/cms/pages/pages-reducer/page.state';
import { UserState } from './admin/settings/user/user-reducer/user.state';
import { BannerState } from './admin/cms/banners/banner-store/banner.state';
import { LanguageState } from './admin/settings/localizations/languages/languages-reducer/languages.state';
import { EmailTempState } from './admin/settings/localizations/emailtemplate/emailtemp-reducer/emailtemp.state';
import { StockState } from './admin/settings/localizations/stockStatus/stock-reducer/stock.state';
import { SalesOrderState } from './admin/sales/orders/orders-reducer/orders.state';
import { EditprofileState } from './admin/profile/editprofile/store/editprofile.state';
import { ProductState } from './admin/catalog/product/product-reducer/product.state';
import { CurrencyState } from './admin/settings/localizations/currency/currency-reducer/currency.state';
import { DashboardState } from './admin/dashboard/reducer/dashboard.state';
import { GeneralsettingState } from './admin/settings/generalsetting/generalsetting-reducer/generalsetting.state';
import { SocialState } from './admin/settings/siteSettings/social/social-reducer/social.state';
import { SeosettingState } from './admin/settings/siteSettings/seo/seo-reducer/seo-state';
import { CatalogLayoutState } from './admin/catalog/layout/reducer/layout.state';
import { CustomerLayoutState } from './admin/Customers/layout/reducer/layout.state';
import { ContactUsLayoutState } from './admin/PublicForms/layout/reducer/layout.state';
import { SalesLayoutState } from './admin/sales/layout/reducer/layout.state';
import { PersonalizeProductState } from './admin/settings/personalize/product/product-reducer/product-state';
import { PersonalizeOrderState } from './admin/settings/personalize/order/order-reducer/order-state';
import { RatingReviewState } from './admin/catalog/ratingReview/ratingReview-reducer/ratingReview.state';
import { LayoutState } from './admin/layout/reducer/layout.state';
import { BlogState } from './admin/cms/blogs/blogs-store/blog.state';
import { TaxState } from './admin/settings/localizations/tax/tax-reducer/tax.state';
import { SalesPaymentState } from './admin/sales/payments/payments-reducer/payments.state';
import { ImportState } from './admin/catalog/import/reducer/import.state';
import { SalesCancelOrderState } from './admin/sales/cancel-orders/reducer/cancel-order.state';
import { InventoryProductState } from './admin/sales/inventory-products/reducer/inventory-products.state';
import { ArchivePaymentState } from './admin/sales/archive-payments/reducer/archive-payments.state';
import { QuotationRequestState } from './admin/sales/quotation-request/reducer/quotation-request.state';
import { BackorderListState } from './admin/sales/backorder-list/reducer/backorder-list.state';
import { SalesFailedOrderState } from './admin/sales/failed-order/failed-order-reducer/failed-order.state';
import { WidgetState } from './admin/cms/widgets/widgets-reducer/widgets.state';
import { SizeChartState } from './admin/settings/siteSettings/sizechart/sizechart-reducer/sizechart.state';
import { VariantsState } from './admin/settings/siteSettings/variants/variants-reducer/variants.state';
import { PageGroupState } from './admin/cms/page-group/page-group-reducer/page-group.state';
import { AuditLogState } from './admin/reports/audit-log/reducer/audit-log.state';
import { SalesReportState } from './admin/reports/sales-report/reducer/sales-report.state';
import { FeedbackState } from './admin/PublicForms/feedback/feedback-reducer/feedback.state'

/**
 *
 *
 * @export
 * @ interface AppState
 */
export interface AppState {
  auth: AuthState;
  common: CommonState;
  auditLog: AuditLogState;
  media: Media;
  categories: CategoriesState;
  coupon: CouponState;
  brand: BrandState;
  product: ProductState;
  changepassword: ChangePasswordState;
  customer: CustomerState;
  customersGroup: CustomersGroupState;
  orderStatus: OrderStatusState;
  country: CountryState;
  zone: ZoneState;
  location: LocationState;
  role: RoleState;
  permission: PermissionState;
  pages: PageState;
  user: UserState;
  banner: BannerState;
  language: LanguageState;
  emailtemp: EmailTempState;
  stockstatus: StockState;
  salesorder: SalesOrderState;
  editprofile: EditprofileState;
  currency: CurrencyState;
  tax: TaxState;
  dashboard: DashboardState;
  generalsetting: GeneralsettingState;
  social: SocialState;
  seosetting: SeosettingState;
  catalogLayout: CatalogLayoutState;
  customerLayout: CustomerLayoutState;
  contactUsLayout: ContactUsLayoutState
  salesLayout: SalesLayoutState;
  personalizeProduct: PersonalizeProductState;
  personalizeOrder: PersonalizeOrderState;
  ratingReview: RatingReviewState;
  layout: LayoutState;
  blog: BlogState;
  salesPayment: SalesPaymentState;
  import: ImportState;
  salesCancelOrder: SalesCancelOrderState;
  inventoryProduct: InventoryProductState;
  archivePayment: ArchivePaymentState;
  quotationRequest: QuotationRequestState;
  backorderList: BackorderListState;
  salesFailedOrder: SalesFailedOrderState;
  widgets: WidgetState;
  variants: VariantsState;
  sizechart: SizeChartState;
  pageGroup: PageGroupState;
  salesReport: SalesReportState;
  feedback: FeedbackState
}
