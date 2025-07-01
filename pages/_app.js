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
                .section-kicker {
                  font-weight: 600;
                  color: var(--bs-primary) !important;
                  text-transform: uppercase;
                  letter-spacing: .05em;
                }
                .floating-whatsapp-btn { position: fixed; bottom: 25px; right: 25px; background-color: #25d366; color: #fff; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 2px 2px 10px rgba(0,0,0,.2); z-index: 1030; text-decoration: none; }
                .floating-whatsapp-btn:hover { transform: scale(1.1); color: #fff; }
                footer a { text-decoration: none; color: #adb5bd; transition: color .3s ease; }
                footer a:hover { color: #fff; }
                .slogan-highlight { color: #6ee7b7; font-weight: 600; animation: pulse-glow 3s infinite ease-in-out; }
                @keyframes pulse-glow { 0%{text-shadow:0 0 5px rgba(110,231,183,.6)} 50%{text-shadow:0 0 14px rgba(110,231,183,1)} 100%{text-shadow:0 0 5px rgba(110,231,183,.6)} }
                .gallery-slider .slick-prev, .gallery-slider .slick-next {
                  background-color: rgba(5,150,105,.8);
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  z-index: 1;
                  display: flex !important;
                  align-items: center;
                  justify-content: center;
                }
                .gallery-slider .slick-prev:before, .gallery-slider .slick-next:before {
                  display: none;
                }
                .gallery-slider .slick-prev::after, .gallery-slider .slick-next::after {
                  font-family: "Font Awesome 6 Free";
                  font-weight: 900;
                  font-size: 20px;
                  color: #fff;
                  display: block;
                }
                .gallery-slider .slick-prev::after {
                  content: "\f053";
                }
                .gallery-slider .slick-next::after {
                  content: "\f054";
                }
                .gallery-slider .slick-dots li button:before { color: var(--bs-primary); }
                .gallery-slider .slick-dots li.slick-active button:before { color: var(--bs-primary); }
                .gallery-grid-item, .slide-image-wrapper { aspect-ratio: 1 / 1; }
                .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
                  color: var(--bs-primary) !important;
                  background-color: var(--bs-tertiary-bg) !important;
                  border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-tertiary-bg) !important;
                }
                .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2.5rem 2rem; }
                .client-logo { height: 60px; max-width: 150px; object-fit: contain; opacity: 0.9; transition: all 0.3s ease-in-out; }
                .client-logo:hover { opacity: 1; transform: scale(1.1); }
                [data-bs-theme="dark"] .client-logo {
                  opacity: 0.9;
                  /* filter: brightness(0) invert(1);  dihapus agar logo tetap terlihat normal */
                }

                /* Hilangkan warna biru Bootstrap default, gunakan putih/transparan/hijau sesuai tema */
                .navbar {
                  background-color: var(--bs-tertiary-bg) !important;
                }
                [data-bs-theme="dark"] .navbar {
                  background-color: rgba(30, 41, 59, 0.9) !important;
                }

                .btn-primary, .btn-info, .btn-blue {
                  background-color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) !important;
                  color: #fff !important;
                }
                .btn-primary:hover, .btn-info:hover, .btn-blue:hover {
                  background-color: #047857 !important;
                  border-color: #047857 !important;
                }

                .text-primary, .text-brand-primary, .text-blue, .text-info {
                  color: var(--bs-primary) !important;
                }
                .bg-primary, .bg-blue, .bg-info {
                  background-color: var(--bs-primary) !important;
                }
                .border-primary, .border-blue, .border-info {
                  border-color: var(--bs-primary) !important;
                }
                .text-brand-secondary {
                  color: var(--bs-secondary) !important;
                }
                .bg-brand-secondary {
                  background-color: var(--bs-secondary) !important;
                }
                .border-brand-secondary {
                  border-color: var(--bs-secondary) !important;
                }

                .form-check-input:checked {
                  background-color: var(--bs-primary) !important;
                  border-color: var(--bs-primary) !important;
                }
            `}</style>
        </>
    );
}

export default MyApp;
