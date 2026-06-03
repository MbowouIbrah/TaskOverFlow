import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from '../components/OptimizedImage';
import Reveal from '../components/Reveal';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full relative bg-[#111821]">
        <Reveal className="relative flex min-h-[600px] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          {/* Generated Background - Teacher and students */}
          <div className="absolute inset-0 z-0 opacity-60">
            {/* 
                [IMAGE FLAG]
                Destination: /images/about_hero.jpg
                Source ZIP: smed_photorealistic_image_of_a_rural_african_classroom...
            */}
            <OptimizedImage
              src="/images/about_hero.png"
              alt="About Hero - African classroom"
              className="w-full h-full object-cover"
              containerClassName="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111821] to-transparent pointer-events-none"></div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 max-w-[800px]">
            <Reveal delay={100} direction="down">
              <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm self-center border border-white/10">{t.about.heroSubtitle}</span>
            </Reveal>
            <Reveal delay={200}>
               <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl drop-shadow-lg">
                {t.about.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <h2 className="text-gray-200 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                {t.about.heroDesc}
              </h2>
            </Reveal>
          </div>
        </Reveal>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center px-4 py-16 md:px-10 w-full max-w-[1280px]">
        <div className="flex flex-col w-full gap-24">
          
          {/* Philosophy Section */}
          <section className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 flex flex-col gap-8">
              <Reveal>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[#111418] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                    {t.about.philosophyTitle}
                  </h2>
                  <div className="h-1.5 w-24 bg-primary rounded-full"></div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-[#637388] dark:text-gray-300 text-lg font-normal leading-relaxed">
                  {t.about.philosophyDesc}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-[#637388] dark:text-gray-300 text-lg font-normal leading-relaxed">
                  {t.about.philosophyDesc2}
                </p>
              </Reveal>
            </div>
            <Reveal direction="left" delay={300} className="flex-1 w-full">
              <div className="relative">
                <div className="absolute top-6 left-6 w-full h-full border-2 border-primary/20 rounded-2xl z-0 hidden md:block"></div>
                {/* Generated Image: Child writing */}
                {/* 
                    [IMAGE FLAG]
                    Destination: /images/about_philosophy.jpg
                    Source ZIP: smed_close_up_photorealistic_image_of_a_black_african_childs_hands...
                */}
                <OptimizedImage
                  src="/images/about_philosophy.png"
                  alt="Philosophy - Learning in rural school"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover aspect-video hover:scale-[1.02] transition-transform duration-500"
                  containerClassName="rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </Reveal>
          </section>

          {/* Mission & Vision Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <Reveal delay={100} className="h-full">
              <div className="h-full flex flex-col gap-6 rounded-2xl border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">flag</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">{t.about.missionTitle}</h3>
                  <p className="text-[#637388] dark:text-gray-300 text-base leading-relaxed">
                    {t.about.missionDesc}
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-center gap-3 text-sm font-medium text-[#111418] dark:text-gray-200">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      {t.about.missionPoint1}
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-[#111418] dark:text-gray-200">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      {t.about.missionPoint2}
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
            {/* Vision */}
            <Reveal delay={200} className="h-full">
              <div className="h-full flex flex-col gap-6 rounded-2xl border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">{t.about.visionTitle}</h3>
                  <p className="text-[#637388] dark:text-gray-300 text-base leading-relaxed">
                    {t.about.visionDesc}
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-center gap-3 text-sm font-medium text-[#111418] dark:text-gray-200">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      {t.about.visionPoint1}
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-[#111418] dark:text-gray-200">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      {t.about.visionPoint2}
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Core Values Section */}
          <section className="w-full">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white sm:text-4xl mb-2">{t.about.valuesTitle}</h2>
              <p className="text-lg text-[#637388] dark:text-gray-400 max-w-2xl mx-auto">
                {t.about.valuesDesc}
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: t.about.val1Title, desc: t.about.val1Desc, icon: "diversity_3" },
                { title: t.about.val2Title, desc: t.about.val2Desc, icon: "school" },
                { title: t.about.val3Title, desc: t.about.val3Desc, icon: "handshake" },
                { title: t.about.val4Title, desc: t.about.val4Desc, icon: "lightbulb" }
              ].map((val, idx) => (
                <Reveal key={idx} delay={idx * 150} className="h-full">
                  <div className="flex flex-col h-full p-8 rounded-2xl bg-[#f6f7f8] dark:bg-gray-800/50 border border-[#dce0e5] dark:border-gray-700 text-center items-center hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-[32px]">{val.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#111418] dark:text-white mb-3">{val.title}</h3>
                    <p className="text-[#637388] dark:text-gray-300 leading-relaxed text-sm">
                      {val.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Where We Work Section */}
          <section className="w-full rounded-3xl bg-white dark:bg-gray-800 overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row">
               <div className="flex-1 min-h-[400px] lg:min-h-auto bg-gray-100 dark:bg-gray-700 relative overflow-hidden group order-2 lg:order-1">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    loading="lazy"
                    src="https://maps.google.com/maps?q=Entr%C3%A9e+Simbock,Yaounde,Cameroun&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 min-h-[400px]"
                    title="Carte Zone d'intervention"
                  ></iframe>
                
                {/* Visual Marker Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] z-20 pointer-events-none drop-shadow-xl">
                  <span className="material-symbols-outlined text-red-600 text-6xl">location_on</span>
                </div>

                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 transition-opacity pointer-events-none group-hover:opacity-0"></div>
              </div>

              <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center gap-8 order-1 lg:order-2">
                <Reveal>
                  <h2 className="text-3xl font-bold text-[#111418] dark:text-white">{t.about.workTitle}</h2>
                  <p className="text-[#637388] dark:text-gray-300 text-lg leading-relaxed">
                    {t.about.workDesc}
                  </p>
                </Reveal>
                
                <div className="space-y-6 mt-4">
                  <Reveal delay={100}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">public</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111418] dark:text-white text-xl mb-1">{t.about.workRegionTitle}</h4>
                        <p className="text-sm text-[#637388] dark:text-gray-300">{t.about.workRegionDesc}</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={200}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">school</span>
                      </div>
                      <div>
                         <h4 className="font-bold text-[#111418] dark:text-white text-xl mb-1">{t.about.workCentersTitle}</h4>
                         <p className="text-sm text-[#637388] dark:text-gray-300">{t.about.workCentersDesc}</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
                
                <Link to="/programs" className="mt-4 self-start text-primary font-bold hover:underline flex items-center gap-2 group">
                  {t.home.viewAllPrograms} <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* CTA Strip */}
      <section className="w-full bg-primary py-20 px-4 mt-12">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-white text-3xl font-bold leading-tight">{t.about.readyDiff}</h2>
            <p className="text-blue-100 text-lg max-w-xl">{t.about.readyDiffDesc}</p>
          </Reveal>
          <Reveal delay={200} className="flex gap-4">
            <Link to="/membership" className="flex items-center justify-center h-14 px-8 bg-white text-primary rounded-xl font-bold hover:bg-blue-50 hover:-translate-y-1 transition-all shadow-xl">
              {t.nav.membership}
            </Link>
            <Link to="/contact" className="flex items-center justify-center h-14 px-8 bg-blue-600/50 border border-blue-400 text-white rounded-xl font-bold hover:bg-blue-600 hover:border-transparent transition-all">
              {t.nav.contact}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;