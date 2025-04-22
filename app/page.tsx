'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import HubspotFormPopup from "./components/HubspotFormPopup";
import Script from "next/script";
import LiveVisitorCounter from "./components/LiveVisitorCounter";
import ReviewNotifications from "./components/ReviewNotifications";

// Simple error handler for hubspot errors
function useHubspotErrorHandler() {
  useEffect(() => {
    // Global error handler for HubSpot
    const handleError = (event: ErrorEvent) => {
      if (event.message && event.message.includes('hbspt')) {
        console.error('HubSpot error detected:', event);
        // Prevent the error from propagating to avoid crashes
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
}

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Handle HubSpot errors globally
  useHubspotErrorHandler();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-white">
      {/* Social Proof Components */}
      <LiveVisitorCounter />
      <ReviewNotifications />

      {/* HubSpot Popup */}
      <HubspotFormPopup isOpen={isPopupOpen} onClose={closePopup} />
      
      {/* Hero Section */}
      <section className="bg-[#0B2E52] py-8">
        <div className="container mx-auto px-4 relative">
          {/* Logo */}
          <div className="flex justify-end md:justify-end mb-6 md:mb-10">
            <div className="w-full flex justify-center md:justify-end">
        <Image
                src="/images/logo.png" 
                alt="Wall Street English Logo"
          width={180}
                height={54}
                className="object-contain"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Images section - Mobile: Shown second, Desktop: Shown first */}
            <div className="lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
              <div className="relative w-full max-w-[800px] mx-auto">
                {/* Blue border container */}
                <div className="p-2.5">
                  <div className="flex flex-wrap">
                    {/* Left column with 2 images */}
                    <div className="w-1/2 pr-[5px]">
                      <div className="mb-[10px]">
                        <Image
                          src="/images/student2.jpeg"
                          alt="Student"
                          width={400}
                          height={400}
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      </div>
                      <div>
                        <Image
                          src="/images/student3.jpeg"
                          alt="Student"
                          width={400}
                          height={400}
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Right column with one full-height image */}
                    <div className="w-1/2 pl-[5px]">
                      <div className="h-full">
                        <Image
                          src="/images/student1.jpeg"
                          alt="Student"
                          width={700}
                          height={1000}
                          className="rounded-lg h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text content section - Mobile: Shown first, Desktop: Shown second */}
            <div className="lg:w-1/2 text-center lg:text-right order-1 lg:order-2 mb-8 lg:mb-0 lg:mt-0">
              <h1 
                className="mb-2 md:mb-4 text-center lg:text-right"
                style={{ 
                  direction: 'rtl',
                  color: '#FFF',
                  fontFamily: 'var(--font-montserrat-arabic)',
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 7vw, 76px)',
                  lineHeight: '120%',
                  letterSpacing: '0%'
                }}
              >
                نكرّم المتميزين
              </h1>
              <h2 
                className="mb-3 md:mb-6 text-center lg:text-right text-[#ED3043]"
                style={{ 
                  direction: 'rtl',
                  fontFamily: 'var(--font-montserrat-arabic)',
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 7vw, 76px)',
                  lineHeight: '109%',
                  letterSpacing: '0%'
                }}
              >
                بأحلى المكافآت
              </h2>
              <p 
                className="mb-8 md:mb-12 text-center lg:text-right"
                style={{ 
                  direction: 'rtl',
                  color: 'white',
                  fontFamily: 'var(--font-montserrat-arabic)',
                  fontSize: 'clamp(24px, 5vw, 48px)',
                  fontWeight: 400,
                  lineHeight: '150%',
                  letterSpacing: '0%'
                }}
              >
                طوّر لغتك… تغيّر حياتك
              </p>
              <div className="flex justify-start lg:justify-start">
                <button
                  className="text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold transition-colors hover:bg-[#d42838]"
                  style={{ 
                    direction: 'rtl',
                    background: '#ED3043',
                    fontFamily: 'var(--font-montserrat-arabic)'
                  }}
                  onClick={openPopup}
                >
                  سجّل الحين 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">

          {/* Offers container */}
          <div className="max-w-5xl mx-auto">
            {/* Rounded container with light pink background */}
            <div 
              className="bg-[#FFF1F3] rounded-3xl md:rounded-5xl p-4 md:p-6 lg:p-10"
              style={{
                border: '1px solid #F02C3E',
                borderRadius: '25px'
              }}
            >
              {/* Discount ribbon */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-[700px] text-center">
                  <Image
                    src="/images/discount.png"
                    alt="خصم بقيمة 1740 ريال"
                    width={700}
                    height={160}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Prize opportunities and motivational text side by side */}
              <div className="flex flex-col-reverse md:flex-row gap-6 justify-between mb-6" style={{ direction: 'rtl' }}>
                {/* Right side - Text for high achievers */}
                <div className="md:w-1/3 flex items-center">
                  <div className="text-center md:text-right w-full">
                    <h3 
                      className="text-[#ED3043] text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                      style={{ 
                        fontFamily: 'var(--font-montserrat-arabic)',
                      }}
                    >
                      جبت الدرجات العالية؟
                    </h3>
                    <p 
                      className="text-[#003359] text-xl md:text-xl lg:text-2xl font-bold"
                      style={{ 
                        fontFamily: 'var(--font-montserrat-arabic)',
                      }}
                    >
                      ابشر باللي يرضيك وزيادة!
                    </p>
                  </div>
                </div>
                
                {/* Left side - Prize cards */}
                <div className="md:w-2/3 flex flex-col md:flex-row gap-4 md:gap-6">
                  {/* iPhone Prize */}
                  <div className="bg-[#E74A58] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center text-white w-full md:w-1/2">
                    <div className="md:w-1/3 mb-3 md:mb-0">
                      <Image
                        src="/images/iphone.png"
                        alt="iPhone"
                        width={150}
                        height={180}
                        className="object-contain w-48 h-48 md:w-auto md:h-auto"
                      />
                    </div>
                    <div className="md:w-2/3 text-right"
                      style={{ 
                        fontFamily: 'var(--font-montserrat-arabic)',
                      }}
                    >
                      <h3 
                        className="text-lg md:text-xl font-bold mb-1 md:mb-2 px-2 py-1 rounded"
                        style={{ 
                          background: 'linear-gradient(90deg, #FA5C78 0%, #8C81D7 100%)',
                          display: 'inline-block'
                        }}
                      >
                      أيفون جديد
                      </h3>
                    </div>
                  </div>
                  
                  {/* Dubai Trip Prize */}
                  <div className="bg-[#F4616E] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center text-white w-full md:w-1/2">
                    <div className="md:w-2/5 mb-3 md:mb-0">
                      <Image
                        src="/images/dubai.jpeg"
                        alt="Dubai"
                        width={200}
                        height={300}
                        className="object-cover rounded-lg w-36 h-48 md:w-full md:h-48"
                      />
                    </div>
                    <div className="md:w-3/5 text-right"
                      style={{ 
                        fontFamily: 'var(--font-montserrat-arabic)',
                      }}
                    >
                      <p 
                        className="text-lg md:text-xl font-bold mb-1 md:mb-2 px-2 py-1 rounded"
                        style={{ 
                          background: 'linear-gradient(90deg, #FA5C78 0%, #8C81D7 100%)',
                          display: 'inline-block'
                        }}
                      >
                        تذكرتان سفر إلى
                      </p>
                      <p className="text-base md:text-lg font-bold mb-1">دبي</p>
                    </div>
                  </div>
                  
                
                </div>
              </div>

              {/* Register button inside the container */}
              <div className="flex justify-center">
                <button
                  className="bg-[#E74A58] text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-xl md:text-2xl font-bold transition-transform hover:scale-105 hover:bg-[#d42838]"
                  style={{ 
                    direction: 'rtl',
                    fontFamily: 'var(--font-montserrat-arabic)'
                  }}
                  onClick={openPopup}
                >
                المقاعد محدودة سجّل الحين!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-[#0B2E52] text-white">
        <div className="container mx-auto px-4">
          {/* Section headlines */}
          <div className="text-center mb-10 md:mb-16" style={{ direction: 'rtl' }}>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
              style={{ 
                fontFamily: 'var(--font-montserrat-arabic)',
              }}
            >
              تجربة تعلّم استثنائية ومرونة لا حدود لها
            </h2>
            <h3 
              className="text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{ 
                fontFamily: 'var(--font-montserrat-arabic)',
                color: '#ED3043',
              }}
            >
              مصممة خصيصًا لنجاحك!
            </h3>
          </div>
          
          {/* Features cards */}
          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-xl md:rounded-3xl p-4 md:p-8 mb-8 md:mb-12"
              style={{
                backgroundColor: '#0d2844',
                border: '1px solid white'
              }}
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
                {/* Feature 1: Flexible study hours */}
                <div 
                  className="bg-[#F9C1CC] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center text-center md:w-1/3 mb-4 md:mb-0"
                  style={{
                    border: '1px solid white'
                  }}
                >
                  <div className="mb-4 md:mb-6">
                    <Image
                      src="/images/icons/calendar.png"
                      alt="Calendar Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-auto md:h-auto object-contain"
                    />
                  </div>
                  <div
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                    }}
                  >
                    <h3 className="text-[#0B2E52] text-xl md:text-2xl font-bold mb-1 md:mb-2">ساعات دراسة مرنة</h3>
                    <p className="text-[#0B2E52] text-lg md:text-xl font-medium">تناسب جدولك</p>
                  </div>
                </div>

                {/* Feature 2: Get certificates */}
                <div 
                  className="bg-[#E74A58] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center text-center md:w-1/3 mb-4 md:mb-0"
                  style={{
                    border: '1px solid white'
                  }}
                >
                  <div className="mb-4 md:mb-6">
                    <Image
                      src="/images/icons/trophy.png"
                      alt="Trophy Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-auto md:h-auto object-contain"
                    />
                  </div>
                  <div
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                    }}
                  >
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">احصل على شهادات</h3>
                    <p className="text-white text-lg md:text-xl font-medium">وول ستريت! وثّق انجازاتك</p>
                  </div>
                </div>

                {/* Feature 3: Priority in booking */}
                <div 
                  className="bg-[#D93542] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center text-center md:w-1/3"
                  style={{
                    border: '1px solid white'
                  }}
                >
                  <div className="mb-4 md:mb-6">
            <Image
                      src="/images/icons/thumbsup.png"
                      alt="Thumbs Up Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-auto md:h-auto object-contain"
                    />
                  </div>
                  <div
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                    }}
                  >
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">الأولوية في حجز</h3>
                    <p className="text-white text-lg md:text-xl font-medium">الفصول الدراسية</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                className="bg-[#E74A58] text-white px-6 md:px-12 py-3 md:py-5 rounded-full text-xl md:text-2xl font-bold transition-transform hover:scale-105 hover:bg-[#d42838]"
                style={{ 
                  direction: 'rtl',
                  fontFamily: 'var(--font-montserrat-arabic)'
                }}
                onClick={openPopup}
              >
                تواصل معنا وابدأ رحلتك نحو النجاح!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          {/* Section headlines */}
          <div className="text-center mb-10 md:mb-16" style={{ direction: 'rtl' }}>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
              style={{ 
                fontFamily: 'var(--font-montserrat-arabic)',
              }}
            >
              <span className="text-[#0B2E52]">ماذا يقول </span>
              <span className="text-[#E74A58]">طلابنا </span>
              <span className="text-[#0B2E52]">عنا؟</span>
            </h2>
          </div>
          
          {/* Reviews.io Widget */}
          <div className="max-w-6xl mx-auto">
            <Script
              src="https://widget.reviews.io/rich-snippet-reviews-widgets/dist.js"
              strategy="afterInteractive"
              onLoad={() => {
                // @ts-expect-error - Reviews.io widget is loaded at runtime and not typed
                window.richSnippetReviewsWidgets("carousel-widget", {
                  store: "wall-street-english-saudi-arabia",
                  primaryClr: "#fed130",
                  neutralClr: "#cccccc",
                  reviewTextClr: "#333333",
                  widgetName: "carousel",
                  layout: "fullWidth",
                  numReviews: 40,
                  showProductImages: false,
                  contentMode: "company",
                  hideDates: false,
                  numberedDates: true,
                  css: '@import url("https://fonts.googleapis.com/css?family=Open+Sans"); .CarouselWidget, .CarouselWidget .reviewsContainer {font-family: Open Sans!important;} .CarouselWidget .reviewsContainer .reviewWrap .reviewHeader .author, .js-ruk_word { color: #003359!important; } .RatingStatistics .RatingStatistics__Number, .RatingStatistics .RatingStatistics__Text { color: #4f4f4f!important; font-weight: bold; } .fullWidth.CarouselWidget .cw__header > a { max-width: 100%!important; } .CarouselWidget a.header__content .header__stats { width: 100%!important;} .CarouselWidget a.header__content .stats__right { float:none!important; } @media only screen and (max-width: 820px) { .CarouselWidget a.header__content .stats__right { float:left!important; }}'
                });
              }}
            />
            <div id="carousel-widget" className="w-full" />
          </div>
        </div>
      </section>

      {/* Subscriber Benefits Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section headlines */}
          <div className="text-center mb-10 md:mb-16" style={{ direction: 'rtl' }}>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ 
                fontFamily: 'var(--font-montserrat-arabic)',
              }}
            >
              <span className="text-[#0B2E52]">امتيازات </span>
              <span className="text-[#E74A58]">للمشتركين </span>
              <span className="text-[#0B2E52]">فقط</span>
            </h2>
          </div>
          
          {/* Benefits cards container */}
          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-10 mb-8 md:mb-12 bg-[#FFF5F7] border border-[#E74A58]"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Benefit 1: Access to centers */}
                <div 
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="bg-[#0f2f4c] p-4 md:p-6 flex justify-center items-center h-36 md:h-48">
                    <Image
                      src="/images/icons/map.png"
                      alt="Map Location Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div 
                    className="bg-[#003359] p-4 md:p-6 text-center text-white"
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                      minHeight: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-base md:text-lg font-bold leading-tight">استخدام جميع مراكزنا في أنحاء المملكة</p>
                  </div>
                </div>

                {/* Benefit 2: Exclusive access to events */}
                <div 
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="bg-[#0f2f4c] p-4 md:p-6 flex justify-center items-center h-36 md:h-48">
                    <Image
                      src="/images/icons/arrows.png"
                      alt="Arrows Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div 
                    className="bg-[#003359] p-4 md:p-6 text-center text-white"
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                      minHeight: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-base md:text-lg font-bold leading-tight">دخول حصري للفعاليات والدورات التدريبية المميزة</p>
                  </div>
                </div>

                {/* Benefit 3: Special trainer */}
                <div 
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="bg-[#0f2f4c] p-4 md:p-6 flex justify-center items-center h-36 md:h-48">
          <Image
                      src="/images/icons/fingerprint.png"
                      alt="Fingerprint Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div 
                    className="bg-[#003359] p-4 md:p-6 text-center text-white"
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                      minHeight: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-base md:text-lg font-bold leading-tight">مدرب خاص لتحقيق أهدافك المهنية والدراسية</p>
                  </div>
                </div>

                {/* Benefit 4: Family discount */}
                <div 
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="bg-[#0f2f4c] p-4 md:p-6 flex justify-center items-center h-36 md:h-48">
          <Image
                      src="/images/icons/people.png"
                      alt="People Icon"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div 
                    className="bg-[#003359] p-4 md:p-6 text-center text-white"
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                      minHeight: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-base md:text-lg font-bold leading-tight">خصم 30% حصري لاشتراك العائلة</p>
                  </div>
                </div>

                {/* Benefit 5: Speak+ course */}
                <div 
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="bg-[#0f2f4c] p-4 md:p-6 flex justify-center items-center h-36 md:h-48">
          <Image
                      src="/images/icons/speakplus.png"
                      alt="Speak+ Logo"
                      width={120}
                      height={80}
                      className="w-20 h-16 md:w-30 md:h-20 object-contain"
                    />
                  </div>
                  <div 
                    className="bg-[#003359] p-4 md:p-6 text-center text-white"
                    style={{ 
                      direction: 'rtl',
                      fontFamily: 'var(--font-montserrat-arabic)',
                      minHeight: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-base md:text-lg font-bold leading-tight">دورة Speak+ مجانية لمدة 3 أشهر!</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                className="bg-[#E74A58] text-white px-6 md:px-12 py-3 md:py-5 rounded-full text-xl md:text-2xl font-bold transition-transform hover:scale-105 hover:bg-[#d42838]"
                style={{ 
                  direction: 'rtl',
                  fontFamily: 'var(--font-montserrat-arabic)'
                }}
                onClick={openPopup}
              >
                الحق العرض لأول 100 مشترك فقط!
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}