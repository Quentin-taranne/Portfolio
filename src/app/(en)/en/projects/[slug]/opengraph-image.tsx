import { projectParams } from "@/components/views/ProjectView";
import { ogSize, projectOg } from "@/lib/og";

export const alt = "Project by Quentin Taranne Payet";
export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = projectParams;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return projectOg("en", slug);
}
