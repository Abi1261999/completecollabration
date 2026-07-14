import { useState } from 'react'
import { Check, ChevronDown, Pencil, X } from 'lucide-react'

const modalTabs = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'address', label: 'ADDRESS' },
  { id: 'payment', label: 'PAYMENT' },
  { id: 'submission', label: 'SUBMISSION' },
]

const countryOptions = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France']
const statusOptions = ['Active', 'Blocked']
const monthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'))
const yearOptions = Array.from({ length: 12 }, (_, index) => String(2020 + index))

const defaultForm = {
  firstName: 'Regina',
  lastName: 'Cooper',
  email: 'regina_cooper@mail.com',
  phone: '(070) 4567-8800',
  status: 'Active',
  addressLine1: '993 E. Brewer St. Holtsville',
  addressLine2: '',
  city: 'New York',
  country: 'United States',
  state: 'New York',
  postcode: '11742',
  paymentMethod: 'credit-card',
  cardNumber: '5890 - 6858 - 6332 - 9843',
  cardName: 'Regina Cooper',
  cardMonth: '12',
  cardYear: '2023',
}

const tabOrder = ['profile', 'address', 'payment', 'submission']

export default function CustomerFormModal({ onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [form, setForm] = useState(defaultForm)

  const updateForm = (patch) => {
    setForm((current) => ({ ...current, ...patch }))
  }

  const currentIndex = tabOrder.indexOf(activeTab)

  const goNext = () => {
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const goPrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  const handleSubmit = () => {
    onSubmit?.(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
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
          {activeTab === 'profile' ? <ProfileTab form={form} onFormChange={updateForm} /> : null}
          {activeTab === 'address' ? <AddressTab form={form} onFormChange={updateForm} /> : null}
          {activeTab === 'payment' ? <PaymentTab form={form} onFormChange={updateForm} /> : null}
          {activeTab === 'submission' ? <SubmissionTab form={form} /> : null}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-ink-100 px-5 py-5 sm:px-8">
          {activeTab === 'profile' ? (
            <span />
          ) : (
            <button
              type="button"
              onClick={goPrevious}
              className="rounded-xl border border-ink-200 bg-white px-6 py-2.5 text-sm font-medium text-ink-500 hover:bg-ink-50"
            >
              Previous
            </button>
          )}

          {activeTab === 'submission' ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="ml-auto rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-green"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className={`rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-green ${
                activeTab === 'profile' ? 'ml-auto' : ''
              }`}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ form, onFormChange }) {
  const initials = `${form.firstName?.[0] || ''}${form.lastName?.[0] || ''}`.toUpperCase()

  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Profile</h3>

      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-ink-200 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-2xl font-semibold text-white">
              {initials}
            </div>
          </div>
          <button
            type="button"
            className="absolute -right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-500 shadow-card hover:bg-ink-50"
            aria-label="Edit photo"
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ModalField label="First Name">
            <input
              value={form.firstName}
              onChange={(event) => onFormChange({ firstName: event.target.value })}
              className={inputClass}
            />
          </ModalField>
          <ModalField label="Last Name">
            <input
              value={form.lastName}
              onChange={(event) => onFormChange({ lastName: event.target.value })}
              className={inputClass}
            />
          </ModalField>
        </div>

        <ModalField label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(event) => onFormChange({ email: event.target.value })}
            className={inputClass}
          />
        </ModalField>

        <ModalField label="Phone">
          <div className="flex gap-3">
            <div className="flex h-12 w-24 shrink-0 items-center justify-center gap-1 rounded-xl border border-ink-100 bg-ink-50 text-sm text-ink-600">
              <span>🇺🇸</span>
              <span>+1</span>
              <ChevronDown size={14} className="text-ink-400" />
            </div>
            <input
              value={form.phone}
              onChange={(event) => onFormChange({ phone: event.target.value })}
              className={inputClass}
            />
          </div>
        </ModalField>

        <ModalField label="Status">
          <SelectField
            value={form.status}
            options={statusOptions}
            onChange={(value) => onFormChange({ status: value })}
          />
        </ModalField>
      </div>
    </div>
  )
}

function AddressTab({ form, onFormChange }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Address</h3>
      <div className="space-y-5">
        <ModalField label="Address Line 1">
          <input
            value={form.addressLine1}
            onChange={(event) => onFormChange({ addressLine1: event.target.value })}
            className={inputClass}
          />
        </ModalField>

        <ModalField label="Address Line 2">
          <input
            value={form.addressLine2}
            onChange={(event) => onFormChange({ addressLine2: event.target.value })}
            placeholder="Optional"
            className={inputClass}
          />
        </ModalField>

        <ModalField label="City">
          <input
            value={form.city}
            onChange={(event) => onFormChange({ city: event.target.value })}
            className={inputClass}
          />
        </ModalField>

        <ModalField label="Country">
          <SelectField
            value={form.country}
            options={countryOptions}
            onChange={(value) => onFormChange({ country: value })}
          />
        </ModalField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ModalField label="State/Region">
            <input
              value={form.state}
              onChange={(event) => onFormChange({ state: event.target.value })}
              className={inputClass}
            />
          </ModalField>
          <ModalField label="Postcode">
            <input
              value={form.postcode}
              onChange={(event) => onFormChange({ postcode: event.target.value })}
              className={inputClass}
            />
          </ModalField>
        </div>
      </div>
    </div>
  )
}

function PaymentTab({ form, onFormChange }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Payment</h3>

      <p className="mb-4 text-sm text-ink-400">Choose payment method:</p>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PaymentMethodCard
          label="Credit Card"
          selected={form.paymentMethod === 'credit-card'}
          onSelect={() => onFormChange({ paymentMethod: 'credit-card' })}
        />
        <PaymentMethodCard
          label="PayPal"
          selected={form.paymentMethod === 'paypal'}
          onSelect={() => onFormChange({ paymentMethod: 'paypal' })}
        />
      </div>

      {form.paymentMethod === 'credit-card' ? (
        <div className="space-y-5">
          <ModalField label="Card Number">
            <div className="relative">
              <input
                value={form.cardNumber}
                onChange={(event) => onFormChange({ cardNumber: event.target.value })}
                className={`${inputClass} pr-14`}
              />
              <MastercardIcon />
            </div>
          </ModalField>

          <ModalField label="Card Holder">
            <input
              value={form.cardName}
              onChange={(event) => onFormChange({ cardName: event.target.value })}
              className={inputClass}
            />
          </ModalField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ModalField label="Month">
              <SelectField
                value={form.cardMonth}
                options={monthOptions}
                onChange={(value) => onFormChange({ cardMonth: value })}
              />
            </ModalField>
            <ModalField label="Year">
              <SelectField
                value={form.cardYear}
                options={yearOptions}
                onChange={(value) => onFormChange({ cardYear: value })}
              />
            </ModalField>
          </div>
        </div>
      ) : (
        <p className="rounded-xl border border-ink-100 bg-ink-50 px-4 py-6 text-sm text-ink-500">
          You will be redirected to PayPal to complete payment after submission.
        </p>
      )}
    </div>
  )
}

function SubmissionTab({ form }) {
  const fullName = `${form.firstName} ${form.lastName}`.trim()
  const phone = `+1 ${form.phone}`

  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Submission</h3>

      <div className="space-y-6">
        <SummarySection title="Profile">
          <SummaryItem label="Name" value={fullName} />
          <SummaryItem label="Email" value={form.email} />
          <SummaryItem label="Phone" value={phone} />
        </SummarySection>

        <SummarySection title="Address">
          <SummaryItem label="Address Line 1" value={form.addressLine1} />
          <SummaryItem label="City" value={form.city} />
          <SummaryItem label="Country" value={form.country} />
          <SummaryItem label="State/Region" value={form.state} />
          <SummaryItem label="Postcode" value={form.postcode} />
        </SummarySection>

        <SummarySection title="Payment">
          {form.paymentMethod === 'credit-card' ? (
            <>
              <SummaryItem label="Card Number" value={form.cardNumber} />
              <SummaryItem label="Card Name" value={form.cardName} />
              <SummaryItem label="Card Expiry" value={`${form.cardMonth}/${form.cardYear}`} />
            </>
          ) : (
            <SummaryItem label="Payment Method" value="PayPal" />
          )}
        </SummarySection>
      </div>
    </div>
  )
}

function PaymentMethodCard({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left transition-colors ${
        selected ? 'border-brand-dark bg-brand-green/5' : 'border-ink-100 bg-white hover:bg-ink-50'
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
          selected ? 'border-brand-dark bg-brand-dark text-white' : 'border-ink-200 bg-white'
        }`}
      >
        {selected ? <Check size={12} strokeWidth={3} /> : null}
      </span>
      <span className="text-sm font-medium text-ink-700">{label}</span>
    </button>
  )
}

function SummarySection({ title, children }) {
  return (
    <section className="border-b border-ink-100 pb-6 last:border-b-0">
      <h4 className="mb-4 text-base font-semibold text-ink-900">{title}</h4>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="text-sm text-ink-400">{label}:</span>
      <span className="text-sm font-medium text-ink-700 sm:text-right">{value}</span>
    </div>
  )
}

function ModalField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ink-400">{label}</span>
      {children}
    </label>
  )
}

function SelectField({ value, options, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-ink-100 bg-white px-4 pr-10 text-sm text-ink-700 outline-none hover:bg-ink-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

function MastercardIcon() {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center" aria-hidden="true">
      <span className="h-5 w-5 rounded-full bg-red-500 opacity-90" />
      <span className="-ml-2 h-5 w-5 rounded-full bg-amber-400 opacity-90" />
    </div>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-ink-100 bg-white px-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 hover:bg-ink-50 focus:border-brand-dark/40'
