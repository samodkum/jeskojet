import { useState, useEffect } from 'react';

export function useImagePreloader(
    frameCount: number,
    fileNameBuilder: (index: number) => string
) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null);
            let loadedCount = 0;

            const promises = Array.from({ length: frameCount }, (_, i) => {
                const index = i + 1;
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const filename = fileNameBuilder(index);
                    img.src = filename;

                    img.onload = () => {
                        if (isMounted) {
                            loadedCount++;
                            setProgress(Math.round((loadedCount / frameCount) * 100));
                            loadedImages[i] = img;
                        }
                        resolve();
                    };

                    img.onerror = () => {
                        console.warn(`Failed to load image: ${filename}`);
                        resolve();
                    };
                });
            });

            await Promise.all(promises);

            if (isMounted) {
                setImages(loadedImages);
                setIsLoaded(true);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount, fileNameBuilder]);

    return { images, progress, isLoaded };
}
