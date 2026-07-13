export default function PlaceholderPage({ title, icon: Icon }) {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold text-ink-900 mb-6">{title}</h1>
      <div className="bg-white rounded-xl2 border border-ink-100 shadow-card p-16 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-xl2 bg-brand-green/15 flex items-center justify-center text-brand-dark mb-4">
          <Icon size={28} />
        </div>
        <h2 className="text-lg font-medium text-ink-900 mb-1">{title} page</h2>
        <p className="text-sm text-ink-500 max-w-sm">
          This route is wired up and ready. Build out the {title.toLowerCase()} view here whenever you're ready — the sidebar link and routing already work.
        </p>
      </div>
    </div>
  )
}
