'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showPricingForm?: boolean;
}

interface Window {
  hbspt: {
    forms: {
      create: (config: HubspotFormConfig) => void;
    };
  };
}

interface HubspotFormConfig {
  portalId: string;
  formId: string;
  region: string;
  target: string;
}

export default function CareerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHubspotForm, setShowHubspotForm] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize HubSpot form when needed
    if (showHubspotForm && (window as Window).hbspt) {
      (window as Window).hbspt.forms.create({
        portalId: "2550768",
        formId: "8cef6794-2492-48fe-b59d-9912084832da",
        region: "na1",
        target: "#pricing-form-container"
      });
    }
  }, [showHubspotForm]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        showPricingForm: data.showPricingForm 
      }]);
      
      if (data.showPricingForm) {
        setShowHubspotForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load Font Awesome and Tajawal font
    const loadExternalCSS = () => {
      const fontAwesome = document.createElement('link');
      fontAwesome.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css';
      fontAwesome.rel = 'stylesheet';
      document.head.appendChild(fontAwesome);

      const tajawalFont = document.createElement('link');
      tajawalFont.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap';
      tajawalFont.rel = 'stylesheet';
      document.head.appendChild(tajawalFont);
    };

    // Initialize all client-side features
    const initializeClientFeatures = () => {
      // Show/Hide Scroll to Top Button
      const handleScroll = () => {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
          if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('opacity-100');
          } else {
            scrollToTopBtn.classList.remove('opacity-100');
          }
        }
      };

      // Scroll to Top Functionality
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      // Add event listeners
      window.addEventListener('scroll', handleScroll);
      const scrollToTopBtn = document.getElementById('scrollToTop');
      if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
      }

      // FAQ Accordion functionality
      const faqItems = document.querySelectorAll('#faq .cursor-pointer');
      faqItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const content = target.nextElementSibling as HTMLElement;
          const icon = target.querySelector('i');
          
          if (content && icon) {
            if (content.style.display === 'none' || content.style.display === '') {
              content.style.display = 'block';
              icon.classList.remove('fa-chevron-down');
              icon.classList.add('fa-chevron-up');
            } else {
              content.style.display = 'none';
              icon.classList.remove('fa-chevron-up');
              icon.classList.add('fa-chevron-down');
            }
          }
        });
      });

      // Smooth scroll for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId as string);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    };

    // Load external CSS and initialize features
    loadExternalCSS();
    initializeClientFeatures();

    // Load HubSpot Form
    const loadHubSpotForm = () => {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.onload = () => {
        if ((window as Window).hbspt) {
          (window as Window).hbspt.forms.create({
            region: "na1",
            portalId: "2550768",
            formId: "8cef6794-2492-48fe-b59d-9912084832da",
            target: "#hubspot-form-container"
          });
        }
      };
      document.head.appendChild(script);
    };

    loadHubSpotForm();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', () => {});
      const scrollToTopBtn = document.getElementById('scrollToTop');
      if (scrollToTopBtn) {
        scrollToTopBtn.removeEventListener('click', () => {});
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'Tajawal', sans-serif;
        }
        .gradient-bg {
          background: linear-gradient(90deg, #003359 0%, #1e40af 100%);
        }
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .pricing-card {
          transition: all 0.3s ease;
        }
        .pricing-card:hover {
          transform: scale(1.05);
        }
        .custom-shape-divider-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .custom-shape-divider-bottom svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 70px;
        }
        .custom-shape-divider-bottom .shape-fill {
          fill: #FFFFFF;
        }
        .animated-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .animated-button:after {
          content: '';
          position: absolute;
          width: 0%;
          height: 100%;
          top: 0;
          right: 0;
          background: rgba(255,255,255,0.2);
          transition: width 0.3s;
        }
        .animated-button:hover:after {
          width: 120%;
        }
        .btn-primary {
          background-color: #f12c3e;
          color: white;
        }
        .btn-primary:hover {
          background-color: #d81f30;
        }
        .icon-primary {
          color: #f12c3e !important;
        }
        .bg-primary {
          background-color: #003359;
        }
        .bg-secondary {
          background-color: #1e40af;
        }
        .text-primary {
          color: #003359;
        }
        .text-secondary {
          color: #1e40af;
        }
        .border-primary {
          border-color: #003359;
        }
        .hubspot-form-wrapper {
          min-height: 400px;
          width: 100%;
        }
        .hubspot-form-wrapper form {
          margin: 0;
          padding: 0;
        }
        .hubspot-form-wrapper .hs-form-field {
          margin-bottom: 1rem;
        }
        .hubspot-form-wrapper .hs-form-field > label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .hubspot-form-wrapper .hs-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.3s;
        }
        .hubspot-form-wrapper .hs-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .hubspot-form-wrapper .hs-button {
          width: 100%;
          background-color: #f12c3e;
          color: white;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .hubspot-form-wrapper .hs-button:hover {
          background-color: #d81f30;
        }
        .chat-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          height: 600px;
          display: flex;
          flex-direction: column;
        }

        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          max-width: 80%;
          padding: 1rem;
          border-radius: 1rem;
          margin: 0.5rem 0;
        }

        .user-message {
          background-color: #f12c3e;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 0.25rem;
        }

        .assistant-message {
          background-color: #f3f4f6;
          color: #1f2937;
          align-self: flex-start;
          border-bottom-left-radius: 0.25rem;
        }

        .chat-input {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          border-radius: 0 0 1rem 1rem;
        }

        .chat-input input {
          flex-grow: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.3s;
        }

        .chat-input input:focus {
          border-color: #f12c3e;
          box-shadow: 0 0 0 3px rgba(241, 44, 62, 0.1);
        }

        .chat-input button {
          padding: 0.75rem 1.5rem;
          background-color: #f12c3e;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .chat-input button:hover {
          background-color: #d81f30;
        }

        .chat-input button:disabled {
          background-color: #e5e7eb;
          cursor: not-allowed;
        }

        .pricing-form-container {
          margin-top: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div dir="rtl" lang="ar" className="bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image src="/career/wall-street-english-logo.png" alt="وول ستريت إنجليش" width={48} height={48} className="h-12 w-auto" />
              </div>
              <div className="hidden md:flex space-x-8 space-x-reverse">
                <a href="#benefits" className="text-gray-700 hover:text-[#003359] font-medium">المميزات</a>
                <a href="#courses" className="text-gray-700 hover:text-[#003359] font-medium">الدورات</a>
                <a href="#testimonials" className="text-gray-700 hover:text-[#003359] font-medium">آراء الطلاب</a>
                <a href="#faq" className="text-gray-700 hover:text-[#003359] font-medium">الأسئلة الشائعة</a>
              </div>
              <div>
                <a href="#contact" className="btn-primary px-6 py-2 rounded-lg transition duration-300 shadow-md">تواصل معنا</a>
                <button className="md:hidden text-gray-700 focus:outline-none">
                  <i className="fas fa-bars text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative gradient-bg text-white py-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">اتقن الإنجليزية وعزز فرص توظيفــك</h1>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-briefcase text-blue-600"></i>
                  </div>
                  <p className="text-xl md:text-2xl">دورات مخصصة لسوق العمل</p>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-chart-line text-blue-600"></i>
                  </div>
                  <p className="text-xl md:text-2xl">مهارات عملية تطلبها الشركات</p>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-user-graduate text-blue-600"></i>
                  </div>
                  <p className="text-xl md:text-2xl">تعلم مع خبراء اللغة</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                <a href="#courses" className="btn-primary text-center px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition duration-300">استكشف الدورات</a>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image src="/career/hero.png" alt="تعلم الإنجليزية للعمل" width={600} height={400} className="rounded-lg shadow-2xl" />
            </div>
          </div>
          <div className="custom-shape-divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-blue-800 text-4xl font-bold mb-4">+20</div>
                <p className="text-gray-700 text-xl">مستوى تعليمي من المبتدئ للاحتراف</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-blue-800 text-4xl font-bold mb-4">+15</div>
                <p className="text-gray-700 text-xl">عام من الخبرة في تعليم اللغة الإنجليزية</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-blue-800 text-4xl font-bold mb-4">+10,000</div>
                <p className="text-gray-700 text-xl">خريج حققوا أهدافهم </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">لماذا تعلم الإنجليزية ضروري لحياتك المهنية</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">تعلم اللغة الإنجليزية يفتح لك آفاقاً واسعة في سوق العمل، ويعزز من فرصك في الترقية والتقدم الوظيفي</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-chart-line icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">تحسين فرص التوظيف</h3>
                <p className="text-gray-600">زد من فرصك في الحصول على وظائف مرموقة في الشركات المحلية والعالمية بإتقان اللغة الإنجليزية الوظيفية.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-money-bill-wave icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">زيادة الدخل</h3>
                <p className="text-gray-600">الموظفون الذين يتقنون اللغة الإنجليزية يحصلون على رواتب أعلى بنسبة 15-30% من نظرائهم.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-users icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">شبكة علاقات مهنية أوسع</h3>
                <p className="text-gray-600">توسيع شبكة علاقاتك المهنية والتواصل مع خبراء وزملاء من مختلف أنحاء العالم.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-building icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">فرص للعمل في شركات عالمية</h3>
                <p className="text-gray-600">افتح أبواب العمل في الشركات والمؤسسات الدولية بإتقان اللغة الإنجليزية.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-rocket icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">ترقية وظيفية أسرع</h3>
                <p className="text-gray-600">المهنيون الذين يتقنون اللغة الإنجليزية يحصلون على فرص ترقية أسرع بنسبة 25% من زملائهم.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="text-[#F12C3E] text-4xl mb-6"><i className="fas fa-handshake icon-primary"></i></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">مهارات التفاوض والعرض</h3>
                <p className="text-gray-600">تعلم كيفية تقديم العروض والتفاوض باللغة الإنجليزية مما يعزز مكانتك في بيئة العمل الدولية.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">دوراتنا المتخصصة للتوظيف والعمل</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">دورات مصممة خصيصاً لتناسب احتياجات سوق العمل ومتطلبات الشركات المحلية والعالمية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')"}}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">الإنجليزية للتقدم الوظيفي</h3>
                  <p className="text-gray-600 mb-6">دورة شاملة لتعزيز المهارات اللغوية المطلوبة للترقية والتقدم في المسار المهني.</p>
                  <div className="flex flex-wrap mb-6">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">القيادة</span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">إدارة المشاريع</span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">مهارات العرض</span>
                  </div>
                  <a href="#contact" className="btn-primary block text-center py-3 rounded-lg transition duration-300">احجز مقعدك الآن</a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/1181711/pexels-photo-1181711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')"}}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">دورات للشركات والمؤسسات</h3>
                  <p className="text-gray-600 mb-6">برامج مخصصة للشركات لتطوير مهارات موظفيها في اللغة الإنجليزية.</p>
                  <div className="flex flex-wrap mb-6">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">برامج جماعية</span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">تدريب مخصص</span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 mb-2 px-3 py-1 rounded">تقييم مستوى الموظفين</span>
                  </div>
                  <a href="#contact" className="btn-primary block text-center py-3 rounded-lg transition duration-300">تواصل معنا للمزيد</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900 text-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار وول ستريت إنجليش؟</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">تمتع بتجربة تعليمية فريدة مع مميزات حصرية تجعل رحلة تعلمك للغة الإنجليزية فعالة وممتعة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-user-tie"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">معلمين من أهل اللغة</h3>
                  <p className="text-gray-300">تعلم اللغة الإنجليزية على يد مدربين ناطقين باللغة الإنجليزية بلهجة أمريكية وبريطانية أصلية.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-graduation-cap"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">20 مستوى تعليمي</h3>
                  <p className="text-gray-300">من المبتدئ للاحترافية، مستويات متعددة تناسب كل الفئات وتضمن تطور مهاراتك بشكل تدريجي.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-certificate"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">شهادات معتمدة</h3>
                  <p className="text-gray-300">شهادات معتمدة من المؤسسة العامة للتدريب المهني والتقني تعزز سيرتك الذاتية وفرصك الوظيفية.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-laptop"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">مرونة في طريقة الدراسة</h3>
                  <p className="text-gray-300">خيارات متعددة للدراسة حضورياً أو أونلاين حسب احتياجك وجدولك الزمني.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-user-friends"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">مستشار شخصي</h3>
                  <p className="text-gray-300">مستشارك الشخصي يدعمك طوال الرحلة ويساعدك في تخطي التحديات وتحقيق أهدافك.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-400 text-3xl mt-1 ml-4"><i className="fas fa-credit-card"></i></div>
                <div>
                  <h3 className="text-xl font-bold mb-3">خيارات دفع متنوعة</h3>
                  <p className="text-gray-300">دفع بالتقسيط عبر تابي وتمارا، كما يمكنكم التسجيل حالاً والدفع لاحقاً عبر بنك الراجحي.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">آراء طلابنا الناجحين</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">تعرف على تجارب المتعلمين معنا وكيف ساهمت دوراتنا في تطوير مساراتهم الوظيفية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="testimonial-card bg-white rounded-xl shadow-lg p-8 relative">
                <div className="text-blue-800 text-5xl absolute -top-5 right-6 opacity-20"><i className="fas fa-quote-right"></i></div>
                <p className="text-gray-600 mb-6 relative z-10">بعد إكمالي لدورة إنجليزي الأعمال في وول ستريت، حصلت على ترقية في شركتي وزيادة في الراتب. المهارات التي اكتسبتها ساعدتني كثيراً في التواصل مع العملاء الدوليين.</p>
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="عبدالله الأحمد" className="w-12 h-12 rounded-full ml-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">عبدالله الأحمد</h4>
                    <p className="text-gray-500 text-sm">مدير مبيعات - شركة الاتصالات السعودية</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card bg-white rounded-xl shadow-lg p-8 relative">
                <div className="text-blue-800 text-5xl absolute -top-5 right-6 opacity-20"><i className="fas fa-quote-right"></i></div>
                <p className="text-gray-600 mb-6 relative z-10">كنت أبحث عن وظيفة في شركة دولية، وبعد الانتهاء من دورة المقابلات الوظيفية تمكنت من اجتياز المقابلة بنجاح والحصول على الوظيفة. أشكر فريق وول ستريت على الدعم الرائع.</p>
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="سارة العتيبي" className="w-12 h-12 rounded-full ml-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">سارة العتيبي</h4>
                    <p className="text-gray-500 text-sm">محللة موارد بشرية - أرامكو</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card bg-white rounded-xl shadow-lg p-8 relative">
                <div className="text-blue-800 text-5xl absolute -top-5 right-6 opacity-20"><i className="fas fa-quote-right"></i></div>
                <p className="text-gray-600 mb-6 relative z-10">بدأت من الصفر مع وول ستريت، وخلال عام واحد أصبحت قادراً على التواصل بثقة مع زملائي الأجانب. المدربون محترفون جداً والمنهج ممتاز، أنصح به بشدة لكل من يريد تطوير حياته المهنية.</p>
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="فهد المالكي" className="w-12 h-12 rounded-full ml-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">فهد المالكي</h4>
                    <p className="text-gray-500 text-sm">مهندس برمجيات - شركة مايكروسوفت</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chat Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">تحدث مع مستشارنا الذكي</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">اسأل أي سؤال عن برامجنا وخدماتنا، وسيقوم مستشارنا الذكي بمساعدتك والإجابة على استفساراتك</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="chat-container">
                <div className="chat-messages" ref={chatContainerRef}>
                  {messages.map((message, index) => (
                    <div key={index}>
                      <div className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                        {message.content}
                      </div>
                      {message.showPricingForm && (
                        <div className="pricing-form-container" id="pricing-form-container">
                          {/* HubSpot form will be loaded here */}
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="message assistant-message">
                      جاري الكتابة...
                    </div>
                  )}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب سؤالك هنا..."
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">إجابات على الأسئلة الأكثر شيوعاً حول دوراتنا المتخصصة للتوظيف والعمل</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 cursor-pointer flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">هل الدورات مناسبة للمبتدئين في اللغة الإنجليزية؟</h3>
                  <i className="fas fa-chevron-down text-blue-800"></i>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">نعم، لدينا دورات مخصصة لجميع المستويات، بما في ذلك المبتدئين. نبدأ بتقييم مستواك الحالي ووضعك في المستوى المناسب مع خطة تعليمية تتناسب مع احتياجاتك.</p>
                </div>
              </div>

              <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 cursor-pointer flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">هل يوجد دورات حضوري وأونلاين؟</h3>
                  <i className="fas fa-chevron-down text-blue-800"></i>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">نعم، وتحظى بنفس التجربة الممتعة التفاعلية والنتائج المضمونة في الخيارين. يمكنك اختيار الطريقة التي تناسب جدولك الزمني وظروفك.</p>
                </div>
              </div>

              <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 cursor-pointer flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">هل ممكن الدفع عبر أقساط؟</h3>
                  <i className="fas fa-chevron-down text-blue-800"></i>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">نعم، نقدم خيارات دفع مرنة عبر تابي وتمارا. كما يمكنكم التسجيل حالاً والدفع لاحقاً عبر بنك الراجحي. نحرص على توفير حلول مالية تناسب الجميع.</p>
                </div>
              </div>

              <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 cursor-pointer flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">هل الشهادة معتمدة؟</h3>
                  <i className="fas fa-chevron-down text-blue-800"></i>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">نعم، الشهادة معتمدة من المؤسسة العامة للتدريب المهني والتقني، مما يجعلها وثيقة رسمية معترف بها لدى جهات التوظيف المحلية والدولية.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg text-white relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلتك نحو النجاح المهني اليوم</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">سجل الآن واحصل على جلسة تقييم مجانية مع مستشارينا</p>
            <a href="#contact" className="animated-button bg-white text-blue-900 px-10 py-4 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition duration-300 inline-block">احجز مقعدك الآن</a>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 gradient-bg p-10 text-white">
                  <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
                  <p className="mb-8">املأ النموذج وسيتواصل معك أحد مستشارينا في أقرب وقت ممكن</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
                    <div className="flex items-start mb-4">
                      <i className="fas fa-map-marker-alt text-[#f12c3e] mt-1 ml-4"></i>
                      <div>
                        <p>الرياض - طريق الملك فهد - برج المملكة</p>
                        <p>جدة - شارع التحلية - برج الأندلس</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <i className="fas fa-phone-alt text-[#f12c3e] mt-1 ml-4"></i>
                      <div>
                        <p>920000123</p>
                        <p>+966 55 123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-envelope text-[#f12c3e] mt-1 ml-4"></i>
                      <div>
                        <p>info@wallstreetenglish.edu.sa</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">تابعنا على</h3>
                    <div className="flex space-x-4 space-x-reverse">
                      <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                        <i className="fab fa-twitter text-2xl"></i>
                      </a>
                      <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                        <i className="fab fa-facebook text-2xl"></i>
                      </a>
                      <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                        <i className="fab fa-instagram text-2xl"></i>
                      </a>
                      <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                        <i className="fab fa-linkedin text-2xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-10">
                  <div id="hubspot-form-container" className="hubspot-form-wrapper">
                    {/* HubSpot form will be loaded here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div>
                <Image src="/career/wall-street-english-logo.png" alt="وول ستريت إنجليش" width={48} height={48} className="h-12 w-auto mb-6" />
                <p className="text-gray-400 mb-6">المعهد الرائد في تعليم اللغة الإنجليزية للأغراض المهنية والوظيفية في المملكة العربية السعودية.</p>
                <div className="flex space-x-4 space-x-reverse">
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
             
              <div>
                <h3 className="text-lg font-bold mb-6">الدورات</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">الإنجليزية للتقدم الوظيفي</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">دورات للشركات والمؤسسات</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-6">تواصل معنا</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-envelope text-blue-500 mt-1 ml-3"></i>
                    <span className="text-gray-400">info@wallstreetenglish.edu.sa</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock text-blue-500 mt-1 ml-3"></i>
                    <span className="text-gray-400">السبت - الخميس: 9 صباحاً - 9 مساءً</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-500">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} وول ستريت إنجليش السعودية</p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button id="scrollToTop" className="fixed bottom-8 left-8 bg-[#003359] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 transition-opacity duration-300 hover:bg-[#1e40af]">
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>
    </>
  );
}