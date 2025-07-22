// import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { Trees } from "lucide-react";

export default {
  logo: (
    <>
      <Trees className="h-8 w-8" />
      <span className="font-bold text-2xl ml-2">Forest Remote Sensing</span>
    </>
  ),
  project: {
    link: "https://github.com/fab-scm/forest-rs-portfolio",
  },
  color: {
    hue: 130,
    saturation: 50,
    lightness: {
      dark: 50,
      light: 20
    }
  }
  // ... other theme options
};
