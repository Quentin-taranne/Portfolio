import { ProjectView, projectMetadata, projectParams } from "@/components/views/ProjectView";

export const dynamicParams = false;
export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  return projectMetadata("en", slug);
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  return <ProjectView locale="en" slug={slug} />;
}
