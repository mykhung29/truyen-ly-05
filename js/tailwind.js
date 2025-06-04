
    
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            200: '#bfdbfe',
                            300: '#93c5fd',
                            400: '#60a5fa',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        },
                        secondary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            200: '#fbcfe8',
                            300: '#f9a8d4',
                            400: '#f472b6',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d',
                            900: '#831843',
                        }
                    },
                    fontFamily: {
                        'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
                    },
                    animation: {
                        'pulse-slow': 'pulse 2s infinite',
                        'shine': 'shine 3s infinite',
                        'gradient': 'gradient 3s infinite linear',
                        'float': 'float 3s ease-in-out infinite',
                    },
                    keyframes: {
                        shine: {
                            '0%': { transform: 'translateX(-100%) rotate(45deg)' },
                            '100%': { transform: 'translateX(100%) rotate(45deg)' }
                        },
                        gradient: {
                            '0%': { 'background-position': '0% 0%' },
                            '100%': { 'background-position': '200% 0%' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }
                }
            }
        }
