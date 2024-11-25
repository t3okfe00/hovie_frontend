import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface MovieCarouselProps {
  movies: Array<{
    id: number;
    title: string;
    images: string[];
  }>;
  isLoading: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies = [], isLoading = false }) => {
  const settings = {
    dots: true,
    infinite: movies.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: movies.length > 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
    adaptiveHeight: true,
    pauseOnHover: true,
    arrows: true,
    dotsClass: "slick-dots custom-dots"
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto my-8">
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="w-full mx-auto my-8">
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-xl">No movies available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto my-8 top-7 relative">
      <style>{`
        .slick-dots {
          bottom: 25px;
          z-index: 20;
        }
        .slick-dots li button:before {
          color: white;
          font-size: 12px;
          opacity: 0.7;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
        .slick-prev, .slick-next {
          z-index: 20;
          width: 50px;
          height: 50px;
        }
        .slick-prev {
          left: 25px;
        }
        .slick-next {
          right: 25px;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 50px;
          opacity: 0.7;
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          opacity: 1;
        }
      `}</style>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="relative ">
              <img
                src={movie.images[0] || 'https://via.placeholder.com/1920x1080?text=No+Image+Available'}
                alt={movie.title}
                className="w-full h-[650px]  object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent h-2/5 p-8">
                <div className="absolute bottom-16 left-8 right-8">
                  <h3 className="text-white text-4xl font-bold mb-4">{movie.title}</h3>
                  <div className="flex gap-4">
                    {/* <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                      Watch Now
                    </button> */}
                    <button className="bg-gray-600 bg-opacity-60 text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-70 transition-all">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
