module.exports = {
  extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  settings: {
    /* Support tailwind rules inside class utility functions */
    tailwindcss: {
      callees: ["clsx", "cva", "cn"],
      config: path.join(__dirname, "./tailwind.config.js"),
    },
  },
};
