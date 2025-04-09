import { useState, useEffect } from 'react';

export default function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(307);

  useEffect(() => {
    // Simulate random fluctuations in visitor count
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 5) - 2; // Random number between -2 and 2
      setVisitorCount(prev => Math.max(280, Math.min(320, prev + fluctuation)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3 z-50 flex items-center scale-90 sm:scale-100"
      style={{
        border: '1px solid #E74A58',
        direction: 'rtl',
        fontFamily: 'var(--font-montserrat-arabic)',
      }}
    >
      <div className="relative w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full">
            <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-green-500 rounded-full"></div>
      </div>
      <div className="text-gray-800">
        <span className="font-bold text-base sm:text-lg">{visitorCount}</span>
        <span className="mr-1 text-xs sm:text-sm">شخص يتصفح الآن</span>
      </div>
    </div>
  );
} 