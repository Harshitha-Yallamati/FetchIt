// ============================================
// Promo Banner Carousel - Auto-sliding offers
// ============================================

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const promoSlides = [
  {
    id: 1,
    title: '40% OFF on First Order',
    subtitle: 'Use code: FETCHIT40',
    gradient: 'from-orange-500 to-red-500',
    emoji: '🍔',
  },
  {
    id: 2,
    title: 'Free Delivery on Groceries',
    subtitle: 'Orders above ₹299',
    gradient: 'from-green-500 to-emerald-600',
    emoji: '🥦',
  },
  {
    id: 3,
    title: 'Flat ₹50 OFF on Medicines',
    subtitle: 'Health essentials delivered fast',
    gradient: 'from-blue-500 to-indigo-600',
    emoji: '💊',
  },
  {
    id: 4,
    title: 'Bike Rentals @ ₹29/hr',
    subtitle: 'Explore your city',
    gradient: 'from-purple-500 to-pink-500',
    emoji: '🏍️',
  },
];

export function PromoBanner() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="mt-4">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {promoSlides.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 px-1"
            >
              <div
                className={cn(
                  'relative h-32 rounded-2xl bg-gradient-to-r p-4 flex items-center justify-between overflow-hidden',
                  slide.gradient
                )}
              >
                {/* Content */}
                <div className="z-10 text-white">
                  <h3 className="font-bold text-lg leading-tight">{slide.title}</h3>
                  <p className="text-white/90 text-sm mt-1">{slide.subtitle}</p>
                  <button className="mt-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-white/30 transition-colors">
                    Order Now
                  </button>
                </div>

                {/* Emoji decoration */}
                <div className="text-6xl opacity-30 absolute right-4">
                  {slide.emoji}
                </div>

                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -right-4 -bottom-8 w-24 h-24 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-muted-foreground/30'
            )}
          />
        ))}
      </div>
    </div>
  );
}
