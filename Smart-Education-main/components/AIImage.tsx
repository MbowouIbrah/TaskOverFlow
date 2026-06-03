import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import OptimizedImage from './OptimizedImage';

interface AIImageProps {
  prompt: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const AIImage: React.FC<AIImageProps> = ({ 
  prompt, 
  fallbackSrc, 
  alt, 
  className = "", 
  containerClassName = "" 
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const generateImage = async () => {
      // 1. Check Local Storage cache
      // Use a versioned key to manage cache invalidation
      const cacheKey = `smed_img_v5_${prompt.substring(0, 30)}_${prompt.length}`;
      
      try {
        const cachedImage = localStorage.getItem(cacheKey);
        if (cachedImage) {
          if (isMounted) {
            setImageSrc(cachedImage);
            setLoading(false);
          }
          return;
        }
      } catch (e) {
        // Local storage might be full or restricted, ignore
      }

      try {
        if (!process.env.API_KEY) {
          // Graceful fallback if no key is provided
          console.debug("AIImage: No API_KEY provided, skipping generation.");
          throw new Error("API_KEY_MISSING");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let generatedBase64 = null;

        // Attempt 1: Gemini 2.5 Flash Image (Standard)
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
          });

          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                generatedBase64 = part.inlineData.data;
                break;
              }
            }
          }
        } catch (e) {
          console.warn("Gemini 2.5 Flash Image generation failed:", e);
        }

        // Attempt 2: Gemini 3 Pro Image Preview (Fallback / High Quality)
        if (!generatedBase64) {
             try {
              const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: { parts: [{ text: prompt }] },
              });
    
              if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                  if (part.inlineData && part.inlineData.data) {
                    generatedBase64 = part.inlineData.data;
                    break;
                  }
                }
              }
            } catch (e) {
              console.warn("Gemini 3 Pro Image generation failed:", e);
            }
        }

        if (generatedBase64) {
          const fullSrc = `data:image/jpeg;base64,${generatedBase64}`;
          if (isMounted) {
            setImageSrc(fullSrc);
            try {
              localStorage.setItem(cacheKey, fullSrc);
            } catch (e) {
              console.warn("Storage quota exceeded, cannot cache image");
            }
          }
        } else {
          throw new Error("No image data returned from any model");
        }
      } catch (err: any) {
        // Only log actual errors, not missing key info which is expected in dev
        if (err.message !== "API_KEY_MISSING") {
             console.warn("Failed to generate image:", err.message);
        }
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generateImage();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${containerClassName}`}>
        <div className="flex flex-col items-center gap-2 text-gray-400">
           <span className="material-symbols-outlined animate-spin text-3xl">autorenew</span>
           <span className="text-xs uppercase tracking-widest font-bold">Génération IA...</span>
        </div>
        <div className="absolute inset-0 animate-pulse bg-gray-300/20 dark:bg-gray-700/20" />
      </div>
    );
  }

  const finalSrc = imageSrc || fallbackSrc;

  if (!finalSrc || error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${containerClassName}`}>
        {fallbackSrc ? (
            <OptimizedImage src={fallbackSrc} alt={alt} className={className} containerClassName="w-full h-full" />
        ) : (
            <span className="material-symbols-outlined text-gray-400">broken_image</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative group ${containerClassName}`}>
      <OptimizedImage
        src={finalSrc}
        alt={alt}
        className={className}
        containerClassName="w-full h-full"
      />
    </div>
  );
};

export default AIImage;