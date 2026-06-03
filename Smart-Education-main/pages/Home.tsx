import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from '../components/OptimizedImage';
import Reveal from '../components/Reveal';

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-background-dark">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <Reveal className="rounded-2xl overflow-hidden relative min-h-[560px] flex items-center shadow-2xl">
             {/* Generated Background Image */}
             <div className="absolute inset-0 z-0">
               {/* 
                  [IMAGE FLAG]
                  Destination: /images/home_hero.jpg
                  Source ZIP: smed_photorealistic_wide_shot_of_a_rur...
               */}
               <OptimizedImage
                  src="/images/home_hero.png"
                  alt="Salle de classe rurale générée par IA"
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-105"
                  containerClassName="w-full h-full absolute inset-0"
                  // Fallback temporaire vers Unsplash le temps que vous mettiez les images locales
                  // Supprimez cet attribut une fois les images en place si vous le souhaitez
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none"></div>
             </div>

            <div className="relative z-10 max-w-3xl px-6 lg:px-12 py-10">
              <Reveal delay={200}>
                <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-sm">
                  {t.home.heroTitle}
                </h1>
              </Reveal>
              <Reveal delay={400}>
                <p className="text-lg text-gray-100 mb-8 max-w-xl leading-relaxed font-light">
                  {t.home.heroDesc}
                </p>
              </Reveal>
              <Reveal delay={600} className="flex flex-wrap gap-4">
                <Link to="/membership" className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-white font-bold text-base shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                  {t.home.join}
                </Link>
                <Link to="/programs" className="flex items-center justify-center h-12 px-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                  {t.home.discover}
                </Link>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-background-dark relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800/20 to-transparent pointer-events-none"></div>

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{t.home.valuesTitle}</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">{t.home.valuesSubtitle}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {t.home.valuesDesc}
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.home.val1Title, desc: t.home.val1Desc, icon: "handshake" },
              { title: t.home.val2Title, desc: t.home.val2Desc, icon: "lightbulb" },
              { title: t.home.val3Title, desc: t.home.val3Desc, icon: "groups" },
              { title: t.home.val4Title, desc: t.home.val4Desc, icon: "school" }
            ].map((val, idx) => (
              <Reveal key={idx} delay={idx * 150} className="h-full">
                <div className="flex flex-col h-full p-8 rounded-2xl bg-background-light dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined text-[32px]">{val.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">{val.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="py-24 bg-background-light dark:bg-[#0d1218]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">{t.home.programsTitle}</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                {t.home.programsDesc}
              </p>
            </div>
            <Link to="/programs" className="group inline-flex items-center font-bold text-primary hover:text-blue-700 transition-colors">
              {t.home.viewAllPrograms} 
              <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { 
                 title: language === 'fr' ? "Soutien à l'éducation" : "Education Support", 
                 tag: language === 'fr' ? "Éducation" : "Education",
                 prompt_id: "education",
                 desc: language === 'fr' ? "Programmes de tutorat dans des zones rurales où les infrastructures manquent." : "Tutoring programs in rural areas lacking infrastructure." 
               },
               { 
                 title: language === 'fr' ? "Sensibilisation et plaidoyer" : "Awareness and Advocacy",
                 tag: language === 'fr' ? "Communauté" : "Community",
                 prompt_id: "advocacy",
                 desc: language === 'fr' ? "Mobilisation des communautés villageoises pour l'importance de la scolarisation." : "Mobilizing village communities for the importance of schooling."
               },
               {
                 title: language === 'fr' ? "Infrastructures scolaires" : "School Infrastructure",
                 tag: language === 'fr' ? "Infrastructures" : "Infrastructure",
                 prompt_id: "infrastructure",
                 desc: language === 'fr' ? "Réhabilitation de salles de classe en matériaux provisoires et équipement en bancs." : "Rehabilitation of classrooms made of temporary materials and equipment with benches."
               }
             ].map((item, index) => (
                <Reveal key={index} delay={index * 100} className="h-full">
                  <div className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                    <div className="relative h-48 overflow-hidden">
                       {/* 
                          [IMAGE FLAG]
                          Destination: /images/home_program_${index}.jpg
                          Source ZIP: smed_realistic_photo_of_... (recherchez le prompt correspondant ci-dessous)
                          Prompt 0: "...black children sitting on a simple wooden bench..."
                          Prompt 1: "...rural African community meeting under a tree..."
                          Prompt 2: "...weathered wooden school wall in Africa..."
                       */}
                       <OptimizedImage
                          src={`/images/home_program_${index}.png`}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          containerClassName="w-full h-full"
                        />
                       <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-white/95 dark:bg-black/80 backdrop-blur-sm text-primary text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">{item.tag}</span>
                       </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                        {item.desc}
                      </p>
                      <Link to="/programs" className="text-primary text-sm font-bold flex items-center gap-1 group/btn self-start">
                        {t.home.readMore} <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
             ))}
          </div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
           <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">{t.home.newsTitle}</h2>
            </div>
            <Link to="/news" className="group inline-flex items-center font-bold text-primary hover:text-blue-700 transition-colors">
              {t.home.viewBlog} 
              <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
              {
                title: language === 'fr' ? "Soutien en zone rurale" : "Support in rural zones",
                date: "15 Nov 2023",
                desc: language === 'fr' ? "Distribution de cahiers dans une école en bois de la région Est." : "Distribution of notebooks in a wooden school in the East region.",
                img: "https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: language === 'fr' ? "Formation des enseignants" : "Teacher Training",
                date: "10 Oct 2023",
                desc: language === 'fr' ? "Ateliers pour les enseignants travaillant sans électricité ni matériel moderne." : "Workshops for teachers working without electricity or modern equipment.",
                img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: language === 'fr' ? "Rénovation participative" : "Participatory renovation",
                date: "5 Sep 2023",
                desc: language === 'fr' ? "Les parents d'élèves reconstruisent les murs d'une salle de classe." : "Parents rebuild the walls of a classroom.",
                img: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=800&auto=format&fit=crop"
              }
             ].map((news, idx) => {
                return (
                  <Reveal key={idx} delay={idx * 100} className="h-full">
                    <Link to="/news" className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                      <div className="relative h-48 overflow-hidden">
                        {/* 
                          [IMAGE FLAG]
                          Destination: /images/home_news_${idx}.jpg
                          Source ZIP: smed_photorealistic_documentary_style_shot...
                          (Identifiez l'image basée sur le titre: "${news.title}")
                        */}
                        <OptimizedImage
                            src={`/images/home_news_${idx}.png`}
                            fallbackSrc={news.img} // fallback is still useful for dev
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            containerClassName="w-full h-full"
                          />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                          <span>{news.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{news.desc}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
             })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20 px-4">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-white text-3xl font-bold leading-tight">{t.home.ctaTitle}</h2>
            <p className="text-blue-100 text-lg max-w-xl">{t.home.ctaDesc}</p>
          </Reveal>
          <Reveal delay={200} className="flex gap-4">
            <Link to="/membership" className="flex items-center justify-center h-14 px-8 bg-white text-primary rounded-xl font-bold hover:bg-blue-50 hover:-translate-y-1 transition-all shadow-xl">
              {t.nav.membership}
            </Link>
            <button className="flex items-center justify-center h-14 px-8 bg-blue-600/50 border border-blue-400 text-white rounded-xl font-bold hover:bg-blue-600 hover:border-transparent transition-all">
              {t.home.donate}
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Home;