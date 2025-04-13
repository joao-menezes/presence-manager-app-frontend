// src/themes/lightTheme.ts
export const lightTheme = {
    colors: {
        background: '#f0f0f0',
        text: '#333',
        primary: '#007bff',
        secondary: '#81b0ff',
        border: '#ccc',
        inputBackground: '#fff',
        inputText: '#333',
        buttonBackground: '#007bff',
        buttonText: '#fff',
        footerBackground: '#f8f8f8',
        footerText: '#ff0000',
    },
    font: {
        regular: 'Arial, sans-serif',
        bold: 'Arial-Bold, sans-serif',
    },
};

export type Theme = typeof lightTheme;
