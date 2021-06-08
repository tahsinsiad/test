import Hero from '@/components/Hero';
import SUCarousel from 'semantic-ui-carousel-react';

let elements = [];

const Carousel = ({ post }) => {
  post.map((p, i) =>
    elements.push({
      render: () => {
        return <Hero key={i} hero={p} isEt />;
      }
    })
  );

  return (
    <SUCarousel
      elements={elements}
      duration={3000}
      animation="slide left"
      showNextPrev={true}
      showIndicators={true}
    />
  );
};

export default Carousel;
