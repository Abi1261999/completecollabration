import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import ExportDropdown from './ExportDropdown'

const modalTabs = [
  { id: 'details', label: 'ORDER DETAILS' },
  { id: 'products', label: 'PRODUCTS' },
  { id: 'invoice', label: 'INVOICE' },
]

const defaultProducts = [
  { name: 'MacBook Pro 15 Retina Touch Bar MV902', price: '$2.500', quantity: 1, total: '$2.500' },
  { name: 'Apple Watch Series 5 Edition GPS + Cellular', price: '$1.500', quantity: 2, total: '$3.000' },
  { name: 'Apple iPhone 11 Pro Max 256GB Space Gray', price: '$1.100', quantity: 1, total: '$1.100' },
]

const defaultAddress = {
  firstName: 'Regina',
  lastName: 'Cooper',
  address: '993 E. Brewer St. Holtsville',
  state: 'New York',
  city: 'New York',
  country: 'United States',
  phone: '+1(070) 4567-8800',
  email: 'example@mail.com',
  postcode: '11742',
}

function buildOrderDetail(order) {
  const [firstName, ...rest] = (order.customer || 'Regina Cooper').split(' ')
  const lastName = rest.join(' ') || 'Cooper'

  return {
    orderNo: order.orderNo,
    customer: {
      name: order.customer,
      email: 'example@mail.com',
      phone: '+1(070) 4567-8800',
      location: '993 E. Brewer St. Holtsville',
    },
    payment: {
      method: order.payment || 'Credit Card',
      transactionId: '000001-TXHQ',
      amount: '$2.500',
      status: 'Paid',
    },
    shipping: {
      method: 'Carrier',
      trackingCode: 'FX-012345-6',
      date: '12.09.2019',
      fulfillmentStatus: order.status === 'Shipped' ? 'Delivered' : order.status === 'Processing' ? 'Processing' : 'Cancelled',
    },
    billingAddress: {
      ...defaultAddress,
      firstName: firstName || 'Regina',
      lastName: lastName || 'Cooper',
    },
    shippingAddress: {
      ...defaultAddress,
      firstName: firstName || 'Regina',
      lastName: lastName || 'Cooper',
    },
    products: defaultProducts,
    invoice: {
      number: order.orderNo.replace('#', ''),
      date: 'September 12, 2019',
      subtotal: '$6.600',
      tax: '$7.920',
      discount: '-$792',
      total: '$7.128',
    },
  }
}

export default function OrderDetailModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('details')
  const detail = buildOrderDetail(order)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-ink-100 pr-3 pt-2 sm:pr-4">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex min-w-max px-4 sm:px-6">
              {modalTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap px-3 py-4 text-xs font-semibold tracking-wide sm:px-4 sm:text-sm ${
                    activeTab === tab.id ? 'text-brand-dark' : 'text-ink-400 hover:text-ink-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id ? (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-dark" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          {activeTab === 'details' ? <OrderDetailsTab detail={detail} /> : null}
          {activeTab === 'products' ? <ProductsTab products={detail.products} /> : null}
          {activeTab === 'invoice' ? <InvoiceTab detail={detail} /> : null}
        </div>
      </div>
    </div>
  )
}

function TabHeader({ title, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-2xl font-semibold text-ink-900">{title}</h3>
      {children}
    </div>
  )
}

function OrderDetailsTab({ detail }) {
  const [billingOpen, setBillingOpen] = useState(true)
  const [shippingOpen, setShippingOpen] = useState(false)

  return (
    <div>
      <TabHeader title={`Orders ${detail.orderNo}`}>
        <ExportDropdown />
      </TabHeader>

      <section className="mb-8">
        <h4 className="mb-4 text-lg font-semibold text-ink-900">Customer</h4>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="pb-3 pr-4 font-semibold">Name</th>
                <th className="pb-3 pr-4 font-semibold">Email</th>
                <th className="pb-3 pr-4 font-semibold">Phone</th>
                <th className="pb-3 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-ink-600">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <CustomerAvatar name={detail.customer.name} />
                    <span className="font-medium text-ink-700">{detail.customer.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4">{detail.customer.email}</td>
                <td className="py-4 pr-4">{detail.customer.phone}</td>
                <td className="max-w-[180px] truncate py-4">{detail.customer.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_auto]">
        <MethodCard title="Payment method">
          <SelectField value={detail.payment.method} />
          <p className="mt-3 text-sm text-ink-400">Transaction ID: {detail.payment.transactionId}</p>
          <p className="text-sm text-ink-400">Amount: {detail.payment.amount}</p>
        </MethodCard>

        <MethodCard title="Shipping method">
          <SelectField value={detail.shipping.method} />
          <p className="mt-3 text-sm text-ink-400">Tracking Code: {detail.shipping.trackingCode}</p>
          <p className="text-sm text-ink-400">Date: {detail.shipping.date}</p>
        </MethodCard>

        <div className="rounded-xl bg-ink-50 p-5 lg:min-w-[220px]">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-ink-400">Fulfilment status</p>
              <SelectField value={detail.shipping.fulfillmentStatus} />
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-400">Payment status</p>
              <SelectField value={detail.payment.status} />
            </div>
          </div>
        </div>
      </section>

      <AddressAccordion
        title="Billing address"
        open={billingOpen}
        onToggle={() => setBillingOpen((value) => !value)}
        address={detail.billingAddress}
      />
      <AddressAccordion
        title="Shipping address"
        open={shippingOpen}
        onToggle={() => setShippingOpen((value) => !value)}
        address={detail.shippingAddress}
        className="mt-4"
      />
    </div>
  )
}

function ProductsTab({ products }) {
  return (
    <div>
      <TabHeader title="Products">
        <ExportDropdown />
      </TabHeader>
      <ProductTable products={products} />
    </div>
  )
}

function InvoiceTab({ detail }) {
  return (
    <div>
      <TabHeader title="Invoice">
        <ExportDropdown />
      </TabHeader>

      <div className="mb-8 grid grid-cols-1 gap-6 border-b border-ink-100 pb-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
        <div className="flex h-28 w-36 items-center justify-center rounded-xl bg-[#ff8a80] p-4 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">Invoice</p>
            <p className="mt-1 text-lg font-bold">{detail.invoice.number}</p>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-ink-500">
          <p className="font-semibold text-ink-700">ROCKET INC.</p>
          <p>44 Shirley Ave. West Chicago, IL 60185, Boston, MA 02110</p>
          <p>+1(070) 123-4567</p>
          <p>example@mail.com</p>
          <p>www.rocketinc.com</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-ink-400">{detail.invoice.date}</p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <FlowerLogo />
            <span className="text-lg font-bold tracking-wide text-ink-900">FLOWER</span>
          </div>
        </div>
      </div>

      <ProductTable products={detail.products} />

      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-xs space-y-3 text-sm">
          <SummaryRow label="SUBTOTAL" value={detail.invoice.subtotal} />
          <SummaryRow label="TAX(20%)" value={detail.invoice.tax} />
          <SummaryRow label="DISCOUNT" value={detail.invoice.discount} />
          <div className="flex items-center justify-between border-t border-ink-100 pt-3 text-base font-semibold text-ink-900">
            <span>TOTAL</span>
            <span>{detail.invoice.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
            <th className="pb-3 pr-4 font-semibold">Product</th>
            <th className="pb-3 pr-4 text-center font-semibold">Price</th>
            <th className="pb-3 pr-4 text-center font-semibold">Quantity</th>
            <th className="pb-3 text-right font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name} className="border-b border-ink-100 text-ink-600 last:border-b-0">
              <td className="py-4 pr-4 font-medium text-ink-700">{product.name}</td>
              <td className="py-4 pr-4 text-center">{product.price}</td>
              <td className="py-4 pr-4 text-center">{product.quantity}</td>
              <td className="py-4 text-right font-medium text-ink-700">{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MethodCard({ title, children }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-ink-700">{title}</p>
      {children}
    </div>
  )
}

function SelectField({ value }) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled
        className="h-11 w-full cursor-default appearance-none rounded-xl border border-ink-100 bg-white px-4 pr-10 text-sm text-ink-700 outline-none"
      >
        <option>{value}</option>
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

function AddressAccordion({ title, open, onToggle, address, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink-100 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-ink-900 hover:bg-ink-50"
      >
        {title}
        {open ? <ChevronUp size={18} className="text-ink-400" /> : <ChevronDown size={18} className="text-ink-400" />}
      </button>
      {open ? (
        <div className="border-t border-ink-100 px-5 py-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AddressColumn
              items={[
                ['First name', address.firstName],
                ['Last name', address.lastName],
                ['Address', address.address],
              ]}
            />
            <AddressColumn
              items={[
                ['State/Region', address.state],
                ['City', address.city],
                ['Country', address.country],
              ]}
            />
            <AddressColumn
              items={[
                ['Phone', address.phone],
                ['Email', address.email],
                ['Postcode', address.postcode],
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function AddressColumn({ items }) {
  return (
    <div className="space-y-4">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="text-sm text-ink-400">{label}</p>
          <p className="mt-1 text-sm font-medium text-ink-700">{value}</p>
        </div>
      ))}
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-ink-500">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function CustomerAvatar({ name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-teal text-sm font-semibold text-white">
      {initials}
    </div>
  )
}

function FlowerLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-green via-brand-teal to-emerald-400">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3c-1.5 2.2-4.4 2.5-5.8 4.8C4.8 10 5.6 13 8 14.2c-2.4 1.2-3.2 4.2-1.8 6.4C7.6 22.5 10.5 22.8 12 21c1.5 1.8 4.4 1.5 5.8-.4 1.4-2.2.6-5.2-1.8-6.4 2.4-1.2 3.2-4.2 1.8-6.4C16.4 5.5 13.5 5.2 12 3z"
        />
      </svg>
    </div>
  )
}
