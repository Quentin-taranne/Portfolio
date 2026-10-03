import { JourneyView, journeyMetadata } from "@/components/views/ListViews";

export const metadata = journeyMetadata("fr");

export default function Page() {
  return <JourneyView locale="fr" />;
}
