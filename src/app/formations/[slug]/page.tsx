import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Download, Video } from "lucide-react"
import { auth } from "@/auth"

export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      select: { slug: true },
    })

    return courses.map((course) => ({
      slug: course.slug,
    }))
  } catch {
    return []
  }
}

async function getCourse(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug, published: true },
      include: {
        modules: {
          where: { published: true },
          orderBy: { order: "asc" },
        },
        files: true,
        videos: {
          where: { published: true },
          orderBy: { order: "asc" },
        },
      },
    })

    if (!course) {
      notFound()
    }

    return course
  } catch {
    notFound()
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourse(slug)
  const session = await auth()

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <Link href="/formations">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux formations
              </Button>
            </Link>
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {course.category}
            </div>
            <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{course.modules.length} modules</span>
              </div>
              {course.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              )}
              <div>
                <span className="font-medium">Niveau:</span> {course.level}
              </div>
            </div>
            {course.price && (
              <p className="mt-4 text-3xl font-bold text-primary">{course.price}</p>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="prose prose-zinc dark:prose-invert max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: course.content }} />
            </div>

            {/* Modules */}
            {course.modules.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Modules de formation</h2>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <Card key={module.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Module {index + 1}: {module.title}
                        </CardTitle>
                        {module.description && (
                          <CardDescription>{module.description}</CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos */}
            {session && course.videos.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Vidéos</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {course.videos.map((video) => (
                    <Card key={video.id}>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-primary">
                          <Video className="h-5 w-5" />
                          <CardTitle className="text-base">{video.title}</CardTitle>
                        </div>
                        {video.description && (
                          <CardDescription>{video.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            Regarder la vidéo
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Fichiers */}
            {session && course.files.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Ressources téléchargeables</h2>
                <div className="space-y-3">
                  {course.files.map((file) => (
                    <Card key={file.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{file.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.fileType} • {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <a href={file.fileUrl} download>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!session && (course.videos.length > 0 || course.files.length > 0) && (
              <div className="rounded-lg border bg-muted/50 p-8 text-center">
                <h3 className="mb-4 text-xl font-bold">
                  Connectez-vous pour accéder au contenu complet
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Vidéos, fichiers et ressources sont disponibles pour les utilisateurs connectés
                </p>
                <Link href="/auth/signin">
                  <Button size="lg">Se connecter</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

