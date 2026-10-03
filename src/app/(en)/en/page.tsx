import { HomeView } from "@/components/views/HomeView";
import { ui } from "@/content/ui";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  title: ui.title.en,
  description: ui.description.en,
  paths: { fr: routes.home("fr"), en: routes.home("en") },
});

export default function Page() {
  return <HomeView locale="en" />;
}
