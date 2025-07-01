// pages/_app.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppConfig } from '../lib/data'; // Pastikan file lib/data.js ada

// Ini adalah komponen Layout utama yang akan 'membungkus' seluruh situsmu
const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState('light');
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    // Cek tema dari localStorage pas pertama kali buka
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }, []);
    
    // Muat semua file CSS dan JS dari luar
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
                // Muat semua file CSS
                await Promise.all([
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' })
                ]);

                // Muat file JS secara berurutan (jQuery dulu, baru yang lain)
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

    // Jalankan AOS (animasi) setelah semua aset siap
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

    // Kirim fungsi tema ke komponen halaman
    const extendedPageProps = { ...pageProps, theme, handleThemeToggle, assetsLoaded };

    return (
        <>
            <Head>
                <title>{AppConfig.meta.title}</title>
                <meta name="description" content={AppConfig.meta.description} />
                <meta name="author" content={AppConfig.meta.author} />
                <meta property="og:title" content={AppConfig.meta.title} />
                <meta property="og:description" content={AppConfig.meta.description} />
                <meta property="og:image" content={AppConfig.meta.ogImage} />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={AppConfig.meta.favicon} />
            </Head>
            <div id="app-container">
                <Component {...extendedPageProps} />
            </div>
            {/* CSS Kustom ditempatkan langsung di sini untuk menghindari error build */}
            <style jsx global>{`
                :root {
                  --bs-primary: #059669;
                  --bs-primary-rgb: 5, 150, 105;
                  --bs-secondary: #064e3b;
                  --bs-secondary-rgb: 6, 78, 59;
                  --bs-body-color: #475569;
                  --bs-body-bg: #f8f9fa;
                  --bs-tertiary-bg: #ffffff;
                  --bs-border-color: #e2e8f0;
                  --bs-light-green-bg: #f0fdf4;
                }

                [data-bs-theme="dark"] {
                  --bs-primary: #34d399;
                  --bs-primary-rgb: 52, 211, 153;
                  --bs-secondary: #a7f3d0;
                  --bs-body-color: #cbd5e1;
                  --bs-body-bg: #1e293b;
                  --bs-tertiary-bg: #334155;
                  --bs-border-color: #475569;
                  --bs-light-green-bg: #064e3b;
                  --bs-dark: #0f172a;
                }

                html, body {
                  overflow-x: hidden !important;
                  width: 100%;
                }

                body {
                  font-family: 'Inter', sans-serif;
                  transition: background-color 0.3s, color 0.3s;
                  background-color: var(--bs-body-bg);
                  color: var(--bs-body-color);
                }

                .bg-light-green { background-color: var(--bs-light-green-bg); }
                .bg-white { background-color: var(--bs-tertiary-bg) !important; }
                .testimonial-card { background-color: var(--bs-tertiary-bg); border-left: 5px solid var(--bs-primary); }
                [data-bs-theme="dark"] .navbar { background-color: rgba(30, 41, 59, 0.9) !important; }
                .hero-bg { background-image: linear-gradient(to top, rgba(5, 46, 22, 0.1), rgba(5, 46, 22, 0.3)), url('https://rng.my.id/img/lap/bg-hero-1.webp'); background-size: cover; background-position: center; min-height: 80vh; }
                [data-bs-theme="dark"] .hero-bg { background-image: linear-gradient(to top,rgba(15, 23, 42, .9),rgba(15, 23, 42, .3)),url('https://rng.my.id/img/lap/bg-hero-1.webp'); }
                .hero-title { font-size: 2.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2rem; }
                .hero-tagline { font-size: 1.25rem; font-weight: 400; line-height: 1.6; max-width: 850px; margin: 0 auto 7rem auto; }
                @media (max-width: 767.98px) { .hero-title { font-size: 2rem; line-height: 1.3; } .hero-tagline { font-size: 1.1rem; margin-bottom: 7rem; } }
                /* KICKER */
                .section-kicker {
                  font-weight: 600;
                  color: var(--bs-primary) !important;
                  text-transform: uppercase;
                  letter-spacing: .05em;
                }
                /* TAB NAVIGATION */
                .nav-tabs {
                  margin-top: 2rem;
                  margin-bottom: 2.5rem;
                  gap: 0.5rem;
                  border-bottom: 1px solid var(--bs-primary) !important;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                }
                .nav-tabs .nav-item {
                  margin-right: 0.25rem;
                  margin-left: 0.25rem;
                }
                .nav-tabs .nav-link {
                  margin-bottom: 0;
                  padding: 0.75rem 1.5rem;
                  font-weight: 600;
                  font-size: 1rem;
                  color: var(--bs-primary) !important;
                  border: 1px solid var(--bs-primary) !important;
                  background: transparent !important;
                  transition: background 0.2s, color 0.2s;
                  border-radius: 0.5rem 0.5rem 0 0;
                }
                .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
                  color: #fff !important;
                  background-color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) var(--bs-primary) var(--bs-tertiary-bg) !important;
                }
                .nav-tabs .nav-link:hover {
                  background: var(--bs-primary) !important;
                  color: #fff !important;
                }
                /* Jarak heading ke tab navigation */
                .nav-tabs {
                  margin-top: 2rem;
                  margin-bottom: 2.5rem;
                }
                .text-center.mb-5 + .nav-tabs {
                  margin-top: 2.5rem;
                }
                /* TOGGLE SWITCH */
                .form-check-input:checked {
                  background-color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) !important;
                }
                /* BUTTONS */
                .btn, .btn-primary, .btn-info, .btn-blue {
                  background-color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) !important;
                  color: #fff !important;
                }
                .btn:hover, .btn-primary:hover, .btn-info:hover, .btn-blue:hover {
                  background-color: #047857 !important;
                  border-color: #047857 !important;
                  color: #fff !important;
                }
                .btn-outline-primary {
                  color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) !important;
                  background: transparent !important;
                }
                .btn-outline-primary:hover {
                  background-color: var(--bs-primary) !important;
                  color: #fff !important;
                  border-color: var(--bs-primary) !important;
                }
                /* LOGO KLIEN GRID RESPONSIVE */
                .clients-grid {
                  display: grid;
                  grid-template-columns: repeat(5, 1fr);
                  gap: 2rem 2rem;
                  justify-items: center;
                  align-items: center;
                  padding-bottom: 1rem;
                }
                .client-item {
                  width: 100%;
                  text-align: center;
                }
                @media (max-width: 767.98px) {
                  .clients-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem 1rem;
                  }
                }
                .client-logo {
                  max-width: 120px;
                  height: auto;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  transition: all 0.3s ease-in-out;
                }
                .client-logo:hover {
                  transform: scale(1.1);
                }
                /* Hapus semua kemungkinan warna biru */
                .text-primary, .text-brand-primary, .text-blue, .text-info {
                  color: var(--bs-primary) !important;
                }
                .bg-primary, .bg-blue, .bg-info {
                  background-color: var(--bs-primary) !important;
                }
                .border-primary, .border-blue, .border-info {
                  border-color: var(--bs-primary) !important;
                }
            `}</style>
        </>
    );
}

export default MyApp;
