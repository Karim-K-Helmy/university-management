import React, { useState } from 'react';
import { TIMELINE } from '../../data/mockData';

const GALLERY_TABS = ['الحرم الجامعي', 'المختبرات', 'فعاليات'];
const GALLERY_IMAGES = {
  'الحرم الجامعي': [
    '/assets/images/campus-main.jpg',
    '/assets/images/news-accreditation.jpg',
    '/assets/images/gallery-campus-hall.jpeg',
    '/assets/images/gallery-campus-classroom.jpg',
  ],
  'المختبرات': [
    '/assets/images/gallery-lab-chemistry.jpg',
    '/assets/images/gallery-lab-engineering.jpg',
    '/assets/images/gallery-lab-research.jpg',
    '/assets/images/gallery-lab-design.jpg',
  ],
  'فعاليات': [
    '/assets/images/gallery-event-conference.jpg',
    '/assets/images/gallery-event-workshop.jpg',
    '/assets/images/gallery-event-music.jpg',
    '/assets/images/gallery-event-corporate.jpg',
  ],
};

const AboutPage = () => {
  const [galleryTab, setGalleryTab] = useState('الحرم الجامعي');
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/assets/images/campus-main.jpg" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-primary-950/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: 'Cairo' }}>عن الجامعة</h1>
            <p className="text-white/70">نبني قادة المستقبل منذ 2010</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-20">

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: 'fa-bullseye', color: 'from-primary-500 to-primary-700', title: 'رسالتنا', text: 'تقديم تعليم عالٍ ذو جودة استثنائية يُعِدّ الطلاب للمنافسة في الأسواق المحلية والعالمية من خلال برامج أكاديمية متميزة وبحث علمي رائد.' },
            { icon: 'fa-eye', color: 'from-accent-500 to-accent-600', title: 'رؤيتنا', text: 'أن نكون الجامعة الأولى في المنطقة في جودة التعليم والبحث العلمي بحلول عام 2030، مع الحفاظ على قيمنا الأصيلة.' },
          ].map(({ icon, color, title, text }) => (
            <div key={title} className="card p-8">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                <i className={`fa-solid ${icon} text-white text-xl`} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* President's Message */}
        <div className="card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-right">
              <img
                src="/assets/images/president-abdullah.png"
                alt="رئيس الجامعة"
                className="w-36 h-36 rounded-2xl mx-auto md:mx-0 ring-4 ring-primary-100 dark:ring-primary-900/30 mb-4"
              />
              <h3 className="font-black text-gray-900 dark:text-white">أ.د. عبدالله الرشيد</h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm">رئيس الجامعة</p>
            </div>
            <div className="md:col-span-2">
              <span className="section-tag"><i className="fa-solid fa-quote-right" /> كلمة الرئيس</span>
              <h2 className="section-title mb-4">رسالة القيادة</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                يسعدني أن أرحب بكم في جامعة المستقبل، الصرح التعليمي الذي يؤمن بأن كل طالب يحمل في داخله إمكانات لا محدودة تنتظر من يطلقها.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                نلتزم بتوفير بيئة تعليمية متكاملة تجمع بين الأصالة والمعاصرة، وتُعِدّ خريجينا ليكونوا قادة المستقبل في شتى المجالات.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-12">
            <span className="section-tag"><i className="fa-solid fa-timeline" /> مسيرتنا</span>
            <h2 className="section-title">تاريخ الجامعة</h2>
          </div>
          <div className="relative">
            <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-300 hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 card p-6 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-3xl font-black text-primary-600 dark:text-primary-400">{item.year}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-primary-600 text-white items-center justify-center flex-shrink-0 z-10 shadow-glow ring-4 ring-primary-100 dark:ring-primary-900/30">
                    <i className="fa-solid fa-check text-sm" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <div className="text-center mb-8">
            <span className="section-tag"><i className="fa-solid fa-images" /> استكشف</span>
            <h2 className="section-title">معرض الصور</h2>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-6 bg-gray-100 dark:bg-dark-card rounded-xl p-1.5 w-fit mx-auto">
            {GALLERY_TABS.map(tab => (
              <button key={tab} onClick={() => setGalleryTab(tab)} className={`tab-btn ${galleryTab === tab ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY_IMAGES[galleryTab].map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
                onClick={() => setLightbox({ images: GALLERY_IMAGES[galleryTab], index: i })}
              >
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <i className="fa-solid fa-magnifying-glass-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 left-4 text-white text-2xl" onClick={() => setLightbox(null)}>
            <i className="fa-solid fa-xmark" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
            onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length })); }}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
          <img src={lightbox.images[lightbox.index]} alt="" className="max-h-[85vh] max-w-full rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
            onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: (l.index + 1) % l.images.length })); }}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
