import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { CarrouselProps } from "./Carousel.types";

/**
 * Carrousel using custom element
 */
function Carrousel<T>(props: CarrouselProps<T>) {
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

export default Carrousel;
