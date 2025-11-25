import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return services.map((service) => ({
    slug: service.slug,
  }))
}

async function getService(slug: string) {
  const service = await prisma.service.findUnique({
    where: { slug, published: true },
  })

  if (!service) {
    notFound()
  }

  return service
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <Link href="/services">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux services
              </Button>
            </Link>
            <h1 className="mb-4 text-4xl font-bold">{service.title}</h1>
            <p className="text-lg text-muted-foreground">{service.description}</p>
            {service.price && (
              <p className="mt-4 text-3xl font-bold text-primary">{service.price}</p>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.content }} />
            </div>

            <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Intéressé par ce service ?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé
              </p>
              <Link href="/contact">
                <Button size="lg">Demander un devis</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

