'use client'

import { Container } from '@/components/ui/Container'
import { STATS } from '@/constants/stats'
import { useCountAnimation } from '@/hooks/useCountAnimation'

function AnimatedStat({ value, suffix, label, prefix }: { value: number; suffix: string; label: string; prefix?: string }) {
  const [count, ref] = useCountAnimation(value)

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-arcade bg-gradient-to-r from-accent to-highlight bg-clip-text text-5xl text-transparent sm:text-6xl"
      >
        {prefix}{count}{suffix}
      </span>
      <p className="mt-2 text-lg text-zinc-500">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />

      <Container className="relative">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              prefix={stat.prefix}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
