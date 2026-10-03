import { homeOg, ogSize } from "@/lib/og";

export const alt = "Quentin Taranne Payet, developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return homeOg("en");
}
