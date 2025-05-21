'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { pricingTiers, featureCategories, featureMapping } from '@/config';
import classes from './PricingCard.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const {
  pricingCardContainer,
  cardSlider,
  card,
  cardHeader,
  popular,
  price,
  period,
  featuresList,
  included,
  notIncluded,
  featureLabel,
  featureDetail,
  cardFooter,
  ctaButton,
  secondary
} = classes;

const PricingCard = () => {
  return (
    <div className={pricingCardContainer}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        touchRatio={1.5}
        grabCursor={true}
        className={cardSlider}
        initialSlide={1}
      >
        {pricingTiers.map((tier) => (
          <SwiperSlide key={tier.name}>
            <div className={`${card} ${tier.recommended ? popular : ''}`}>
              <div className={`${cardHeader} ${tier.recommended ? popular : ''}`}>
                <h3>{tier.name}</h3>
              </div>

              <div className={price}>
                ${tier.price === 'Free' ? 'Free' : tier.price.replace('$', '')}
                <span className={period}>
                  {tier.period === 'forever' ? '/month' : `/${tier.period}`}
                </span>
              </div>

              <ul className={featuresList}>
                {featureCategories.map((category) => {
                  // Type-safe access using type assertion
                  const tierMapping = featureMapping[tier.name as keyof typeof featureMapping];
                  const featureData = tierMapping[category as keyof typeof tierMapping];

                  return (
                    <li
                      key={`${tier.name}-${category}`}
                      className={featureData.included ? included : notIncluded}
                    >
                      <span className={featureLabel}>{category}:</span>
                      {featureData.details && (
                        <span className={featureDetail}>{featureData.details}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className={cardFooter}>
                <button
                  className={`${ctaButton} ${tier.name === 'Basic' ? secondary : ''}`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PricingCard;