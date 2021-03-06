const colors = require("tailwindcss/colors")

module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
}
