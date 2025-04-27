import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { CarouselProps } from "./Carousel.types";
import { useTheme } from "../Providers/ThemeProvider";
/**
 * Carousel using custom element
 */
function Carousel<T>(props: CarouselProps<T>) {
  const { theme } = useTheme();
  const { id, items, renderItem, spaceBetween = 0 } = props;

  if (!items.length) return null;

  // ----------------------------------------------------------------------

  if (items.length === 1) {
    const singleItem = items[0];
    if (singleItem) {
      return renderItem(singleItem);
    }
    return null;
  }

  return (
    <Swiper
      id={id}
      style={{
        // @ts-ignore
        "--swiper-pagination-bullet-active": theme.palette.primary.main,
        "--swiper-pagination-bullet-inactive-color":
          theme.palette.text.secondary,
        "--swiper-pagination-bullet-inactive-opacity": "0.6",
        "--swiper-pagination-bullet-opacity": "1",
        "--swiper-pagination-bullet-size": "0.55rem",
        "--swiper-pagination-bullet-horizontal-gap": "0.25rem",
        "--swiper-navigation-color": theme.palette.primary.main,
        "--swiper-theme-color": theme.palette.primary.main,
      }}
      className="swiper-kui"
      slidesPerView={1}
      spaceBetween={spaceBetween}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, EffectFade]}
    >
      {items.map((item, idx) => {
        const key = `carousel-item-${idx}`;
        return <SwiperSlide key={key}>{renderItem(item)}</SwiperSlide>;
      })}
    </Swiper>
  );
}

// ----------------------------------------------------------------------

export default Carousel;
