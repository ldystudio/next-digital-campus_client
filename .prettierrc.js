/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
    printWidth: 100,
    trailingComma: "none",
    semi: false,
    jsxSingleQuote: true,
    tabWidth: 4,
    useTabs: false,
    importOrder: [
        "^(react$)|^(react/(.*)$)",
        "^(next$)|^(next/(.*)$)",
        "",
        "<BUILTIN_MODULES>",
        "<TYPES>",
        "<TYPES>^[.]",
        "<THIRD_PARTY_MODULES>",
        "^@[^/]",
        "",
        "^[@/]",
        "^[~/]",
        "^[./]",
        "",
        "\\.(scss|less|css)$"
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "5.0.0",
    plugins: ["@ianvs/prettier-plugin-sort-imports"]
}
