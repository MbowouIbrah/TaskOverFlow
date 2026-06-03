import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from '../components/Reveal';

const Membership: React.FC = () => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.membership.success);
  };

  return (
    <div className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 lg:px-0 lg:py-12">
      {/* Page Heading */}
      <Reveal className="mb-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-[#111418] dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
            {t.membership.title}
          </h1>
          <p className="text-[#637388] dark:text-gray-400 text-lg font-normal leading-normal max-w-2xl">
            {t.membership.subtitle}
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-primary font-bold">{t.membership.feesTitle}</h3>
            <p className="text-[#111418] dark:text-white">{t.membership.feesDesc}</p>
          </div>
        </div>
      </Reveal>

      {/* Membership Form */}
      <Reveal delay={200}>
        <div className="bg-white dark:bg-[#1a222d] rounded-xl shadow-lg border border-[#e5e7eb] dark:border-gray-800 p-6 lg:p-10 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Section 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col flex-1">
                <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{t.membership.nameLabel} <span className="text-red-500">*</span></p>
                <input required className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-12 placeholder:text-[#637388] p-[15px] text-base font-normal leading-normal transition-all" placeholder={t.membership.namePlaceholder} type="text" />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{t.membership.emailLabel} <span className="text-red-500">*</span></p>
                <input required className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-12 placeholder:text-[#637388] p-[15px] text-base font-normal leading-normal transition-all" placeholder={t.membership.emailPlaceholder} type="email" />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{t.membership.phoneLabel}</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-12 placeholder:text-[#637388] p-[15px] text-base font-normal leading-normal transition-all" placeholder={t.membership.phonePlaceholder} type="tel" />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{t.membership.professionLabel}</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-12 placeholder:text-[#637388] p-[15px] text-base font-normal leading-normal transition-all" placeholder={t.membership.professionPlaceholder} type="text" />
              </label>
            </div>

            {/* Section 2: Membership Type */}
            <div className="flex flex-col gap-3">
              <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">{t.membership.typeLabel} <span className="text-red-500">*</span></p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: t.membership.typeActive, icon: 'person' },
                  { label: t.membership.typeHonor, icon: 'school' },
                  { label: t.membership.typeBenefactor, icon: 'business' }
                ].map((type, idx) => (
                  <label key={idx} className="group flex-1 min-w-[200px] cursor-pointer">
                    <input type="radio" name="member_type" className="peer sr-only" defaultChecked={idx === 0} />
                    <div className="flex items-center justify-center rounded-lg border border-[#dce0e5] dark:border-gray-700 px-4 h-12 text-[#111418] dark:text-gray-300 peer-checked:border-[2px] peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-primary font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm">
                      <span className="material-symbols-outlined mr-2 text-xl">{type.icon}</span>
                      {type.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 3: Motivation */}
            <label className="flex flex-col flex-1">
              <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{t.membership.motivationLabel} <span className="text-red-500">*</span></p>
              <textarea required rows={4} className="form-textarea flex w-full min-w-0 flex-1 resize-none rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary placeholder:text-[#637388] p-[15px] text-base font-normal leading-normal transition-all" placeholder={t.membership.motivationPlaceholder}></textarea>
            </label>

            {/* Section 4: Security & Submit */}
            <div className="flex flex-col gap-6 pt-2">
              {/* Fake ReCaptcha */}
              <div className="flex items-center p-3 bg-[#f9f9f9] dark:bg-gray-800 border border-[#d3d3d3] dark:border-gray-600 rounded w-fit min-w-[240px]">
                <div className="flex items-center h-5">
                  <input id="captcha" type="checkbox" className="w-6 h-6 text-primary bg-white border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="ms-3 text-sm">
                  <label htmlFor="captcha" className="font-medium text-gray-700 dark:text-gray-300 select-none">I am not a robot</label>
                </div>
                <div className="ml-auto flex flex-col items-center justify-center text-[10px] text-gray-400">
                  <span className="material-symbols-outlined text-2xl mb-[-4px]">recycling</span>
                  <span>reCAPTCHA</span>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg w-full md:w-auto self-start hover:-translate-y-0.5">
                <span className="truncate">{t.membership.submit}</span>
                <span className="material-symbols-outlined ml-2 text-lg">send</span>
              </button>
              <p className="text-xs text-[#637388] dark:text-gray-500">
                En soumettant ce formulaire, vous acceptez notre <a href="#" onClick={(e) => e.preventDefault()} className="underline hover:text-primary">{t.membership.privacy}</a>.
              </p>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
};

export default Membership;