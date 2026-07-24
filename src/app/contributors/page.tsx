import { Container } from "@/components/ui/Container";
import { ContributorAvatar } from "@/components/ui/ContributorAvatar";
import { CopyrightFooter } from "@/components/ui/CopyrightFooter";
import { getContributorsWithProfiles } from "@/registry/contributors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribuidores - Casa de Jogos",
  description:
    "Conheça as pessoas que contribuíram com jogos para a Casa de Jogos.",
};

export default async function ContributorsPage() {
  const contributors = await getContributorsWithProfiles();

  return (
    <>
      <main className="pt-24">
        <section className="py-16">
          <Container>
            <div className="mx-auto mb-16 ">
              <h1 className="font-display text-4xl tracking-tight text-zinc-100 sm:text-5xl">
                Contribuidores
              </h1>
              <p className="mt-4 text-lg text-zinc-500">
                Conheça todas as pessoas que tornam este projeto possível.
              </p>
            </div>

            {contributors.length === 0 && (
              <p className="text-center text-zinc-500">
                Nenhum contribuidor encontrado.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-8">
              {contributors.map((contributor) => (
                <ContributorAvatar
                  key={contributor.username}
                  username={contributor.username}
                  name={contributor.name}
                  avatarUrl={contributor.avatarUrl}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <CopyrightFooter />
    </>
  );
}
