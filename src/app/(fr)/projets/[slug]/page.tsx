import { ProjectView, projectMetadata, projectParams } from "@/components/views/ProjectView";

export const dynamicParams = false;
export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  return projectMetadata("fr", slug);
}

export default async function Page({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  return <ProjectView locale="fr" slug={slug} />;
}
