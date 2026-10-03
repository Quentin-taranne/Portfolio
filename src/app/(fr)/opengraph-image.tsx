import { homeOg, ogSize } from "@/lib/og";

export const alt = "Quentin Taranne Payet, développeur";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return homeOg("fr");
}
