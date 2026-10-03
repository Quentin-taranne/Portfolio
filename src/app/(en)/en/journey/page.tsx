import { JourneyView, journeyMetadata } from "@/components/views/ListViews";

export const metadata = journeyMetadata("en");

export default function Page() {
  return <JourneyView locale="en" />;
}
