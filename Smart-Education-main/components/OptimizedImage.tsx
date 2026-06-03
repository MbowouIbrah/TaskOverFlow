import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  loading = "lazy",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setHasError(false);
    
    if (!src) return;

    // Check if image is already cached/loaded
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${containerClassName}`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 z-10" />
      )}

      {/* Actual Image */}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-700 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 z-20">
          <span className="material-symbols-outlined">broken_image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;