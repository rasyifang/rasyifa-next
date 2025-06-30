import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// DATA & KONFIGURASI APLIKASI
// Semua teks dan URL gambar diambil langsung dari file asli untuk akurasi 100%.
// ============================================================================
const AppConfig = {
  meta: {
    title: "PT Rasyifa Nusantara Group - Konsultan Lingkungan & Perizinan",
    description: "PT Rasyifa Nusantara Group - Konsultan profesional untuk perizinan lingkungan, kehutanan, dan pertambangan. Solusi lengkap AMDAL, UKL-UPL, IPPKH, dan perizinan industri lainnya di Indonesia.",
    author: "PT Rasyifa Nusantara Group",
    ogImage: "https://rng.my.id/img/img-2.webp",
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
    history: {
      kicker: "Perjalanan Kami",
      title: "Sejarah Perusahaan",
      lead: "PT Rasyifa Nusantara Group didirikan untuk menjembatani pembangunan ekonomi dari tingkat tapak sampai sekala nasional dengan mengedepankan kelestarian lingkungan, serta memperluas cakupan layanan untuk pendampingan secara komprehensif, berhasil meyelesaikan pendampingan pengurusan IPPKH, Amdal, UKL-UPL, Perhutanan Sosial, untuk Klien2 Ternama dan membangun reputasi yang solid, dan terus berinovasi dalam memberikan solusi perizinan yang sederhana amanah dan tepat sasaran untuk menghadapi tantangan masa depan yang lebih baik."
    },
    team: {
      kicker: "TIM PROFESIONAL",
      title: "Kenali Tim Ahli Kami",
      lead: "Kami didukung oleh tim yang solid dengan keahlian beragam di bidangnya masing-masing, siap memberikan solusi terbaik untuk Anda."
    },
    projects: {
      kicker: "PORTOFOLIO KAMI",
      title: "Proyek Unggulan Kami",
      lead: "Berikut adalah beberapa proyek yang telah kami kerjakan, menunjukkan komitmen kami dalam memberikan solusi terbaik."
    },
    services: {
        kicker: "Solusi Komprehensif",
        title: "Cakupan Layanan Kami"
    },
    testimonials: {
        kicker: "Testimoni Klien",
        title: "Kata Mereka Tentang Kami"
    },
    clients: {
        kicker: "Dipercaya Oleh",
        title: "Klien dan Mitra Kami",
        lead: "Kami bangga dapat bekerja sama dengan CV, PT Perorangan dan Perusahaan terkemuka di berbagai kalangan industri. Kami juga sangat senang jika klien dan mitra kami puas bahkan sampai tersentuh dengan pendampingan yang kami berikan."
    },
    gallery: {
        kicker: "Dokumentasi Proyek",
        title: "Galeri Kami"
    }
  }
};

// ============================================================================
// KOMPONEN UTILITY & PEMBANTU
// ============================================================================
const Icon = ({ className }) => <i className={className}></i>;
const SectionKicker = ({ children }) => <p className="section-kicker">{children}</p>;
const SectionTitle = ({ children }) => <h2 className="h1 fw-bold text-secondary">{children}</h2>;
const SectionLead = ({ children }) => <p className="lead col-lg-8 mx-auto">{children}</p>;

// ============================================================================
// KOMPONEN LAYOUT UTAMA
// ============================================================================
const Layout = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }, []);
    
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
                await Promise.all([
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' }),
                    loadAsset('link', { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' })
                ]);
                
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

    return (
        <>
            <div id="app-container">
                <Header onThemeToggle={handleThemeToggle} theme={theme} />
                <main>{React.cloneElement(children, { assetsLoaded })}</main>
                <Footer />
                <WhatsAppButton />
            </div>

            <style>{`
                :root { --bs-primary: #059669; --bs-primary-rgb: 5, 150, 105; --bs-secondary: #064e3b; --bs-body-color: #475569; --bs-body-bg: #f8f9fa; --bs-tertiary-bg: #ffffff; --bs-border-color: #e2e8f0; --bs-light-green-bg: #f0fdf4; }
                [data-bs-theme="dark"] { --bs-primary: #34d399; --bs-primary-rgb: 52, 211, 153; --bs-secondary: #a7f3d0; --bs-body-color: #cbd5e1; --bs-body-bg: #1e293b; --bs-tertiary-bg: #334155; --bs-border-color: #475569; --bs-light-green-bg: #064e3b; --bs-dark: #0f172a; }
                html, body { overflow-x: hidden !important; width: 100%; }
                body { font-family: 'Inter', sans-serif; transition: background-color 0.3s, color 0.3s; background-color: var(--bs-body-bg); color: var(--bs-body-color); }
                .bg-light-green { background-color: var(--bs-light-green-bg); }
                .bg-white { background-color: var(--bs-tertiary-bg) !important; }
                .testimonial-card { background-color: var(--bs-tertiary-bg); border-left: 5px solid var(--bs-primary); }
                [data-bs-theme="dark"] .navbar { background-color: rgba(30, 41, 59, 0.9) !important; }
                .hero-bg { background-image: linear-gradient(to top, rgba(5, 46, 22, 0.1), rgba(5, 46, 22, 0.3)), url('${AppConfig.images.heroBg}'); background-size: cover; background-position: center; min-height: 80vh; }
                [data-bs-theme="dark"] .hero-bg { background-image: linear-gradient(to top,rgba(15, 23, 42, .9),rgba(15, 23, 42, .3)),url('${AppConfig.images.heroBg}'); }
                .hero-title { font-size: 2.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2rem; }
                .hero-tagline { font-size: 1.25rem; font-weight: 400; line-height: 1.6; max-width: 850px; margin: 0 auto 7rem auto; }
                @media (max-width: 767.98px) { .hero-title { font-size: 2rem; line-height: 1.3; } .hero-tagline { font-size: 1.1rem; margin-bottom: 7rem; } }
                .section-kicker { font-weight: 600; color: var(--bs-primary); text-transform: uppercase; letter-spacing: .05em; }
                .floating-whatsapp-btn { position: fixed; bottom: 25px; right: 25px; background-color: #25d366; color: #fff; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 2px 2px 10px rgba(0,0,0,.2); z-index: 1030; text-decoration: none; }
                .floating-whatsapp-btn:hover { transform: scale(1.1); color: #fff; }
                footer a { text-decoration: none; color: #adb5bd; transition: color .3s ease; }
                footer a:hover { color: #fff; }
                .slogan-highlight { color: #6ee7b7; font-weight: 600; animation: pulse-glow 3s infinite ease-in-out; }
                @keyframes pulse-glow { 0%{text-shadow:0 0 5px rgba(110,231,183,.6)} 50%{text-shadow:0 0 14px rgba(110,231,183,1)} 100%{text-shadow:0 0 5px rgba(110,231,183,.6)} }
                .gallery-slider .slick-prev, .gallery-slider .slick-next { background-color: rgba(5,150,105,.8); width: 40px; height: 40px; border-radius: 50%; z-index: 1; }
                .gallery-slider .slick-prev:before, .gallery-slider .slick-next:before { font-family: "Font Awesome 6 Free"; font-weight: 900; font-size: 20px; color: #fff; }
                .gallery-slider .slick-prev:before { content: "\\f053"; }
                .gallery-slider .slick-next:before { content: "\\f054"; }
                .gallery-slider .slick-dots li button:before { color: var(--bs-primary); }
                .gallery-slider .slick-dots li.slick-active button:before { color: var(--bs-primary); }
                .gallery-grid-item, .slide-image-wrapper { aspect-ratio: 1 / 1; }
                .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link { color: var(--bs-primary) !important; background-color: var(--bs-tertiary-bg) !important; border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-tertiary-bg) !important; }
                .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2.5rem 2rem; }
                .client-logo { height: 60px; max-width: 150px; object-fit: contain; opacity: 0.9; transition: all 0.3s ease-in-out; }
                .client-logo:hover { opacity: 1; transform: scale(1.1); }
                [data-bs-theme="dark"] .client-logo { opacity: 0.8; filter: brightness(0) invert(1); }
            `}</style>
        </>
    );
}

// ============================================================================
// KOMPONEN-KOMPONEN HALAMAN
// ============================================================================
const Header = ({ onThemeToggle, theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ["Tentang", "Sejarah", "Tim", "Proyek", "Layanan", "Testimoni", "Klien", "Galeri", "Kontak"];
    
    return (
        <nav id="mainNavbar" className="navbar navbar-expand-lg bg-white bg-opacity-90 backdrop-blur sticky-top shadow-sm">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={AppConfig.images.logo} alt="Logo RNG" width="35" height="48" style={{ borderRadius: '50%' }} className="me-2" />
                    <span className="fw-bold fs-5 text-secondary">Rasyifa Nusantara Group</span>
                </a>
                <button className="navbar-toggler border-0" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto fw-semibold">
                        {navLinks.map(link => (
                            <li className="nav-item" key={link}><a className="nav-link" href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>{link}</a></li>
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
            <input className="form-check-input" type="checkbox" role="switch" checked={theme === 'dark'} onChange={onThemeToggle} id={`theme-toggle-${isMobile ? 'mobile' : 'desktop'}`} />
        </div>
        {!isMobile && <i className="fa-solid fa-moon theme-toggle-icon ms-2"></i>}
        {isMobile && <label className="form-check-label ms-2" htmlFor="theme-toggle-mobile">Mode Gelap</label>}
    </div>
);

const Footer = () => (
     <footer id="kontak" className="bg-dark text-white-50 pt-5">
        <div className="container pt-5">
            <div className="row gy-5">
                <div className="col-lg-5" data-aos="fade-right">
                    <h4 className="text-white mb-4">Informasi Kontak</h4>
                    <div className="d-flex align-items-center mb-3">
                        <img src={AppConfig.images.logo} alt="Logo RNG di footer" width="55" height="55" className="bg-black p-1 rounded-circle me-3" />
                        <span className="fw-bold fs-5 text-white">PT Rasyifa Nusantara Group</span>
                    </div>
                    <p className="mt-3"><span className="slogan-highlight">Jembatan Antara Kompleksitas menjadi Kesederhanaan, dengan Kepercayaan sebagai Landasan</span></p>
                    <ul className="list-unstyled">
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-location-dot mt-1 me-3 text-primary" /><span>{AppConfig.contact.address}</span></li>
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-envelope mt-1 me-3 text-primary" /><a href={`mailto:${AppConfig.contact.email}`}>{AppConfig.contact.email}</a></li>
                        <li className="d-flex mb-3"><Icon className="fa-solid fa-phone mt-1 me-3 text-primary" /><a href={`tel:${AppConfig.contact.phone1}`}>{AppConfig.contact.phone1}</a></li>
                         <li className="d-flex mb-3"><Icon className="fa-solid fa-mobile-screen-button mt-1 me-3 text-primary" /><a href={`tel:${AppConfig.contact.phone2}`}>{AppConfig.contact.phone2}</a></li>
                    </ul>
                     <div className="mt-4">
                        <a href={AppConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="d-inline-block me-3 fs-4"><Icon className="fa-brands fa-linkedin" /></a>
                        <a href={AppConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="d-inline-block me-3 fs-4"><Icon className="fa-brands fa-instagram" /></a>
                    </div>
                </div>

                <div className="col-lg-7" data-aos="fade-left">
                    <h4 className="text-white mb-4">Kirim Pesan kepada Kami</h4>
                    <form action="https://formspree.io/f/movwdwew" method="POST" className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-md-6"><label htmlFor="contact-name" className="form-label">Nama Anda</label><input type="text" className="form-control" id="contact-name" name="name" required /></div>
                            <div className="col-md-6"><label htmlFor="contact-email" className="form-label">Email Anda</label><input type="email" className="form-control" id="contact-email" name="email" required /></div>
                            <div className="col-12"><label htmlFor="contact-subject" className="form-label">Subjek</label><input type="text" className="form-control" id="contact-subject" name="subject" required /></div>
                            <div className="col-12"><label htmlFor="contact-message" className="form-label">Pesan</label><textarea className="form-control" id="contact-message" name="message" rows="5" required></textarea></div>
                        </div>
                        <button type="submit" className="btn btn-primary fw-bold mt-4 px-4">Kirim Pesan</button>
                    </form>
                </div>
            </div>
            <div className="row mt-5" data-aos="fade-up">
                <div className="col-12">
                     <h4 className="text-white mb-4 text-center">Lokasi Kami</h4>
                    <div id="map-container" className="shadow-lg rounded overflow-hidden border border-secondary">
                        <iframe src={AppConfig.contact.mapUrl} width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div className="text-center py-4 mt-5 border-top border-white border-opacity-10">
                <p className="mb-0 small">© {new Date().getFullYear()} PT Rasyifa Nusantara Group. INTEGRITAS ET EXCELLENCE.</p>
            </div>
        </div>
    </footer>
);

const WhatsAppButton = () => <a href={AppConfig.contact.whatsapp} className="floating-whatsapp-btn" target="_blank" rel="noopener noreferrer"><Icon className="fa-brands fa-whatsapp" /></a>;

const GalleryModal = ({ activeImage, onClose }) => {
    if (!activeImage) return null;
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered modal-lg"><div className="modal-content bg-transparent border-0"><div className="modal-body p-0 position-relative">
                <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" style={{zIndex: 1056}} aria-label="Close" onClick={onClose}></button>
                <img src={activeImage} className="img-fluid w-100" alt="Galeri diperbesar" />
            </div></div></div>
        </div>
    );
};

// ============================================================================
// KOMPONEN-KOMPONEN SEKSI HALAMAN
// ============================================================================
const TeamSection = () => {
    const teamData = {
        rafid: { name: 'Rafid Enggar Yasdianto, SH', desc: 'Dengan pengalaman lebih dari 10 tahun, memimpin tim serta koordinasi dengan beberapa instansi, di bidang hukum maupun teknis lingkungan dan kehutanan.' },
        adrie: { name: 'Adrie Wahyu Putra Ratag, A.Md. Pel', desc: 'Lebih dari 5 tahun membantu dan mengendalikan tim, serta koordinasi terkait teknis pengawasan.' },
        rionaldo: { name: 'Rionaldo Ratag', desc: 'Kurang lebih 10 tahun berpengalaman dalam mengendalikan dan konseptor terkait kondisi krusial yang sedang dialami klien.' }
    };

    return (
        <section id="tim" className="py-5">
            <div className="container py-lg-5" data-aos="fade-up">
                <div className="text-center mb-5">
                    <SectionKicker>{AppConfig.content.team.kicker}</SectionKicker>
                    <SectionTitle>{AppConfig.content.team.title}</SectionTitle>
                    <SectionLead>{AppConfig.content.team.lead}</SectionLead>
                </div>

                <ul className="nav nav-tabs justify-content-center mb-0" id="teamTab" role="tablist">
                    <li className="nav-item" role="presentation"><button className="nav-link active" id="rafid-tab" data-bs-toggle="tab" data-bs-target="#rafid-tab-pane" type="button" role="tab">Rafid Enggar Y.</button></li>
                    <li className="nav-item" role="presentation"><button className="nav-link" id="adrie-tab" data-bs-toggle="tab" data-bs-target="#adrie-tab-pane" type="button" role="tab">Adrie Wahyu P. R.</button></li>
                    <li className="nav-item" role="presentation"><button className="nav-link" id="rionaldo-tab" data-bs-toggle="tab" data-bs-target="#rionaldo-tab-pane" type="button" role="tab">Rionaldo Ratag</button></li>
                </ul>

                <div className="tab-content border border-top-0 rounded-bottom" id="teamTabContent">
                    <div className="tab-pane fade show active" id="rafid-tab-pane" role="tabpanel" tabIndex="0">
                        <div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.rafid.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.rafid.desc}</p></div>
                    </div>
                    <div className="tab-pane fade" id="adrie-tab-pane" role="tabpanel" tabIndex="0">
                        <div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.adrie.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.adrie.desc}</p></div>
                    </div>
                    <div className="tab-pane fade" id="rionaldo-tab-pane" role="tabpanel" tabIndex="0">
                        <div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.rionaldo.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.rionaldo.desc}</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectsSection = () => {
    const projects = [
        { title: 'Pengembangan Wisata Alam & Agroforestry Strategis', partner: 'Gapoktan Gunung Madu & PT Amanah Berkah Sentosa', desc: 'Kerja sama strategis dalam pengelolaan dan pengembangan wisata alam maupun agroforestry yang berkelanjutan di Kabupaten Trenggalek, Jawa Timur. Kami memastikan proyek ini menyelaraskan aspek konservasi dan pemberdayaan masyarakat sekitar hutan untuk mendukung ekonomi lokal.' },
        { title: 'Pendampingan Izin Lingkungan UKL-UPL', partner: 'PT Aulia Prima Perkasa', desc: 'Mengawal dan memastikan kepatuhan terhadap regulasi untuk kelancaran proses perizinan lingkungan (UKL-UPL) secara cepat dan tepat sasaran.' },
        { title: 'Pendampingan Izin Penangkaran Rusa', partner: 'PT Amanah Berkah Sentosa', desc: 'Memastikan kelayakan klien untuk izin penangkaran rusa, serta mengawal proses agar sesuai dengan Standar Operasional Prosedur (SOP) yang berlaku hingga izin dikeluarkan tepat sasaran.' },
        { title: 'Pendampingan Izin IPPKH (Skema PP24)', partner: 'PT Masempo Dale', desc: 'Mendampingi pengurusan Izin Pinjam Pakai Kawasan Hutan (IPPKH) melalui Skema PP24. Kami memastikan dan mengawal proses pembayaran denda ke negara terkait keterlanjuran pembukaan lahan yang telah dilakukan, sesuai dengan SOP dan tanpa melewatkan kewajiban.' },
        { title: 'Pendampingan Izin IPPKH (Skema PP24)', partner: 'PT Suprabari Mapanindo M.', desc: 'Mengawal proses pengurusan IPPKH melalui Skema PP24, memastikan kewajiban denda kepada negara terkait keterlanjuran pembukaan lahan dipenuhi sesuai dengan prosedur yang berlaku.' },
        { title: 'Pendampingan Izin Pengeboran Air Tanah (SIPAT)', partner: 'PT Ganda Alam Makmur', desc: 'Mendampingi pengurusan Surat Izin Pengeboran Air Tanah (SIPAT) dengan mengawal kelengkapan berkas untuk memastikan izin keluar dengan cepat dan tepat.' },
    ];
    return (
        <section id="proyek" className="py-5 bg-light-green">
            <div className="container py-lg-5" data-aos="fade-up">
                 <div className="text-center mb-5">
                    <SectionKicker>{AppConfig.content.projects.kicker}</SectionKicker>
                    <SectionTitle>{AppConfig.content.projects.title}</SectionTitle>
                    <SectionLead>{AppConfig.content.projects.lead}</SectionLead>
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
    );
};

const ServicesSection = () => {
     const services = {
        pertambangan: [ { icon: 'fa-gem', title: 'WIUP', desc: 'Wilayah Izin Usaha Pertambangan yang sudah ditetapkan oleh Pemerintah untuk kegiatan Pertambangan.' }, { icon: 'fa-magnifying-glass-chart', title: 'IUP Eksplorasi', desc: 'Izin Usaha Pertambangan untuk melakukan kegiatan Penyelidikan Mineral.' }, { icon: 'fa-truck-moving', title: 'IUP OP', desc: 'Izin Usaha Pertambangan Operasi Produksi setelah tahap Eksplorasi selesai.' }, ],
        lingkungan: [ { icon: 'fa-shield-halved', title: 'AMDAL', desc: 'Analisis Dampak Lingkungan untuk memprediksi dampak lingkungan yang mungkin timbul dari suatu proyek.' }, { icon: 'fa-clipboard-list', title: 'UKL-UPL', desc: 'Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan untuk mengidentifikasi potensi dampak lingkungan.' }, { icon: 'fa-file-circle-check', title: 'SPPL', desc: 'Surat Pernyataan Pengelolaan Lingkungan tentang komitmen untuk mengelola lingkungan hidup.' }, { icon: 'fa-tree', title: 'IPPKH', desc: 'Izin Pinjam Pakai Kawasan Hutan untuk memastikan penggunaan kawasan tidak menimbulkan dampak negatif.' }, { icon: 'fa-draw-polygon', title: 'Tata Batas Kawasan', desc: 'Melindungi kawasan dari kegiatan tidak sesuai dan menghindari konflik penggunaan lahan.' }, { icon: 'fa-mountain-sun', title: 'Rehab DAS', desc: 'Upaya untuk meningkatkan dan memulihkan fungsi Daerah Aliran Sungai yang telah mengalami kerusakan.' }, { icon: 'fa-right-left', title: 'Pelepasan Kawasan Hutan', desc: 'Proses Pengubahan Status Kawasan Hutan menjadi Non Hutan untuk keperluan lain.' }, { icon: 'fa-users', title: 'Perhutanan Sosial', desc: 'Program Pengelolaan Hutan yang melibatkan masyarakat lokal secara berkelanjutan.' }, ],
        lainnya: [ { icon: 'fa-cloud-showers-heavy', title: 'Izin Pengeboran Air Tanah (SIPAT)', desc: 'SIPAT merupakan Surat Izin Pengeboran Air tanah.' }, ]
    };

    const renderServices = (serviceKey) => (
        <div className="row g-4">{services[serviceKey].map(service => (
            <div className="col-md-6 col-lg-4 d-flex" data-aos="fade-up" key={service.title}>
                <div className="p-2"><i className={`fa-solid ${service.icon} fa-fw text-primary fs-4`}></i></div>
                <div><h5 className="fw-bold">{service.title}</h5><p className="small text-muted mb-0">{service.desc}</p></div>
            </div>
        ))}</div>
    );

    return (
        <section id="layanan" className="py-5">
            <div className="container py-lg-5" data-aos="fade-up">
                <div className="text-center mb-5"><SectionKicker>{AppConfig.content.services.kicker}</SectionKicker><SectionTitle>{AppConfig.content.services.title}</SectionTitle></div>
                <ul className="nav nav-tabs justify-content-center border-bottom-0 mb-4" id="servicesTab" role="tablist">
                    <li className="nav-item" role="presentation"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mining-tab-pane" type="button">Pertambangan</button></li>
                    <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#environment-tab-pane" type="button">Lingkungan & Kehutanan</button></li>
                    <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#other-tab-pane" type="button">Izin Lainnya</button></li>
                </ul>
                <div className="tab-content" id="servicesTabContent">
                    <div className="tab-pane fade show active" id="mining-tab-pane" role="tabpanel"><div className="bg-white p-4 p-md-5 rounded-3 shadow-lg">{renderServices('pertambangan')}</div></div>
                    <div className="tab-pane fade" id="environment-tab-pane" role="tabpanel"><div className="bg-white p-4 p-md-5 rounded-3 shadow-lg">{renderServices('lingkungan')}</div></div>
                    <div className="tab-pane fade" id="other-tab-pane" role="tabpanel"><div className="bg-white p-4 p-md-5 rounded-3 shadow-lg">{renderServices('lainnya')}</div></div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const testimonials = [
        { name: 'Anang Budi Santoso', role: 'Direktur, PT Amanah Berkah Sentosa', text: '"Proses pengurusan Perijinan Penangkaran Rusa Kami yang rumit menjadi sangat sederhana dan lancar berkat bantuan tim Rasyifa Nusantara Group. Hasilnya sangat memuaskan. Goood Job!"', initial: 'ABS' },
        { name: 'Handoyo', role: 'Ketua, Gapoktan Gunung Madu', text: '"Proses pendampingan pengurusan ijin HKm berjalan dengan cepat dan teliti, tim PT Rasyifa betul-betul mengawal dari hilir sampai ke hulu. PT Rasyifa betul-betul hadir sebagai jembatan antara masyarakat dengan pemerintah."', initial: 'H' },
        { name: 'Dian GAM', role: 'Manager, PT Ganda Alam Makmur', text: '"Memilih PT Rasyifa Nusantara Group untuk mendampingi kami dalam pengurusan SIPAT merupakan langkah tepat. Konsultan yang mendampingi kami benar-benar professional, membuat proses menjadi efektif dan efisien."', initial: 'DG' },
        { name: 'Steven Yohanes Kambey', role: 'Direktur, CV Selaras Maju', text: '"Pengurusan IPPKH melalui Skema PP24 terlihat sederhana karena PT Rasyifa Nusantara Group tidak hanya mendampingi, tetapi juga menjelaskan detail alur sehingga kami mengerti. Pendampingan yang diberikan sangat memuaskan."', initial: 'SYK' },
        { name: 'Teguh Wicaksono', role: 'Direktur Operasional, PT Wahyu Daya Mandiri', text: '"Kami sangat puas dan tersentuh karena pendampingan yang diberikan terasa seperti menjalin hubungan kekeluargaan. Berkat konsultan yang professional dan amanah, kami berhasil melewati tahapan pengurusan izin IPPKH dan UKL-UPL."', initial: 'TW' },
        { name: 'H. Dony Wirawan', role: 'Direktur, PO. H. Dony Wirawan', text: '"Jika anda bingung mencari konsultan untuk izin WIUP, IUP, saya dengan senang hati merekomendasikan PT Rasyifa Nusantara Group. Proses yang sat-set namun tepat sasaran sangat luar biasa."', initial: 'DW' }
    ];

    return (
        <section id="testimoni" className="py-5">
            <div className="container py-lg-5" data-aos="fade-up">
                <div className="text-center mb-5"><SectionKicker>{AppConfig.content.testimonials.kicker}</SectionKicker><SectionTitle>{AppConfig.content.testimonials.title}</SectionTitle></div>
                <div className="row g-4">
                    {testimonials.map((item, i) => (
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100 + i * 50} key={i}>
                            <div className="testimonial-card p-4 shadow-sm h-100"><i className="fa-solid fa-quote-left text-primary fa-2x opacity-25"></i><p className="fst-italic my-3">{item.text}</p>
                                <div className="d-flex align-items-center">
                                    <img src={`https://placehold.co/50x50/059669/FFFFFF?text=${item.initial}`} className="rounded-circle" width="50" height="50" alt={`Foto ${item.name}`} loading="lazy" />
                                    <div className="ms-3"><p className="fw-bold mb-0">{item.name}</p><small className="text-muted">{item.role}</small></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// KOMPONEN HALAMAN UTAMA (ENTRY POINT)
// ============================================================================
const HomePage = ({ assetsLoaded }) => {
    const [activeImage, setActiveImage] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        let slider;
        if (assetsLoaded && sliderRef.current) {
            slider = window.$(sliderRef.current);
            if (!slider.hasClass('slick-initialized')) {
                slider.slick({
                    dots: true, infinite: true, speed: 300, slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000,
                    responsive: [ { breakpoint: 992, settings: { slidesToShow: 2 } }, { breakpoint: 768, settings: { slidesToShow: 1 } } ]
                });
            }
        }
        return () => { if (slider && slider.hasClass('slick-initialized')) slider.slick('unslick'); }
    }, [assetsLoaded]);
    
    return (
        <>
            <GalleryModal activeImage={activeImage} onClose={() => setActiveImage(null)} />
            
            <section className="hero-bg d-flex align-items-center text-white">
                <div className="container text-center" data-aos="fade-up">
                    <h1 className="hero-title">{AppConfig.content.hero.title}</h1>
                    <p className="hero-tagline">{AppConfig.content.hero.tagline}</p>
                    <div className="d-flex justify-content-center flex-wrap gap-3">
                        <a href="#layanan" className="btn btn-light btn-lg fw-bold px-4">Jelajahi Layanan</a>
                        <a href="#kontak" className="btn btn-outline-light btn-lg fw-bold px-4">Konsultasi Sekarang</a>
                    </div>
                </div>
            </section>
            
            <section id="tentang" className="py-5">
                <div className="container py-lg-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-right"><img src={AppConfig.images.about} alt="Tim Rasyifa Group berdiskusi" className="img-fluid rounded-3 shadow-lg"/></div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <SectionKicker>{AppConfig.content.about.kicker}</SectionKicker>
                            <SectionTitle>{AppConfig.content.about.title}</SectionTitle>
                            <p className="fs-5 mt-3">{AppConfig.content.about.p1}</p>
                            <p className="mt-3">{AppConfig.content.about.p2}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sejarah" className="py-5 bg-light-green">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center">
                        <SectionKicker>{AppConfig.content.history.kicker}</SectionKicker>
                        <SectionTitle>{AppConfig.content.history.title}</SectionTitle>
                        <SectionLead>{AppConfig.content.history.lead}</SectionLead>
                    </div>
                </div>
            </section>

            <TeamSection />
            <ProjectsSection />
            <ServicesSection />
            <TestimonialsSection />

            <section id="klien" className="py-5 bg-light-green">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center mb-5">
                        <SectionKicker>{AppConfig.content.clients.kicker}</SectionKicker>
                        <SectionTitle>{AppConfig.content.clients.title}</SectionTitle>
                        <SectionLead>{AppConfig.content.clients.lead}</SectionLead>
                    </div>
                    <div className="clients-grid">{AppConfig.images.clients.map((c, i) =>(
                        <div className="client-item text-center" key={i}><img src={c.logo} className="client-logo mx-auto" alt={c.name} /><p className="client-name mt-3 fw-semibold small">{c.name}</p></div>
                    ))}</div>
                </div>
            </section>
            
            <section id="galeri" className="py-5">
                <div className="container py-lg-5" data-aos="fade-up">
                    <div className="text-center mb-5"><SectionKicker>{AppConfig.content.gallery.kicker}</SectionKicker><SectionTitle>{AppConfig.content.gallery.title}</SectionTitle></div>
                    <ul className="nav nav-tabs justify-content-center border-bottom-0 mb-5" id="galleryTab" role="tablist">
                        <li className="nav-item" role="presentation"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#featured-pane" type="button">Proyek Unggulan</button></li>
                        <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#new-gallery-pane" type="button">Kegiatan</button></li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="featured-pane">
                            <div className="row g-4 mb-5">
                                {AppConfig.images.featuredGallery.map((item, index) => (
                                    <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={100*index} key={item.id}>
                                        <div className="card h-100 shadow-sm">
                                            <a href="#" onClick={e => {e.preventDefault(); setActiveImage(item.src);}}><img src={item.src} className="card-img-top" style={{aspectRatio: '4/3', objectFit: 'cover'}} alt={item.alt}/></a>
                                            <div className="card-body text-center d-flex flex-column"><p className="card-text small fw-medium mt-auto">{item.alt}</p></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div ref={sliderRef} className="gallery-slider">{AppConfig.images.sliderGallery.map((src, i) => (
                                <div key={i} className="px-2"><a href="#" onClick={e => {e.preventDefault(); setActiveImage(src);}} className="d-block rounded overflow-hidden shadow-sm"><img src={src} className="w-100" style={{aspectRatio: '4/3', objectFit: 'cover'}}/></a></div>
                            ))}</div>
                        </div>
                        <div className="tab-pane fade" id="new-gallery-pane">
                            <div className="row g-4">{AppConfig.images.activityGallery.map((src, i) => (
                                <div className="col-6 col-md-4 col-lg-3" key={i}><a href="#" onClick={e => {e.preventDefault(); setActiveImage(src);}} className="d-block rounded overflow-hidden shadow-sm"><img src={src} className="w-100 h-100 object-cover" style={{aspectRatio: '1/1'}}/></a></div>
                            ))}</div>
                        </div>
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
