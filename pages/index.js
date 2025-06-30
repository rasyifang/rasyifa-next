import React, { useState, useEffect, useRef } from 'react';

// DATA ASET UNTUK GAMBAR DAN KONTEN
// Mengelola data di satu tempat untuk kemudahan pembaruan.
const AppData = {
  meta: {
    title: "PT Rasyifa Nusantara Group - Konsultan Lingkungan & Perizinan",
    description: "PT Rasyifa Nusantara Group - Konsultan profesional untuk perizinan lingkungan, kehutanan, dan pertambangan. Solusi lengkap AMDAL, UKL-UPL, IPPKH, dan perizinan industri lainnya di Indonesia.",
    author: "PT Rasyifa Nusantara Group",
    ogImage: "https://rng.my.id/img/img-2.webp",
    url: "https://www.rng.my.id/",
    favicon: "https://rng.my.id/img/icon.png"
  },
  contact: {
    email: "rasyifa.nusantara@gmail.com",
    phone1: "0812-4975-6831",
    phone2: "0895-3313-83414",
    address: "Perumahan Bluru Permai Blok R-22, RT. 03 RW. 09, 61233. Kec. Sidoarjo, Kab. Sidoarjo, Jawa Timur, Indonesia.",
    linkedin: "https://www.linkedin.com/in/rasyifa-nusantara-group-a6b825312/",
    instagram: "https://www.instagram.com/rasyifa.nusantaragroup/",
    whatsapp: "https://wa.me/62895331383414?text=Halo%2C%20Rasyifa%20Nusantara%20Group.%20Saya%20mengunjungi%20website%20Anda%20dan%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20layanan%20yang%20ditawarkan.%20Bisakah%20saya%20mendapatkan%20informasi%20lebih%20lanjut%3F",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.342659039327!2d112.7207497747517!3d-7.42674409260101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e340c2317865%3A0x62955f148e43444!2sPerumahan%20Bluru%20Permai!5e0!3m2!1sen!2sid!4v1718302568019!5m2!1sen!2sid"
  },
  images: {
    logo: 'https://rng.my.id/img/logo.webp',
    heroBg: 'https://rng.my.id/img/lap/bg-hero-1.webp',
    about: 'https://rng.my.id/img/foto-rapat.webp',
    featuredGallery: [
      { id: 1, src: 'https://rng.my.id/img/gallery-2.jpg', alt: "Proses Pendampingan Izin penangkaran Rusa" },
      { id: 2, src: 'https://rng.my.id/img/gallery-1.jpg', alt: "Pendampingan proses perizinan SIPAT" },
      { id: 3, src: 'https://rng.my.id/img/gallery-3.jpg', alt: "Pendampingan proses PKS antara Gapoktan Gunung Madu dengan PT ABS" },
      { id: 4, src: 'https://rng.my.id/img/gallery-4.jpg', alt: "Pendampingan permohonan IPPKH a.n PT Nunukan Jaya Lestari" },
    ],
    sliderGallery: [
        'https://rng.my.id/img/img-1.jpg', 'https://rng.my.id/img/img-2.jpg',
        'https://rng.my.id/img/img-3.jpg', 'https://rng.my.id/img/img-4.jpg',
        'https://rng.my.id/img/img-5.jpg', 'https://rng.my.id/img/img-6.jpg'
    ],
    activityGallery: [
        'https://rng.my.id/img/lap/img1.jpeg', 'https://rng.my.id/img/lap/img2.jpeg',
        'https://rng.my.id/img/lap/img3.jpeg', 'https://rng.my.id/img/lap/img4.jpeg',
        'https://rng.my.id/img/lap/img5.jpeg', 'https://rng.my.id/img/lap/img6.jpeg',
        'https://rng.my.id/img/lap/img7.jpeg', 'https://rng.my.id/img/lap/img8.jpeg',
        'https://rng.my.id/img/lap/img9.jpeg'
    ],
    clients: [
      { name: 'PT Nunukan Jaya Lestari', logo: 'https://rng.my.id/img/logo-klien-njl.jpeg' },
      { name: 'PT Wahyu Daya Mandiri', logo: 'https://rng.my.id/img/logo-klien-pt-wahyu-daya-mandiri.jpeg' },
      { name: 'PT Ganda Alam Makmur', logo: 'https://rng.my.id/img/logo-klien-ganda-alam-makmur.jpeg' },
      { name: 'Gapoktan Rimba Madu Sejahtera', logo: 'https://rng.my.id/img/logo-klien-rimba-madu-sejahtera.jpeg' },
      { name: 'PT Marunda Grahamineral', logo: 'https://rng.my.id/img/logo-klien-mgmcoal.jpeg' },
      { name: 'PT Karya Permata Prima', logo: 'https://rng.my.id/img/logo-klien-pt-karya-permata-prima.jpeg' },
      { name: 'PO. H. Dony Wirawan', logo: 'https://rng.my.id/img/logo-klien-hd.jpeg' },
      { name: 'PT Aulia Prima Perkasa', logo: 'https://rng.my.id/img/logo-klien-pt-aulia-prima-perkasa.jpeg' },
      { name: 'PT. MOD INDO', logo: 'https://rng.my.id/img/logo-klien-pt-mod-indo.jpeg' },
      { name: 'PT Amanah Berkah Sentosa', logo: 'https://rng.my.id/img/logo-abs-property.jpeg' },
    ]
  },
  content: {
    hero: {
      title: "PT. RASYIFA NUSANTARA GROUP",
      tagline: "Jembatan Antara Kompleksitas menjadi Kesederhanaan, dengan Kepercayaan sebagai Landasan, kami menyediakan solusi konsultasi dan perizinan yang handal dan terpercaya."
    },
    about: {
      kicker: "TENTANG KAMI",
      title: "Mitra Profesional untuk Pembangunan Berkelanjutan",
      p1: "PT. RASYIFA NUSANTARA GROUP adalah perusahaan yang dibentuk dengan tekad kuat untuk menjembatani antara Pengembang Ekonomi tingkat tapak maupun tingkat nasional dan kelestarian lingkungan, menyajikan pelayanan konsultasi lingkungan dan kehutanan yang melibatkan pemahaman mendalam akan dampak aktivitas manusia terhadap alam.",
      p2: "Tidak hanya itu, kami juga fokus pada layanan konsultasi pada bidang pertanian dan ketahanan pangan untuk mendukung semua sektor secara berkelanjutan, membantu mendampingi dan menghadirkan solusi terdepan untuk perizinan."
    },
  }
};


// KOMPONEN-KOMPONEN KECIL
const Icon = ({ className }) => <i className={className}></i>;
const SectionKicker = ({ children }) => <p className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{children}</p>;
const SectionTitle = ({ children }) => <h2 className="text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-200 mt-2 mb-4">{children}</h2>;
const SectionLead = ({ children }) => <p className="text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>;

// KOMPONEN UTAMA
const Layout = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        document.title = AppData.meta.title;
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    };
    
    useEffect(() => {
        const loadAsset = (tag, attrs) => {
            if (document.querySelector(`${tag}[src="${attrs.src}"], ${tag}[href="${attrs.href}"]`)) {
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                const element = document.createElement(tag);
                Object.keys(attrs).forEach(key => element[key] = attrs[key]);
                element.onload = resolve;
                element.onerror = reject;
                if (tag === 'link') {
                    document.head.appendChild(element);
                    // Link tags don't have an onload event in all browsers, so we resolve it immediately.
                    // This is generally safe for non-critical CSS.
                    resolve();
                } else {
                    document.body.appendChild(element);
                }
            });
        };

        const loadAssets = async () => {
            try {
                // Load CSS
                await Promise.all([
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' })
                ]);

                // Load JS sequentially to respect dependencies (jQuery -> Bootstrap/Slick)
                await loadAsset('script', { src: 'https://code.jquery.com/jquery-3.6.0.min.js', defer: true });
                window.$ = window.jQuery; // Make jQuery globally available
                await loadAsset('script', { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', defer: true });
                await loadAsset('script', { src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', defer: true });
                await loadAsset('script', { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true });

                setIsScriptsLoaded(true);
            } catch (error) {
                console.error("Gagal memuat aset eksternal:", error);
            }
        };

        loadAssets();
    }, []);

    useEffect(() => {
        if(isScriptsLoaded && typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true });
        }
    }, [isScriptsLoaded]);
    
    return (
        <div className={`font-inter ${theme}`}>
            <Header onThemeToggle={handleThemeToggle} theme={theme} />
            <main>{React.cloneElement(children, { isScriptsLoaded })}</main>
            <Footer />
            <WhatsAppButton />
            
            {/* Custom CSS from original file, embedded directly */}
            <style jsx global>{`
                :root { --bs-primary: #059669; --bs-primary-rgb: 5, 150, 105; --bs-secondary: #064e3b; --bs-body-color: #475569; --bs-body-bg: #f8f9fa; --bs-tertiary-bg: #ffffff; --bs-border-color: #e2e8f0; --bs-light-green-bg: #f0fdf4; }
                [data-bs-theme="dark"] { --bs-primary: #34d399; --bs-primary-rgb: 52, 211, 153; --bs-secondary: #a7f3d0; --bs-body-color: #cbd5e1; --bs-body-bg: #1e293b; --bs-tertiary-bg: #334155; --bs-border-color: #475569; --bs-light-green-bg: #064e3b; --bs-dark: #0f172a; }
                body { font-family: 'Inter', sans-serif; overflow-x: hidden; width: 100%; transition: background-color 0.3s, color 0.3s; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .bg-light-green { background-color: var(--bs-light-green-bg); }
                .bg-white { background-color: var(--bs-tertiary-bg) !important; }
                .testimonial-card { background-color: var(--bs-tertiary-bg); border-left: 5px solid var(--bs-primary); }
                .team-card:hover { transform: translateY(-10px); box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important; }
                [data-bs-theme="dark"] .team-card:hover { box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .25) !important; }
                .hero-bg { background-image: linear-gradient(to top, rgba(5, 46, 22, 0.1), rgba(5, 46, 22, 0.3)), url('${AppData.images.heroBg}'); background-size: cover; background-position: center; min-height: 80vh; }
                [data-bs-theme="dark"] .hero-bg { background-image: linear-gradient(to top,rgba(15, 23, 42, .9),rgba(15, 23, 42, .3)),url('${AppData.images.heroBg}'); }
                .hero-title { font-size: 2.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2rem; }
                .hero-tagline { font-size: 1.25rem; font-weight: 400; line-height: 1.6; max-width: 850px; margin-left: auto; margin-right: auto; margin-bottom: 7rem; }
                .floating-whatsapp-btn { position: fixed; bottom: 25px; right: 25px; background-color: #25d366; color: #fff; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 2px 2px 10px rgba(0,0,0,.2); z-index: 1030; text-decoration: none; }
                .floating-whatsapp-btn:hover { transform: scale(1.1); color: #fff; }
                footer a { text-decoration: none; color: #adb5bd; transition: color .3s ease; }
                footer a:hover { color: #fff; }
                .slogan-highlight { color: #6ee7b7; font-weight: 600; animation: pulse-glow 3s infinite ease-in-out; }
                @keyframes pulse-glow { 0% { text-shadow: 0 0 5px rgba(110, 231, 183, 0.6); } 50% { text-shadow: 0 0 14px rgba(110, 231, 183, 1); } 100% { text-shadow: 0 0 5px rgba(110, 231, 183, 0.6); } }
                .gallery-slider .slick-prev, .gallery-slider .slick-next { width: 40px; height: 40px; z-index: 1; background-color: rgba(5,150,105,.8); border-radius: 50%; }
                .gallery-slider .slick-prev:before, .gallery-slider .slick-next:before { font-family: "Font Awesome 6 Free"; font-weight: 900; font-size: 20px; color: #fff; }
                .gallery-slider .slick-prev:before { content: "\\f053"; }
                .gallery-slider .slick-next:before { content: "\\f054"; }
                .gallery-slider .slick-dots li button:before { color: var(--bs-primary); }
                .gallery-slider .slick-dots li.slick-active button:before { color: var(--bs-primary); }
                .slide-image-wrapper { aspect-ratio: 4 / 3; }
                .gallery-grid-item { aspect-ratio: 1 / 1; }
                .gallery-card { display: flex; flex-direction: column; height: 100%;}
                .gallery-card .gallery-item { flex-grow: 1; }
                .gallery-card .gallery-caption { margin-top: auto; }
                .nav-tabs .nav-link { font-weight: 600; color: var(--bs-body-color); }
                .nav-tabs .nav-link.active { color: var(--bs-primary); border-color: var(--bs-primary) !important; background-color: transparent; }
                .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2.5rem 2rem; }
                .client-logo { height: 60px; max-width: 150px; object-fit: contain; opacity: 0.9; transition: all 0.3s ease-in-out; }
                .client-logo:hover { opacity: 1; transform: scale(1.1); }
                [data-bs-theme="dark"] .client-logo { opacity: 0.8; filter: brightness(0) invert(1); }
                [data-bs-theme="dark"] .client-logo:hover { opacity: 1; }
                @media (max-width: 767.98px) { .hero-title { font-size: 2rem; } .hero-tagline { font-size: 1.1rem; margin-bottom: 5rem;} }
            `}</style>
        </div>
    );
}

const Header = ({ onThemeToggle, theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ["Tentang", "Sejarah", "Tim", "Proyek", "Layanan", "Testimoni", "Klien", "Galeri", "Kontak"];
    return (
        <nav id="mainNavbar" className="navbar navbar-expand-lg bg-white bg-opacity-90 backdrop-blur sticky-top shadow-sm">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={AppData.images.logo} alt="Logo RNG" width="35" height="48" style={{ borderRadius: '50%' }} className="me-2" />
                    <span className="fw-bold fs-5 text-secondary">Rasyifa Nusantara Group</span>
                </a>
                <button className="navbar-toggler border-0" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto fw-semibold">
                        {navLinks.map(link => (
                            <li className="nav-item" key={link}><a className="nav-link" href={`#${link.toLowerCase().replace(/ /g, '-')}`} onClick={() => setIsMenuOpen(false)}>{link}</a></li>
                        ))}
                         <li className="nav-item d-lg-none mt-3">
                            <ThemeToggle onThemeToggle={onThemeToggle} theme={theme} isMobile />
                        </li>
                    </ul>
                     <div className="d-none d-lg-flex align-items-center ms-3">
                        <ThemeToggle onThemeToggle={onThemeToggle} theme={theme} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

const ThemeToggle = ({ onThemeToggle, theme, isMobile = false }) => (
    <div className={`theme-toggle d-flex align-items-center ${isMobile ? 'justify-content-between' : ''}`}>
        {!isMobile && <i className="fa-solid fa-sun theme-toggle-icon me-2"></i>}
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" checked={theme === 'dark'} onChange={onThemeToggle} />
        </div>
         {isMobile && <label className="form-check-label ms-2">Mode Gelap</label>}
        {!isMobile && <i className="fa-solid fa-moon theme-toggle-icon ms-2"></i>}
    </div>
);

const Footer = () => (
     <footer id="kontak" className="bg-dark text-white-50 pt-5">
        <div className="container pt-5">
            <div className="row gy-5">
                <div className="col-lg-5" data-aos="fade-right">
                    <h4 className="text-white mb-4">Informasi Kontak</h4>
                    <div className="d-flex align-items-center mb-3">
                        <img src={AppData.images.logo} alt="Logo RNG di footer" width="55" height="55" className="bg-black p-1 rounded-circle me-3" />
                        <span className="fw-bold fs-5 text-white">PT Rasyifa Nusantara Group</span>
                    </div>
                    <p className="mt-3"><span className="slogan-highlight">{AppData.content.hero.tagline.split(',')[0]}, dengan Kepercayaan sebagai Landasan</span></p>
                    <ul className="list-unstyled">
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-location-dot mt-1 me-3 text-primary" /><span>{AppData.contact.address}</span></li>
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-envelope mt-1 me-3 text-primary" /><a href={`mailto:${AppData.contact.email}`}>{AppData.contact.email}</a></li>
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-phone mt-1 me-3 text-primary" /><a href={`tel:${AppData.contact.phone1}`}>{AppData.contact.phone1}</a></li>
                         <li className="d-flex mb-3"><Icon className="fa-solid fa-mobile-screen-button mt-1 me-3 text-primary" /><a href={`tel:${AppData.contact.phone2}`}>{AppData.contact.phone2}</a></li>
                    </ul>
                     <div className="mt-4">
                        <a href={AppData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="d-inline-block me-3 fs-4"><Icon className="fa-brands fa-linkedin" /></a>
                        <a href={AppData.contact.instagram} target="_blank" rel="noopener noreferrer" className="d-inline-block me-3 fs-4"><Icon className="fa-brands fa-instagram" /></a>
                    </div>
                </div>

                <div className="col-lg-7" data-aos="fade-left">
                    <h4 className="text-white mb-4">Kirim Pesan kepada Kami</h4>
                    <form action="https://formspree.io/f/movwdwew" method="POST" className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="contact-name" className="form-label">Nama Anda</label>
                                <input type="text" className="form-control" id="contact-name" name="name" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="contact-email" className="form-label">Email Anda</label>
                                <input type="email" className="form-control" id="contact-email" name="email" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="contact-subject" className="form-label">Subjek</label>
                                <input type="text" className="form-control" id="contact-subject" name="subject" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="contact-message" className="form-label">Pesan</label>
                                <textarea className="form-control" id="contact-message" name="message" rows="5" required></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary fw-bold mt-4 px-4">Kirim Pesan</button>
                    </form>
                </div>
            </div>
            <div className="row mt-5" data-aos="fade-up">
                <div className="col-12">
                     <h4 className="text-white mb-4 text-center">Lokasi Kami</h4>
                    <div id="map-container" className="shadow-lg rounded overflow-hidden border border-secondary">
                        <iframe src={AppData.contact.mapUrl} width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div className="text-center py-4 mt-5 border-top border-white border-opacity-10">
                <p className="mb-0 small">© {new Date().getFullYear()} PT Rasyifa Nusantara Group. INTEGRITAS ET EXCELLENCE.</p>
            </div>
        </div>
    </footer>
);

const WhatsAppButton = () => <a href={AppData.contact.whatsapp} className="floating-whatsapp-btn" target="_blank" rel="noopener noreferrer"><Icon className="fa-brands fa-whatsapp" /></a>;

const GalleryModal = ({ activeImage, onClose }) => {
    if (!activeImage) return null;
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content bg-transparent border-0">
                    <div className="modal-body p-0 position-relative">
                        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" style={{zIndex: 1056}} aria-label="Close" onClick={onClose}></button>
                        <img src={activeImage} className="img-fluid w-100" alt="Galeri diperbesar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// HALAMAN UTAMA
const HomePage = ({ isScriptsLoaded }) => {
    const [activeImage, setActiveImage] = useState(null);
    const projects = [
        { title: 'Pengembangan Wisata Alam & Agroforestry Strategis - Gapoktan Gunung Madu & PT Amanah Berkah Sentosa', partner: 'Gapoktan Gunung Madu & PT Amanah Berkah Sentosa', desc: 'Kerja sama strategis dalam pengelolaan dan pengembangan wisata alam maupun agroforestry yang berkelanjutan di Kabupaten Trenggalek, Jawa Timur. Kami memastikan proyek ini menyelaraskan aspek konservasi dan pemberdayaan masyarakat sekitar hutan untuk mendukung ekonomi lokal.' },
        { title: 'Pendampingan Izin Lingkungan UKL-UPL - PT Aulia Prima Perkasa', partner: 'PT Aulia Prima Perkasa', desc: 'Mengawal dan memastikan kepatuhan terhadap regulasi untuk kelancaran proses perizinan lingkungan (UKL-UPL) secara cepat dan tepat sasaran.' },
        { title: 'Pendampingan Izin Penangkaran Rusa - PT Amanah Berkah Sentosa', partner: 'PT Amanah Berkah Sentosa', desc: 'Memastikan kelayakan klien untuk izin penangkaran rusa, serta mengawal proses agar sesuai dengan Standar Operasional Prosedur (SOP) yang berlaku hingga izin dikeluarkan tepat sasaran.' },
        { title: 'Pendampingan Izin IPPKH (Skema PP24) - PT Masempo Dale', partner: 'PT Masempo Dale', desc: 'Mendampingi pengurusan Izin Pinjam Pakai Kawasan Hutan (IPPKH) melalui Skema PP24. Kami memastikan dan mengawal proses pembayaran denda ke negara terkait keterlanjuran pembukaan lahan yang telah dilakukan, sesuai dengan SOP dan tanpa melewatkan kewajiban.' },
        { title: 'Pendampingan Izin IPPKH (Skema PP24) - PT Suprabari Mapanindo M.', partner: 'PT Suprabari Mapanindo Mineral', desc: 'Mengawal proses pengurusan IPPKH melalui Skema PP24, memastikan kewajiban denda kepada negara terkait keterlanjuran pembukaan lahan dipenuhi sesuai dengan prosedur yang berlaku.' },
        { title: 'Pendampingan Izin Pengeboran Air Tanah (SIPAT) - Mitra: PT Ganda Alam Makmur', partner: 'PT Ganda Alam Makmur', desc: 'Mendampingi pengurusan Surat Izin Pengeboran Air Tanah (SIPAT) dengan mengawal kelengkapan berkas untuk memastikan izin keluar dengan cepat dan tepat.' },
    ];
    
    const sliderRef = useRef(null);
    useEffect(() => {
        if(isScriptsLoaded && sliderRef.current) {
            const $slider = window.$(sliderRef.current);
            if (!$slider.hasClass('slick-initialized')) {
                $slider.slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [
                        { breakpoint: 992, settings: { slidesToShow: 2 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } }
                    ]
                });
            }
        }
        return () => {
             if (sliderRef.current && typeof window.$ !== 'undefined' && typeof window.$.fn.slick !== 'undefined' && window.$(sliderRef.current).hasClass('slick-initialized')) {
                window.$(sliderRef.current).slick('unslick');
            }
        }
    }, [isScriptsLoaded]);
    
    return (
        <>
            <GalleryModal activeImage={activeImage} onClose={() => setActiveImage(null)} />
            
            <section className="hero-bg d-flex align-items-center text-white">
                <div className="container text-center" data-aos="fade-up">
                    <h1 className="hero-title">{AppData.content.hero.title}</h1>
                    <p className="hero-tagline">{AppData.content.hero.tagline}</p>
                    <div className="d-flex justify-content-center flex-wrap gap-3">
                        <a href="#layanan" className="btn btn-light btn-lg fw-bold px-4">Jelajahi Layanan</a>
                        <a href="#kontak" className="btn btn-outline-light btn-lg fw-bold px-4">Konsultasi Sekarang</a>
                    </div>
                </div>
            </section>
            
            <section id="tentang" className="py-5">
                <div className="container py-lg-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-right">
                            <img src={AppData.images.about} alt="Tim Rasyifa Group berdiskusi" className="img-fluid rounded-3 shadow-lg"/>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <SectionKicker>{AppData.content.about.kicker}</SectionKicker>
                            <SectionTitle>{AppData.content.about.title}</SectionTitle>
                            <p className="fs-5 mt-3">{AppData.content.about.p1}</p>
                            <p className="mt-3">{AppData.content.about.p2}</p>
                        </div>
                    </div>
                </div>
            </section>

             <section id="sejarah" className="py-5 bg-light-green">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center">
                        <SectionKicker>Perjalanan Kami</SectionKicker>
                        <SectionTitle>Sejarah Perusahaan</SectionTitle>
                        <SectionLead>PT Rasyifa Nusantara Group didirikan untuk menjembatani pembangunan ekonomi dari tingkat tapak sampai sekala nasional dengan mengedepankan kelestarian lingkungan, serta memperluas cakupan layanan untuk pendampingan secara komprehensif, berhasil meyelesaikan pendampingan pengurusan IPPKH, Amdal, UKL-UPL, Perhutanan Sosial, untuk Klien2 Ternama dan membangun reputasi yang solid, dan terus berinovasi dalam memberikan solusi perizinan yang sederhana amanah dan tepat sasaran untuk menghadapi tantangan masa depan yang lebih baik.</SectionLead>
                    </div>
                </div>
            </section>

            <section id="proyek" className="py-5 bg-light-green">
                <div className="container py-lg-5" data-aos="fade-up">
                     <div className="text-center mb-5">
                        <SectionKicker>PORTOFOLIO KAMI</SectionKicker>
                        <SectionTitle>Proyek Unggulan Kami</SectionTitle>
                        <SectionLead>Berikut adalah beberapa proyek yang telah kami kerjakan, menunjukkan komitmen kami dalam memberikan solusi terbaik.</SectionLead>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="accordion" id="projectAccordion">
                                {projects.map((proj, index) => (
                                    <div className="accordion-item" key={index} data-aos="fade-up" data-aos-delay={100 + index * 50}>
                                        <h2 className="accordion-header" id={`heading${index}`}>
                                            <button className={`accordion-button ${index > 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={index === 0} aria-controls={`collapse${index}`}>
                                                <span className="fw-bold">{proj.title}</span>
                                            </button>
                                        </h2>
                                        <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#projectAccordion">
                                            <div className="accordion-body">
                                                <p className="text-muted mb-2">Mitra: {proj.partner}</p>
                                                <p className="mb-0">{proj.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <section id="galeri" className="py-5">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center mb-5">
                        <SectionKicker>Dokumentasi Proyek</SectionKicker>
                        <SectionTitle>Galeri Kami</SectionTitle>
                    </div>
                    <ul className="nav nav-tabs justify-content-center border-bottom-0 mb-5" id="galleryTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="featured-tab" data-bs-toggle="tab" data-bs-target="#featured-pane" type="button" role="tab" aria-selected="true">Proyek Unggulan</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="new-gallery-tab" data-bs-toggle="tab" data-bs-target="#new-gallery-pane" type="button" role="tab" aria-selected="false">Kegiatan</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="galleryTabContent">
                        <div className="tab-pane fade show active" id="featured-pane" role="tabpanel">
                            <div className="row g-4 mb-5">
                                {AppData.images.featuredGallery.map((item, index) => (
                                    <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={100 * index} key={item.id}>
                                        <div className="gallery-card shadow-sm border rounded overflow-hidden">
                                            <a href="#" className="gallery-item d-block" onClick={(e) => { e.preventDefault(); setActiveImage(item.src); }}>
                                                <img src={item.src} className="img-fluid w-100" style={{aspectRatio: '4/3', objectFit: 'cover'}} alt={item.alt} loading="lazy" />
                                            </a>
                                            <div className="gallery-caption p-3 text-center">
                                                <p className="mb-0 small fw-medium">{item.alt}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div ref={sliderRef} className="gallery-slider">
                                {AppData.images.sliderGallery.map((src, index) => (
                                    <div key={index} className="px-2">
                                        <a href="#" className="slide-image-wrapper shadow-sm d-block rounded overflow-hidden" onClick={(e) => { e.preventDefault(); setActiveImage(src); }}>
                                            <img src={src} alt={`Galeri slider ${index + 1}`} loading="lazy" className="w-100 h-100 object-cover"/>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="new-gallery-pane" role="tabpanel">
                             <div className="row g-4">
                                {AppData.images.activityGallery.map((src, index) => (
                                    <div className="col-6 col-md-4 col-lg-3" key={index}>
                                        <a href="#" className="gallery-grid-item d-block rounded overflow-hidden shadow-sm" onClick={(e) => { e.preventDefault(); setActiveImage(src); }}>
                                            <img src={src} alt={`Kegiatan ${index + 1}`} loading="lazy" className="w-100 h-100 object-cover"/>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="clients" className="py-5 bg-light-green">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center mb-5">
                        <SectionKicker>Dipercaya Oleh</SectionKicker>
                        <SectionTitle>Klien dan Mitra Kami</SectionTitle>
                        <SectionLead>Kami bangga dapat bekerja sama dengan CV, PT Perorangan dan Perusahaan terkemuka di berbagai kalangan industri. Kami juga sangat senang jika klien dan mitra kami puas bahkan sampai tersentuh dengan pendampingan yang kami berikan.</SectionLead>
                    </div>
                    <div className="clients-grid">
                        {AppData.images.clients.map((client, index) =>(
                             <div className="client-item text-center" key={index}>
                                <img src={client.logo} className="client-logo mx-auto" alt={`Logo ${client.name}`} />
                                <p className="client-name mt-3 fw-semibold small">{client.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default function App() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}
