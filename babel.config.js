module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          // cwd: "babel.config.js",
          // root: ".",
          // extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
          alias: {
            "@/screens": "./app/screens",
            "@/types": "./app/types",
            "@/lib": "./app/lib",
            "@/components": "./app/components",
            "@/assets": "./app/assets",
            "@/hooks": "./app/hooks",
            "@/navigation": "./app/navigation",
            "@/store": "./app/store",
            "@/api": "./app/api",
            "@/utils": "./app/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
