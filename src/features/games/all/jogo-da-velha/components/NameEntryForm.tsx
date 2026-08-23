'use client'

import { useState, type FormEvent } from 'react'
import { Modal } from '@/components/shared/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface NameEntryFormProps {
  title: string
  error?: string | null
  onSubmit: (name: string) => void
}

export default function NameEntryForm({ title, error, onSubmit }: NameEntryFormProps) {
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <Modal title={title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="player-name"
          label="Seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome"
          maxLength={20}
          autoFocus
        />
        <Button type="submit" variant="primary" disabled={!name.trim()}>
          Continuar
        </Button>
        {error && <p className="text-center text-sm text-red-400">{error}</p>}
      </form>
    </Modal>
  )
}
