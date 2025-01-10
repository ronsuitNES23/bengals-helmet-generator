import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Share2, Sliders } from 'lucide-react';

const BengalsHelmetGenerator = () => {
  const [stripeImages, setStripeImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load stripe images from the provided Google Drive folder
    const stripeFiles = [
      'stripe1.svg',
      'stripe2.svg',
      'stripe3.svg',
      'stripe4.svg',
      'stripe5.svg',
      'stripe6.svg'
    ];

    const loadStripeImages = async () => {
      try {
        const imagePromises = stripeFiles.map(async (file) => {
          const response = await fetch(`https://drive.google.com/uc?export=download&id=1_T1SNZ2vt98TvEO_SZO4gjb4Z3H0OC5K&filename=${file}`);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const imageUrls = await Promise.all(imagePromises);
        setStripeImages(imageUrls);
      } catch (error) {
        console.error('Failed to load stripe images:', error);
      }
    };

    loadStripeImages();
  }, []);

  const randomizeStripeStyle = () => {
    return {
      rotate: `${Math.random() * 20 - 10}deg`,
      scale: `${Math.random() * 0.5 + 0.8}`
    };
  };

  const handleGenerateNew = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
    }, 300);
  };

  const downloadSVG = () => {
    const svgData = document.querySelector('#bengals-helmet').outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bengals-helmet.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/api/placeholder/32/32"
              alt="Bengals Logo"
              className="w-8 h-8 rounded"
            />
            <span className="text-2xl font-bold text-orange-600">
              Bengals Helmet Generator
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleGenerateNew}
              className={`flex items-center gap-2 bg-orange-600 hover:bg-orange-700 transition-all duration-300 ${
                isGenerating ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw size={16} />
              Generate
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadSVG}
              className="flex items-center gap-2 border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <Download size={16} />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-gray-50 to-white rounded-lg overflow-hidden shadow-lg">
          <svg id="bengals-helmet" viewBox="0 0 100 75" className="w-full h-full">
            {/* Enhanced gradients */}
            <defs>
              <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FB4F14', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#EA4512', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D84315', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="helmetShadow">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Helmet base */}
            <path
              d="M10,20 
                 Q20,10 50,10 
                 Q80,10 90,20 
                 Q100,35 90,50 
                 Q80,65 50,65 
                 Q20,65 10,50 
                 Q0,35 10,20"
              fill="url(#helmetGradient)"
              filter="url(#helmetShadow)"
              className="transition-all duration-300"
            />

            {/* Custom stripe images */}
            <g className={`transition-all duration-500 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
              {stripeImages.map((imageUrl, index) => {
                const { rotate, scale } = randomizeStripeStyle();
                return (
                  <image
                    key={index}
                    x="20"
                    y="15"
                    width="60"
                    height="45"
                    preserveAspectRatio="xMidYMid slice"
                    href={imageUrl}
                    style={{
                      transform: `rotate(${rotate}) scale(${scale})`
                    }}
                  />
                );
              })}
            </g>

            {/* Facemask */}
            <g>
              <path
                d="M35,45 Q50,55 65,45"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                fill="none"
                filter="url(#helmetShadow)"
              />
              <path
                d="M35,45 L35,48 M65,45 L65,48"
                stroke="#1A1A1A"
                strokeWidth="2"
                fill="none"
              />
            </g>
            
            {/* Hardware details */}
            <circle cx="15" cy="40" r="1.5" fill="#1A1A1A" />
            <circle cx="35" cy="45" r="1.2" fill="#1A1A1A" />
            <circle cx="65" cy="45" r="1.2" fill="#1A1A1A" />
          </svg>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
            <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <Sliders size={16} />
              Pattern Details
            </h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Randomized stripe images for unique patterns</li>
              <li>• Smooth animation when generating new patterns</li>
              <li>• Download functionality to export the helmet as an SVG</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BengalsHelmetGenerator;
