import React from 'react'
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
		<div>
			<Carousel>
				<Carousel.Item interval={2000}>
					<img
						className="d-block mx-auto p-5"
						src="https://www.penguin.co.uk/content/dam/prh/books/262/2629/9780141972312.jpg.transform/PRHDesktopWide_small/image.jpg"
						alt="First slide"
						style={{ width: "475px", height: "650px" }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block mx-auto p-5"
						src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Cover_%28Hound_of_Baskervilles%2C_1902%29.jpg"
						alt="Second slide"
						style={{ width: "475px", height: "650px" }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block img-fluid p-5"
						src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/7/30/1406719196162/b57b6007-afb1-4e3c-8263-b29f6534aee8-1360x2040.jpeg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=8a635c36538c519c575eb3b262c90e7e"
						alt="Third slide"
						style={{ width: "475px", height: "650px" }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block img-fluid p-5"
						src="https://www.qwirkstore.com/wp-content/uploads/2021/06/pride-n-prejudice.jpg"
						alt="Third slide"
						style={{ width: "475px", height: "650px" }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block img-fluid p-5"
						src="https://kottke.org/plus/misc/images/best-book-covers-2020-06.jpg"
						alt="Third slide"
						style={{ width: "475px", height: "650px" }}
					/>
				</Carousel.Item>
			</Carousel>
		</div>
  );
}

export default CarouselComponent