import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  const input = (
    <input
      id={id}
      className={`w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-accent focus:outline-none ${className}`}
      {...props}
    />
  )

  if (!label) return input

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      {input}
    </div>
  )
}
