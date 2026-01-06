export default [
    {
        ignores: ["node_modules/**"],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
        },
        rules: {
            "no-unused-vars": "off",
            
            "no-undef": "off", 
        },
    },
];