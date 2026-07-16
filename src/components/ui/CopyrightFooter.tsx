import { Container } from '@/components/ui/Container'

export function CopyrightFooter() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <Container className="py-8">
        <p className="text-center text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} Games Hub. Feito com ❤️ por
          Fridson Firmino.
        </p>
      </Container>
    </footer>
  )
}
