import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Theme = {
    dark: boolean;
    colors: {
        background: string;
        text: string;
        border: string;
        notification: string;
        primary: string;
        card: string;
        inputBackground: string;
        inputText: string;
        footerBackground: string;
        footerText: string;
        secondary: string;
        footerBackgroundPressed: string;
        placeholder: string;
        selectedItem: string;
        avatarBackground: string;
        subtitleText: string;
    };
    fonts: {
        regular: string;
        bold: string;
    };
};

const lightTheme: Theme = {
    dark: false,
    colors: {
        background: '#fff',
        text: '#000',
        border: '#ddd',
        notification: '#007bff',
        primary: '#007bff',
        card: '#f0f0f0',
        inputBackground: '#fff',
        inputText: '#000',
        footerBackground: '#f5f5f5',
        footerText: '#007bff',
        secondary: '#f5f5f5',
        footerBackgroundPressed: '#e0e0e0',
        placeholder: '#888',
        selectedItem: '#e3f2fd',
        avatarBackground: '#007bff',
        subtitleText: '#666',
    },
    fonts: {
        regular: 'Arial',
        bold: 'Arial-Bold',
    },
};

const darkTheme: Theme = {
    dark: true,
    colors: {
        background: '#121212',
        text: '#fff',
        border: '#333',
        notification: '#bb86fc',
        primary: '#c9a1ff',
        card: '#333',
        inputBackground: '#444',
        inputText: '#fff',
        footerBackground: '#333',
        footerText: '#bb86fc',
        secondary: '#f5f5f5',
        footerBackgroundPressed: '#8a8a8a',
        placeholder: '#888',
        selectedItem: '#0066cc',
        avatarBackground: '#bb86fc',
        subtitleText: '#bbb',
    },
    fonts: {
        regular: 'Arial',
        bold: 'Arial-Bold',
    },
};

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: lightTheme,
    toggleTheme: () => {},
});

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme.dark ? lightTheme : darkTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
