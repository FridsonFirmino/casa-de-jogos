import { Container } from "@/components/ui/Container";
import { CATEGORIES } from "@/constants/categories";
import { SOCIAL_LINKS } from "@/constants/navigation";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-zinc-100">
                Casa de <span className="text-violet-400">Jogos</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Centenas de jogos gratuitos para jogar diretamente no navegador.
              Sem downloads, sem cadastro.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Categorias
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <a
                    href={`/categories/${category.slug}`}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {category.icon} {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Links
            </h3>
            <ul className="space-y-3">
              {[
                "Sobre",
                "Contato",
                "Política de Privacidade",
                "Termos de Uso",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Redes Sociais
            </h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/50"
                >
                  <span className="text-sm font-medium">{link.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/50 pt-8 text-center">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Games Hub. Feito com ❤️ por
            Fridson Firmino.
          </p>
        </div>
      </Container>
    </footer>
  );
}
