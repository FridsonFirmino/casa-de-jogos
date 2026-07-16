interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-zinc-500">{subtitle}</p>
      )}
    </div>
  )
}
