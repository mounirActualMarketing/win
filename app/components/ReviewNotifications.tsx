import { useState, useEffect } from 'react';

const reviews = [
  {
    name: 'سارة',
    rating: 5,
    time: '5 دقائق',
    comment: 'تجربة رائعة! المدرسين محترفين جداً'
  },
  {
    name: 'أحمد',
    rating: 5,
    time: '10 دقائق',
    comment: 'أفضل مكان لتعلم اللغة الإنجليزية'
  },
  {
    name: 'نورة',
    rating: 5,
    time: '15 دقائق',
    comment: 'المنهج منظم وسهل الفهم'
  },
  {
    name: 'محمد',
    rating: 5,
    time: '20 دقائق',
    comment: 'خدمة ممتازة وموظفين متعاونين'
  }
];

export default function ReviewNotifications() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`fixed bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-lg shadow-lg p-2.5 sm:p-4 z-50 max-w-[calc(100%-1rem)] sm:max-w-xs transition-opacity duration-500 scale-90 sm:scale-100 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        border: '1px solid #E74A58',
        direction: 'rtl',
        fontFamily: 'var(--font-montserrat-arabic)',
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <p className="font-bold text-gray-800 text-sm sm:text-base">{reviews[currentReview].name}</p>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">قبل {reviews[currentReview].time}</span>
        </div>
        <div className="flex items-center mb-1.5 sm:mb-2">
          {[...Array(reviews[currentReview].rating)].map((_, i) => (
            <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-600">{reviews[currentReview].comment}</p>
      </div>
    </div>
  );
} 