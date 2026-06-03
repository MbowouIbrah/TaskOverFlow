import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from '../components/OptimizedImage';
import Reveal from '../components/Reveal';

const Programs: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); 

  const filters = [
    { key: "all", label: t.programs.filters.all },
    { key: "edu", label: t.programs.filters.edu },
    { key: "training", label: t.programs.filters.training },
    { key: "community", label: t.programs.filters.community },
    { key: "innovation", label: t.programs.filters.innovation },
  ];

  const filteredPrograms = t.programs.items.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || program.category.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-[#111821]">
        <Reveal className="relative flex min-h-[500px] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          {/* Generated Hero Image */}
          <div className="absolute inset-0 z-0 opacity-60">
            {/*
                [IMAGE FLAG]
                Destination: /images/programs_hero.png
                Source ZIP: smed_photorealistic_image_of_black_children_in_a_rural...
            */}
            <OptimizedImage
              src="/images/programs_hero.png"
              alt="Programs Hero"
              className="w-full h-full object-cover"
              containerClassName="absolute inset-0 w-full h-full -z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111821] to-transparent pointer-events-none"></div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 max-w-[800px]">
            <Reveal delay={200}>
               <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl drop-shadow-lg">
                {t.programs.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <h2 className="text-gray-200 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                {t.programs.heroDesc}
              </h2>
            </Reveal>
            <Reveal delay={400}>
              <button className="inline-flex cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary text-white text-base font-bold shadow-lg hover:bg-blue-600 transition-all transform hover:-translate-y-1 hover:shadow-2xl">
                {t.programs.support}
              </button>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* Search & Filter Bar */}
      <section className="w-full max-w-[1200px] px-4 -mt-8 mb-8 z-20 relative">
        <Reveal delay={400}>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-xl p-4 md:p-6 border border-[#f0f2f4] dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Input */}
              <div className="w-full md:w-1/3">
                <label className="flex flex-col w-full">
                  <div className="flex w-full items-stretch rounded-lg h-12 bg-background-light dark:bg-gray-800 border border-transparent focus-within:border-primary/50 transition-colors">
                    <div className="text-[#637388] flex items-center justify-center pl-4 pr-2">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input 
                      className="flex w-full min-w-0 flex-1 resize-none bg-transparent text-[#111418] dark:text-white placeholder:text-[#637388] px-2 text-base font-normal focus:outline-0 border-none h-full" 
                      placeholder={t.programs.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              {/* Category Chips */}
              <div className="w-full md:w-2/3 flex flex-wrap gap-1 sm:gap-2 md:justify-end">
                {filters.map(filter => (
                   <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex h-9 items-center justify-center px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                      activeFilter === filter.key
                      ? 'bg-primary text-white border-transparent shadow-md scale-105'
                      : 'bg-background-light dark:bg-gray-800 text-[#111418] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent hover:border-gray-300'
                    }`}
                   >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Programs Grid */}
      <section className="w-full max-w-[1200px] px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => {
             return (
              <Reveal key={index} delay={index * 100} className="h-full">
                <article className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#f0f2f4] dark:border-gray-800 h-full hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    {/* 
                        [IMAGE FLAG]
                        Destination: /images/programs_item_${index}.jpg
                        Source ZIP: smed_photorealistic_image_of_${program.title.toLowerCase()}...
                    */}
                    <OptimizedImage
                      src={`/images/programs_item_${index}.png`}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      containerClassName="h-full w-full"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-white/95 dark:bg-black/80 backdrop-blur-sm text-primary text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">{program.tag}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-bold text-[#111418] dark:text-white mb-3 group-hover:text-primary transition-colors">{program.title}</h3>
                    <p className="text-[#637388] dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {program.desc}
                    </p>
                    <a href="#" className="inline-flex items-center text-primary font-bold text-sm hover:underline gap-1 group/btn">
                      {t.home.readMore}
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        
        {filteredPrograms.length === 0 && (
          <Reveal>
            <div className="text-center py-20 text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p>{t.programs.noResults}</p>
            </div>
          </Reveal>
        )}

        {/* Pagination / Load More */}
        {filteredPrograms.length > 0 && (
          <Reveal delay={200}>
            <div className="flex justify-center mt-12">
              <button className="flex items-center justify-center h-12 px-8 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#111418] dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md">
                {t.programs.loadMore}
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-white py-20 px-4">
        <Reveal className="max-w-[960px] mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">{t.programs.ctaTitle}</h2>
          <p className="text-blue-100 text-lg max-w-2xl">
            {t.programs.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/membership" className="h-14 flex items-center px-8 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-blue-50 hover:-translate-y-1 transition-all">
              {t.nav.membership}
            </Link>
            <Link to="/contact" className="h-14 flex items-center px-8 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Programs;