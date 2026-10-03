import { HomeView } from "@/components/views/HomeView";
import { ui } from "@/content/ui";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "fr",
  title: ui.title.fr,
  description: ui.description.fr,
  paths: { fr: routes.home("fr"), en: routes.home("en") },
});

export default function Page() {
  return <HomeView locale="fr" />;
}
