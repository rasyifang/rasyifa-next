// pages/_app.js

import React, { useState, useEffect } from 'react';
import '../styles/globals.css'; // Import your custom CSS here

// This is the main Layout component that wraps your entire site
const Layout = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState('light');
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    // Set theme from localStorage on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }, []);
    
    // Load all external CSS and JS assets
    useEffect(() => {
        const loadAsset = (tag, attrs) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`${tag}[src="${attrs.src}"], ${tag}[href="${attrs.href}"]`)) {
                    return resolve();
                }
                const element = document.createElement(tag);
                Object.assign(element, attrs);
                element.onload = resolve;
                element.onerror = reject;
                document.head.appendChild(element);
            });
        };

        const loadAssets = async () => {
            try {
                // CSS files are loaded via <link> tags in the component now for simplicity
                await loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' });
                await loadAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' });
                await loadAsset('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap' });
                await loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' });
                await loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' });
                await loadAsset('link', { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' });

                // JS files (sequentially)
                await loadAsset('script', { src: 'https://code.jquery.com/jquery-3.6.0.min.js' });
                window.$ = window.jQuery;
                await loadAsset('script', { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' });
                await loadAsset('script', { src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js' });
                await loadAsset('script', { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js' });
                
                setAssetsLoaded(true);
            } catch (error) {
                console.error("Gagal memuat aset:", error);
            }
        };

        loadAssets();
    }, []);

    // Initialize AOS after assets are loaded
    useEffect(() => {
        if (assetsLoaded && typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true });
        }
    }, [assetsLoaded]);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    };

    // Pass theme and toggle function to the page component
    const extendedPageProps = { ...pageProps, theme, handleThemeToggle, assetsLoaded };

    return (
        <div id="app-container">
            {/* The actual page content will be rendered here */}
            <Component {...extendedPageProps} />
        </div>
    );
}

export default Layout;
