import { useState } from 'react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  ChevronUp,
  CloudUpload,
  GripVertical,
  Image as ImageIcon,
  Italic,
  Trash2,
  Type,
  Underline,
  X,
} from 'lucide-react'

const modalTabs = [
  { id: 'information', label: 'INFORMATION' },
  { id: 'images', label: 'IMAGES' },
  { id: 'pricing', label: 'PRICING' },
  { id: 'inventory', label: 'INVENTORY' },
  { id: 'shipping', label: 'SHIPPING' },
]

const categoryOptions = ['Phone', 'Notebook', 'Watch', 'Tablet', 'Accessory']
const taxRuleOptions = ['US-AL Rate (4%)', 'US-CA Rate (7.25%)', 'US-NY Rate (8%)', 'No Tax (0%)']

const seedImages = [
  { id: 'img-1', position: 1, isCover: true },
  { id: 'img-2', position: 2, isCover: false },
  { id: 'img-3', position: 3, isCover: false },
]

const defaultForm = {
  name: 'Apple iPhone 11 Pro Max 64GB Midnight Green',
  description: '',
  category: 'Phone',
  tags: ['Apple', 'iPhone', '64GB'],
  taxExcludedPrice: '2.500',
  taxIncludedPrice: '0.00',
  taxRule: 'US-AL Rate (4%)',
  unitPrice: '0.00',
  unitPer: '0',
  sku: '0',
  quantity: '0',
  width: '',
  height: '',
  depth: '',
  weight: '',
  extraShippingFee: '0.00',
}

export default function ProductFormModal({ onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('information')
  const [form, setForm] = useState(defaultForm)
  const [tagInput, setTagInput] = useState('')
  const [images, setImages] = useState(seedImages)
  const [draggingId, setDraggingId] = useState(null)

  const updateForm = (patch) => {
    setForm((current) => ({ ...current, ...patch }))
  }

  const removeTag = (tag) => {
    updateForm({ tags: form.tags.filter((item) => item !== tag) })
  }

  const addTag = (event) => {
    if (event.key !== 'Enter' && event.type !== 'blur') return
    const value = tagInput.trim()
    if (!value || form.tags.includes(value)) {
      setTagInput('')
      return
    }
    updateForm({ tags: [...form.tags, value] })
    setTagInput('')
  }

  const setCoverImage = (imageId) => {
    setImages((current) => current.map((image) => ({ ...image, isCover: image.id === imageId })))
  }

  const deleteImage = (imageId) => {
    setImages((current) => {
      const next = current.filter((image) => image.id !== imageId)
      const hadCover = current.find((image) => image.id === imageId)?.isCover
      const reordered = next.map((image, index) => ({ ...image, position: index + 1 }))
      if (hadCover && reordered.length > 0) {
        reordered[0] = { ...reordered[0], isCover: true }
      }
      return reordered
    })
  }

  const reorderImages = (fromId, toId) => {
    if (!fromId || !toId || fromId === toId) return
    setImages((current) => {
      const fromIndex = current.findIndex((image) => image.id === fromId)
      const toIndex = current.findIndex((image) => image.id === toId)
      if (fromIndex < 0 || toIndex < 0) return current
      const next = [...current]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next.map((image, index) => ({ ...image, position: index + 1 }))
    })
  }

  const handleSave = () => {
    onSave?.({ ...form, images })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="shrink-0 border-b border-ink-100">
          <div className="overflow-x-auto">
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
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          {activeTab === 'information' ? (
            <InformationTab
              form={form}
              tagInput={tagInput}
              onFormChange={updateForm}
              onTagInputChange={setTagInput}
              onRemoveTag={removeTag}
              onAddTag={addTag}
            />
          ) : null}
          {activeTab === 'images' ? (
            <ImagesTab
              images={images}
              draggingId={draggingId}
              onSetCover={setCoverImage}
              onDelete={deleteImage}
              onDragStart={setDraggingId}
              onDragEnd={() => setDraggingId(null)}
              onDrop={reorderImages}
            />
          ) : null}
          {activeTab === 'pricing' ? <PricingTab form={form} onFormChange={updateForm} /> : null}
          {activeTab === 'inventory' ? <InventoryTab form={form} onFormChange={updateForm} /> : null}
          {activeTab === 'shipping' ? <ShippingTab form={form} onFormChange={updateForm} /> : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3 border-t border-ink-100 px-5 py-5 sm:px-8">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-green"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-ink-200 bg-white px-6 py-2.5 text-sm font-medium text-ink-500 hover:bg-ink-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function InformationTab({ form, tagInput, onFormChange, onTagInputChange, onRemoveTag, onAddTag }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Information</h3>
      <div className="space-y-5">
        <ModalField label="Product Name">
          <input
            value={form.name}
            onChange={(event) => onFormChange({ name: event.target.value })}
            className={inputClass}
          />
        </ModalField>

        <ModalField label="Description">
          <div className="overflow-hidden rounded-xl border border-ink-100">
            <div className="flex flex-wrap items-center gap-1 border-b border-ink-100 bg-ink-50 px-3 py-2">
              <ToolbarButton icon={Type} label="Font size" />
              <ToolbarButton icon={Bold} label="Bold" />
              <ToolbarButton icon={Italic} label="Italic" />
              <ToolbarButton icon={Underline} label="Underline" />
              <span className="mx-1 h-5 w-px bg-ink-200" />
              <ToolbarButton icon={AlignLeft} label="Align left" />
              <ToolbarButton icon={AlignCenter} label="Align center" />
              <ToolbarButton icon={AlignRight} label="Align right" />
              <ToolbarButton icon={AlignJustify} label="Justify" />
            </div>
            <textarea
              value={form.description}
              onChange={(event) => onFormChange({ description: event.target.value })}
              placeholder="Type something"
              rows={5}
              className="w-full resize-y bg-white px-4 py-3 text-sm text-ink-700 outline-none placeholder:text-ink-400"
            />
          </div>
        </ModalField>

        <ModalField label="Category">
          <SelectField
            value={form.category}
            options={categoryOptions}
            onChange={(value) => onFormChange({ category: value })}
          />
        </ModalField>

        <ModalField label="Tags">
          <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-1 text-sm text-ink-600"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-ink-400 hover:text-ink-700"
                  aria-label={`Remove ${tag}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(event) => onTagInputChange(event.target.value)}
              onKeyDown={onAddTag}
              onBlur={onAddTag}
              placeholder={form.tags.length === 0 ? 'Add tags...' : ''}
              className="min-w-[80px] flex-1 bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
            />
          </div>
        </ModalField>
      </div>
    </div>
  )
}

function ImagesTab({ images, draggingId, onSetCover, onDelete, onDragStart, onDragEnd, onDrop }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Images</h3>

      <div className="mb-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 px-6 py-10 text-center">
        <CloudUpload size={36} className="mb-3 text-ink-300" strokeWidth={1.5} />
        <p className="text-sm text-ink-500">
          Drag and Drop or{' '}
          <button type="button" className="font-medium text-brand-dark hover:text-brand-green">
            Browse
          </button>{' '}
          to upload.
        </p>
      </div>

      <div className="hidden grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-2 pb-3 text-xs font-semibold uppercase tracking-wide text-ink-400 sm:grid">
        <span className="w-6" />
        <span>Image</span>
        <span className="w-20 text-center">Position</span>
        <span className="w-16 text-center">Cover</span>
        <span className="w-8" />
      </div>

      <div className="space-y-3">
        {images.map((image) => (
          <div
            key={image.id}
            draggable
            onDragStart={() => onDragStart(image.id)}
            onDragEnd={onDragEnd}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => onDrop(draggingId, image.id)}
            className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 rounded-xl border border-ink-100 bg-white p-3 sm:gap-4 sm:p-4 ${
              draggingId === image.id ? 'opacity-60' : ''
            }`}
          >
            <button
              type="button"
              className="cursor-grab text-ink-300 hover:text-ink-500 active:cursor-grabbing"
              aria-label="Drag to reorder"
            >
              <GripVertical size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-300">
                <ImageIcon size={22} />
              </div>
              <span className="text-sm text-ink-400 sm:hidden">Image {image.position}</span>
            </div>

            <div className="flex justify-center">
              <span className="inline-flex min-w-[2rem] items-center justify-center rounded-lg bg-ink-100 px-2.5 py-1 text-sm font-medium text-ink-500">
                {image.position}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onSetCover(image.id)}
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  image.isCover ? 'border-brand-dark bg-brand-dark text-white' : 'border-ink-200 bg-white'
                }`}
                aria-label={image.isCover ? 'Cover image' : 'Set as cover'}
                aria-pressed={image.isCover}
              >
                {image.isCover ? <Check size={12} strokeWidth={3} /> : null}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onDelete(image.id)}
              className="text-ink-300 hover:text-ink-500"
              aria-label="Delete image"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingTab({ form, onFormChange }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Pricing</h3>
      <div className="space-y-5">
        <ModalField label="Tax Excluded Price">
          <CurrencyInput
            value={form.taxExcludedPrice}
            onChange={(value) => onFormChange({ taxExcludedPrice: value })}
          />
        </ModalField>

        <ModalField label="Tax Included Price">
          <CurrencyInput
            value={form.taxIncludedPrice}
            onChange={(value) => onFormChange({ taxIncludedPrice: value })}
          />
        </ModalField>

        <ModalField
          label="Tax Rule"
          action={
            <button type="button" className="text-sm font-medium text-brand-dark hover:text-brand-green">
              Create New Tax
            </button>
          }
        >
          <SelectField
            value={form.taxRule}
            options={taxRuleOptions}
            onChange={(value) => onFormChange({ taxRule: value })}
          />
        </ModalField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <ModalField label="Unit Price">
            <CurrencyInput value={form.unitPrice} onChange={(value) => onFormChange({ unitPrice: value })} />
          </ModalField>
          <span className="hidden pb-3 text-ink-300 sm:block">-</span>
          <ModalField label="Per">
            <NumberStepper
              value={form.unitPer}
              onChange={(value) => onFormChange({ unitPer: value })}
            />
          </ModalField>
        </div>
      </div>
    </div>
  )
}

function InventoryTab({ form, onFormChange }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Inventory</h3>
      <div className="space-y-5">
        <ModalField label="SKU">
          <input
            value={form.sku}
            onChange={(event) => onFormChange({ sku: event.target.value })}
            className={inputClass}
          />
        </ModalField>

        <ModalField label="Quantity">
          <NumberStepper
            value={form.quantity}
            onChange={(value) => onFormChange({ quantity: value })}
          />
        </ModalField>
      </div>
    </div>
  )
}

function ShippingTab({ form, onFormChange }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-ink-900">Shipping</h3>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ModalField label="Width">
            <UnitInput
              value={form.width}
              placeholder="0cm"
              onChange={(value) => onFormChange({ width: value })}
            />
          </ModalField>
          <ModalField label="Height">
            <UnitInput
              value={form.height}
              placeholder="0cm"
              onChange={(value) => onFormChange({ height: value })}
            />
          </ModalField>
          <ModalField label="Depth">
            <UnitInput
              value={form.depth}
              placeholder="0cm"
              onChange={(value) => onFormChange({ depth: value })}
            />
          </ModalField>
          <ModalField label="Weight">
            <UnitInput
              value={form.weight}
              placeholder="0kg"
              onChange={(value) => onFormChange({ weight: value })}
            />
          </ModalField>
        </div>

        <ModalField label="Extra Shipping Fee">
          <CurrencyInput
            value={form.extraShippingFee}
            onChange={(value) => onFormChange({ extraShippingFee: value })}
          />
        </ModalField>
      </div>
    </div>
  )
}

function ModalField({ label, children, action }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-ink-400">{label}</span>
        {action}
      </div>
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

function CurrencyInput({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-400">$</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} pl-8`}
      />
    </div>
  )
}

function UnitInput({ value, placeholder, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  )
}

function NumberStepper({ value, onChange }) {
  const increment = () => onChange(String(Number(value || 0) + 1))
  const decrement = () => onChange(String(Math.max(0, Number(value || 0) - 1)))

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} pr-10`}
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col">
        <button
          type="button"
          onClick={increment}
          className="text-ink-300 hover:text-ink-500"
          aria-label="Increase"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          onClick={decrement}
          className="text-ink-300 hover:text-ink-500"
          aria-label="Decrease"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  )
}

function ToolbarButton({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-white hover:text-ink-700"
      aria-label={label}
    >
      <Icon size={15} />
    </button>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-ink-100 bg-white px-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 hover:bg-ink-50 focus:border-brand-dark/40'
