import { heroui } from "@heroui/theme";

const tailwindConfig = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(avatar|button|card|divider|dropdown|input|select|ripple|spinner|menu|popover|form|listbox|scroll-shadow).js",
  ],
  plugins: [heroui()],
};

export default tailwindConfig;
