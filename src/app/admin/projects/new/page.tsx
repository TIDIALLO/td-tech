import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nouveau projet</h1>
        <p className="text-muted-foreground">
          Créez un nouveau projet pour votre portfolio
        </p>
      </div>
      <ProjectForm />
    </div>
  )
}

