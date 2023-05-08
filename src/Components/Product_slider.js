import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Product_slider({}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [procart, setprocart] = useState([]);

  const getproductData = () => {
    axios.get("http://localhost:4800/product").then(function (response) {
      // console.log("response", response.data);
      setprocart(response.data.data);
    });
  };

  useEffect(() => {
    getproductData();
  }, []);

  return (
    <div className="container">
      <div class="row d-flex justify-content-center text-center">
        <div className="col-md-8">
          <div class="slider-head">
            <h2>Popular Products</h2>
          </div>
          <Slider {...settings}>
            {procart.map((slide, i) => {
              return (
                <div className="card">
                  <img
                    className="d-block w-100"
                    src={slide.uploadedfile}
                    alt={slide}
                  />
                  <div>
                    <button className="addto">Add to Cart</button>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
);
}
