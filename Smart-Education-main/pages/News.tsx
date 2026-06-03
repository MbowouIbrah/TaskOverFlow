import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from '../components/OptimizedImage';
import Reveal from '../components/Reveal';

const News: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("Tous");
  
  const filteredArticles = t.news.items.filter(article => {
    if (activeFilter === "Tous" || activeFilter === "All") return true;
    return article.category === activeFilter;
  });

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-10 lg:px-10 lg:py-16">
      {/* Page Heading */}
      <Reveal className="flex flex-col gap-6 pb-10 text-center md:text-left">
        <h1 className="text-[#111418] dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">
          {t.news.title}
        </h1>
        <p className="text-[#637388] dark:text-gray-400 text-lg font-normal leading-relaxed max-w-3xl">
          {t.news.subtitle}
        </p>
      </Reveal>

      {/* Filter Chips */}
      <Reveal delay={100} className="mb-12">
        <div className="flex flex-wrap gap-1 sm:gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          {t.news.filters.map((category, idx) => (
             <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-2 sm:px-3 md:px-6 text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-white border border-gray-200 text-[#637388] hover:bg-gray-50 hover:text-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
             >
              {category}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {filteredArticles.map((article, index) => {
          return (
            <Reveal key={index} delay={index * 100}>
              <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 h-full">
                <div className="relative h-64 w-full overflow-hidden">
                   {/* 
                      [IMAGE FLAG]
                      Destination: /images/news_item_${index}.jpg
                      Source ZIP: smed_photorealistic_documentary_style_shot_illustrating_${article.title}...
                   */}
                   <OptimizedImage
                      src={`/images/news_item_${index}.png`}
                      fallbackSrc={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      containerClassName="h-full w-full"
                    />
                   {/* Tag Overlay */}
                   <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/95 dark:bg-black/80 backdrop-blur-sm text-primary text-xs font-bold rounded-full uppercase tracking-wider shadow-sm border border-gray-100 dark:border-gray-700">
                        {article.category}
                      </span>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold leading-tight text-[#111418] group-hover:text-primary dark:text-white transition-colors">
                    {article.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-[#637388] dark:text-gray-300 line-clamp-3">
                    {article.desc}
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline bg-transparent border-none cursor-pointer p-0 group/btn self-start">
                    {t.news.readArticle}
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Pagination */}
      <Reveal delay={200} className="flex items-center justify-center pt-8">
        <nav aria-label="Pagination" className="flex items-center gap-3">
          <button className="flex size-10 items-center justify-center rounded-lg text-[#111418] hover:bg-gray-100 disabled:opacity-50 dark:text-white dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
          </button>
          
          <button aria-current="page" className="flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-600 transform hover:-translate-y-0.5">1</button>
          <button className="flex size-10 items-center justify-center rounded-lg text-sm font-bold text-[#637388] hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">2</button>
          <button className="flex size-10 items-center justify-center rounded-lg text-sm font-bold text-[#637388] hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">3</button>
          <span className="flex size-10 items-center justify-center text-[#637388] dark:text-gray-500 font-medium">...</span>
          <button className="flex size-10 items-center justify-center rounded-lg text-sm font-bold text-[#637388] hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">12</button>

          <button className="flex size-10 items-center justify-center rounded-lg text-[#111418] hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
          </button>
        </nav>
      </Reveal>
    </div>
  );
};

export default News;