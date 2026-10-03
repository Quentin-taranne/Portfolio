import { AccessibilityView, accessibilityMetadata } from "@/components/views/AccessibilityView";

export const metadata = accessibilityMetadata("en");

export default function Page() {
  return <AccessibilityView locale="en" />;
}
