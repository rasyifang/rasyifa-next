// pages/index.js

import React, { useState, useEffect, useRef } from 'react';
import { AppConfig } from '../lib/data'; // Impor data dari file terpisah

// ============================================================================
// KOMPONEN-KOMPONEN KECIL (UTILITY)
// ============================================================================
const Icon = ({ className }) => <i className={className}></i>;
const SectionKicker = ({ children }) => <p className="section-kicker">{children}</p>;
const SectionTitle = ({ children }) => <h2 className="h1 fw-bold text-secondary">{children}</h2>;
const SectionLead = ({ children }) => <p className="lead col-lg-8 mx-auto">{children}</p>;

// ============================================================================
// KOMPONEN-KOMPONEN UTAMA (HEADER, FOOTER, DLL)
// ============================================================================
const Header = ({ onThemeToggle, theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ["Tentang", "Sejarah", "Tim", "Proyek", "Layanan", "Testimoni", "Klien", "Galeri", "Kontak"];
    
    return (
        <header>
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
        </header>
    );
};

const ThemeToggle = ({ onThemeToggle, theme, isMobile = false }) => (
    <div className={`theme-toggle d-flex align-items-center ${isMobile ? 'justify-content-between' : ''}`}>
        {!isMobile && <i className="fa-solid fa-sun theme-toggle-icon me-2"></i>}
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" checked={theme === 'dark'} onChange={onThemeToggle} id={`theme-toggle-${isMobile ? 'mobile' : 'desktop'}`} />
        </div>
        {!isMobile && <i className="fa-solid fa-moon theme-toggle-icon ms-2"></i>}
        {isMobile && <label className="form-check-label ms-2" htmlFor={`theme-toggle-${isMobile ? 'mobile' : 'desktop'}`}>Mode Gelap</label>}
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
                    <div className="tab-pane fade show active" id="rafid-tab-pane" role="tabpanel" tabIndex="0"><div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.rafid.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.rafid.desc}</p></div></div>
                    <div className="tab-pane fade" id="adrie-tab-pane" role="tabpanel" tabIndex="0"><div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.adrie.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.adrie.desc}</p></div></div>
                    <div className="tab-pane fade" id="rionaldo-tab-pane" role="tabpanel" tabIndex="0"><div className="text-center p-4 p-md-5"><h4 className="fw-bold mb-2">{teamData.rionaldo.name}</h4><p className="text-muted col-lg-8 mx-auto">{teamData.rionaldo.desc}</p></div></div>
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
export default function HomePage({ theme, handleThemeToggle, assetsLoaded }) {
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
            <Header onThemeToggle={handleThemeToggle} theme={theme} />
            <main>
                <GalleryModal activeImage={activeImage} onClose={() => setActiveImage(null)} />
                
                <section className="hero-bg d-flex align-items-center text-white">
                    <div className="container text-center" data-aos="fade-up">
                        <h1 className="hero-title">{AppConfig.content.hero.title}</h1>
                        <p className="hero-tagline">{AppConfig.content.hero.tagline}</p>
                        <div className="d-flex justify-content-center flex-wrap gap-3"><a href="#layanan" className="btn btn-light btn-lg fw-bold px-4">Jelajahi Layanan</a><a href="#kontak" className="btn btn-outline-light btn-lg fw-bold px-4">Konsultasi Sekarang</a></div>
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
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    );
};
