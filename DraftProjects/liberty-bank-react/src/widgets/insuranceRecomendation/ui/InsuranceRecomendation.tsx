import { InsuranceCard } from '@/entities/insuranceCard';
import { Icon, Preloader, Text, useGetInsurancePopularProductsQuery } from '@/shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RECOMENDATION_PRODUCTS, TITLE } from '../constants';
import styles from './InsuranceRecomendation.module.scss';

export const InsuranceRecomendation = () => {
  const {
    data: popularProducts,
    isLoading,
    isError,
    isSuccess,
  } = useGetInsurancePopularProductsQuery();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const slideWidth = 580;
  const gap = 20;

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX !== null && isDragging && isSuccess) {
      const currentX = e.clientX;
      const deltaX = startX - currentX;

      const newPosition = Math.min(
        Math.max(scrollPosition + deltaX, 0),
        (popularProducts.products.length - 1) * (slideWidth + gap),
      );

      requestAnimationFrame(() => {
        setScrollPosition(newPosition);
        setStartX(currentX);
      });
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const handleNextSlide = () => {
    setScrollPosition(scrollPosition + (slideWidth + gap));
  };

  const handlePrevSlide = () => {
    setScrollPosition(scrollPosition - (slideWidth + gap));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && (
        <div className={styles['container']}>
          <Text className={styles['title']} tag='p' size='xl' weight='bold'>
            {TITLE}
          </Text>
          <div
            className={styles['sliderLayout']}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div
              className={styles['slider']}
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {popularProducts.products.length > 0 &&
                popularProducts.products.map((product) => {
                  const recommendationInfo = RECOMENDATION_PRODUCTS.find(
                    (info) => info.name === product.name,
                  );
                  return (
                    recommendationInfo?.name && (
                      <div key={product.id}>
                        <InsuranceCard
                          name={recommendationInfo?.name}
                          imgName={recommendationInfo?.imgName}
                          onButtonClick={() =>
                            navigate(recommendationInfo?.path, {
                              state: {
                                name: recommendationInfo?.name,
                                style: recommendationInfo?.style,
                                pathCalculation: recommendationInfo?.pathCalculation,
                                id: recommendationInfo?.id,
                              },
                            })
                          }
                          style={recommendationInfo?.style}
                        />
                      </div>
                    )
                  );
                })}
            </div>
            <button
              className={styles['prevButton']}
              onClick={handlePrevSlide}
              style={{
                visibility: scrollPosition > 0 ? 'visible' : 'hidden',
              }}
            >
              <Icon icon={'arrow-left-white-big'} widthAndHeight={'36px'} />
            </button>
            <button
              className={styles['nextButton']}
              onClick={handleNextSlide}
              style={{
                visibility:
                  scrollPosition < (popularProducts.products.length - 2) * (slideWidth + gap)
                    ? 'visible'
                    : 'hidden',
              }}
            >
              <Icon icon={'arrow-right-white-big'} widthAndHeight={'36px'} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
