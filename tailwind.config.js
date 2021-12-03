const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            minHeight: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '1/4-screen': '25vh',
                '1/2-screen': '50vh',
                '3/4-screen': '75vh'

            }
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
