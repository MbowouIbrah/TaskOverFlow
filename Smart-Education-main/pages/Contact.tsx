import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from '../components/Reveal';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const handleSocialClick = (platform: string) => {
    if (platform === 'linkedin') {
      window.open('https://www.linkedin.com/login', '_blank');
    } else if (platform === 'whatsapp') {
      window.open('https://wa.me/237697244492', '_blank');
    } else {
      alert('Nous ne sommes pas encore présents sur cette plateforme. Restez connectés !');
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10 py-10 sm:py-16">
      {/* Page Heading */}
      <Reveal className="flex flex-col gap-4 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111418] dark:text-white">
          {t.contact.title}
        </h1>
        <p className="text-lg text-[#637388] dark:text-gray-400 max-w-3xl leading-relaxed">
          {t.contact.subtitle}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 w-full">
          <Reveal delay={200}>
            <div className="bg-white dark:bg-[#1e2732] rounded-xl shadow-lg border border-[#dce0e5] dark:border-[#2a3441] p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert(t.contact.sent); }}>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111418] dark:text-gray-200">{t.contact.nameLabel}</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#637388] text-[20px] transition-colors group-focus-within:text-primary">person</span>
                    <input required className="w-full h-12 pl-12 pr-4 rounded-lg bg-[#f6f7f8] dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-[#637388]/70 transition-all" placeholder={t.contact.namePlaceholder} type="text" />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#111418] dark:text-gray-200">{t.contact.emailLabel}</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#637388] text-[20px] transition-colors group-focus-within:text-primary">mail</span>
                      <input required className="w-full h-12 pl-12 pr-4 rounded-lg bg-[#f6f7f8] dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-[#637388]/70 transition-all" placeholder={t.contact.emailPlaceholder} type="email" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#111418] dark:text-gray-200">{t.contact.phoneLabel}</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#637388] text-[20px] transition-colors group-focus-within:text-primary">call</span>
                      <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-[#f6f7f8] dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-[#637388]/70 transition-all" placeholder={t.contact.phonePlaceholder} type="tel" />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111418] dark:text-gray-200">{t.contact.subjectLabel}</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#637388] text-[20px] pointer-events-none transition-colors group-focus-within:text-primary">topic</span>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#637388] text-[20px] pointer-events-none">expand_more</span>
                    <select className="w-full h-12 pl-12 pr-10 rounded-lg bg-[#f6f7f8] dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer transition-all">
                      <option>{t.contact.subjectPlaceholder}</option>
                      <option>Adhésion membre</option>
                      <option>Partenariats</option>
                      <option>Support technique</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111418] dark:text-gray-200">{t.contact.messageLabel}</label>
                  <textarea required className="w-full min-h-[160px] p-4 rounded-lg bg-[#f6f7f8] dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-[#637388]/70 resize-y transition-all" placeholder={t.contact.messagePlaceholder}></textarea>
                </div>

                {/* Captcha Mockup */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111821] border border-[#dce0e5] dark:border-[#2a3441] rounded-md max-w-[300px]">
                  <div className="flex items-center gap-3">
                    <div className="size-6 border-2 border-[#c1c1c1] rounded bg-white dark:bg-gray-700 cursor-pointer hover:border-gray-400"></div>
                    <span className="text-sm text-[#111418] dark:text-gray-200 font-medium">Je ne suis pas un robot</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-2xl text-blue-600 mb-[-4px]">shield</span>
                    <span className="text-[10px] text-gray-500">reCAPTCHA</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="h-12 w-full md:w-auto md:min-w-[200px] mt-2 rounded-lg bg-primary text-white font-bold text-base hover:bg-blue-600 active:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  <span>{t.contact.submit}</span>
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Info & Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Contact Info Card */}
          <Reveal delay={300}>
            <div className="bg-white dark:bg-[#1e2732] rounded-xl shadow-sm border border-[#dce0e5] dark:border-[#2a3441] overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-[#dce0e5] dark:border-[#2a3441] bg-gray-50/50 dark:bg-white/5">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white">{t.contact.infoTitle}</h3>
              </div>
              <div className="p-6 flex flex-col gap-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111418] dark:text-white mb-1 uppercase tracking-wide">{t.contact.addressLabel}</h4>
                    <p className="text-base text-[#637388] dark:text-gray-300 leading-relaxed">
                      Simbock<br/>
                      Yaoundé, Cameroun
                    </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111418] dark:text-white mb-1 uppercase tracking-wide">{t.contact.infoEmailLabel}</h4>
                    <a href="mailto:contact@smarteducation.cm" className="text-base text-[#637388] dark:text-gray-300 hover:text-primary transition-colors">
                      contact@smarteducation.cm
                    </a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111418] dark:text-white mb-1 uppercase tracking-wide">{t.contact.phoneInfoLabel}</h4>
                    <a href="tel:+237691344563" className="text-base text-[#637388] dark:text-gray-300 hover:text-primary transition-colors block mb-1">
                      +237 691 34 45 63
                    </a>
                    <p className="text-sm text-gray-500">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Map Widget (Google Maps Embed) */}
          <Reveal delay={400}>
             <div className="bg-white dark:bg-[#1e2732] rounded-xl shadow-sm border border-[#dce0e5] dark:border-[#2a3441] overflow-hidden">
                <div className="p-4 border-b border-[#dce0e5] dark:border-[#2a3441] flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">map</span>
                    <h3 className="text-base font-bold text-[#111418] dark:text-white">{t.contact.mapTitle}</h3>
                </div>
                <div className="h-64 relative group">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight={0} 
                      marginWidth={0} 
                      loading="lazy"
                      src="https://maps.google.com/maps?q=Entr%C3%A9e+Simbock,Yaounde,Cameroun&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      title="Carte Entrée Simbock Yaoundé"
                    ></iframe>
                    
                    {/* Visual Marker Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] z-10 pointer-events-none drop-shadow-xl">
                      <span className="material-symbols-outlined text-red-600 text-5xl">location_on</span>
                    </div>

                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Entr%C3%A9e+Simbock+Yaounde+Cameroun" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-[#111418] px-4 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-transform z-20"
                    >
                      <span className="material-symbols-outlined text-red-500 text-sm">location_on</span>
                      <span className="text-sm">{t.contact.mapButton}</span>
                    </a>
                </div>
            </div>
          </Reveal>

          {/* Social Links */}
          <Reveal delay={500} className="flex gap-3 justify-center md:justify-start">
            <button onClick={() => handleSocialClick('linkedin')} className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e2732] border border-[#dce0e5] dark:border-[#2a3441] text-[#637388] hover:text-[#0077b5] hover:border-[#0077b5] transition-all hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </button>
            <button onClick={() => handleSocialClick('whatsapp')} className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e2732] border border-[#dce0e5] dark:border-[#2a3441] text-[#637388] hover:text-[#25d366] hover:border-[#25d366] transition-all hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.867 9.867 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
            </button>
            <button onClick={() => handleSocialClick('facebook')} className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e2732] border border-[#dce0e5] dark:border-[#2a3441] text-[#637388] hover:text-[#1877f2] hover:border-[#1877f2] transition-all hover:-translate-y-1">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button onClick={() => handleSocialClick('twitter')} className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e2732] border border-[#dce0e5] dark:border-[#2a3441] text-[#637388] hover:text-[#1da1f2] hover:border-[#1da1f2] transition-all hover:-translate-y-1">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </button>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;