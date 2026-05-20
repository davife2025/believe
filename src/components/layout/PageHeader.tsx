interface PageHeaderProps {
  icon: string
  title: string
  description: string
  color?: string
  children?: React.ReactNode
}

export function PageHeader({ icon, title, description, color = '#6366f1', children }: PageHeaderProps) {
  return (
    <div className="page-header flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
          <p className="text-sm text-white/40 mt-0.5">{description}</p>
        </div>
      </div>
      {children && <div className="flex items-center gap-2 mt-1">{children}</div>}
    </div>
  )
}
