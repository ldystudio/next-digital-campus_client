/** @type {import("eslint").Linter.Config} */
module.exports = {
    $schema: "https://json.schemastore.org/eslintrc",
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    plugins: ["tailwindcss"],
    extends: [
        "eslint:recommended",
        "next/core-web-vitals",
        "prettier",
        "plugin:@typescript-eslint/recommended",
        "plugin:@tanstack/eslint-plugin-query/recommended",
        "plugin:tailwindcss/recommended",
        "plugin:react/recommended"
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off"
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        tailwindcss: {
            callees: ["classnames", "cn", "clsx", "tv", "twx"],
            config: "tailwind.config.js"
        }
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js"],
            parser: "@typescript-eslint/parser"
        }
    ],
    ignorePatterns: ["node_modules/", ".next/", "components/ui"]
}
