import { ProjectsView, projectsMetadata } from "@/components/views/ListViews";

export const metadata = projectsMetadata("en");

export default function Page() {
  return <ProjectsView locale="en" />;
}
