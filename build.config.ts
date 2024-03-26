import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/index",
    {
      builder: "mkdist",
      input: "./src/plugin",
      outDir: "./dist/plugin",
      format: "esm",
    },
  ],

  declaration: true,
});
