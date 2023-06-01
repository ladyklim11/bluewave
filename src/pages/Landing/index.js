
// Libraries
import React from 'react';

// Components
import DividedContent from '../../components/Landing/DividedContent';
import BlueWaves from '../../components/Landing/BlueWaves';
import Header from '../../components/Landing/Header';
import Footer from '../../components/Landing/Footer';

// Assets
import slide2_1 from '../../assets/landing/2-1.svg';
import slide2_2 from '../../assets/landing/2-2.png';
import slide3_1 from '../../assets/landing/3-1.svg';
import slide3_2 from '../../assets/landing/3-2.svg';
import slide4_1 from '../../assets/landing/4-1.svg';
import slide4_2 from '../../assets/landing/4-2.svg';
import slide5_1 from '../../assets/landing/5-1.svg';
import slide5_2 from '../../assets/landing/1-2.png';


const Landing = () => {
  const Contents = [
    {
      prevBackgroundColor: '#452DA5',
      backgroundColor: '#fff',
      direction: 'row-reverse',
      title1: 'Мультиссылка',
      title2: 'Добавьте несколько ссылок вместо одной',
      texts: [
        'С помощью BlueWave вы сможете разместить любое количество ссылок на страницы ваших товаров и услуг, акции и спецпредложения, мессенджеры для связи в один клик, аккаунты в соцсетях и многое другое.'
      ],
      linkUrl: '/constructor',
      linkText: 'Попробовать сейчас',
      imageSmall: slide2_1,
      imagesCarousel: [
        slide2_2
      ],
      imageSignatureText: 'Бесплатно',
      imageSignatureBackgroundColor: '#E84B47',
      morePaddingTop: true
    },
    {
      prevBackgroundColor: '#fff',
      backgroundColor: '#F8F7FF',
      title1: 'Лендинг',
      title2: 'Создайте продающую страницу',
      texts: [
        'Формируйте предложения от которых сложно отказаться, запускайте акции, мотивируйте аудиторию оставлять заявки и заказы.',
        'Добавьте вовлекающий текст, наглядные фотографии и мотивирующее видео, чтобы заинтересовать покупателей. Используйте блок с ответами на часто задаваемые вопросы, запустите ограниченную по времени акцию с таймером обратного отсчета.'
      ],
      linkUrl: '/constructor',
      linkText: 'Попробовать сейчас',
      imageSmall: slide3_1,
      imagesCarousel: [
        slide3_2
      ],
      imageSignatureText: 'Бесплатно',
      imageSignatureBackgroundColor: '#E84B47'
    },
    {
      prevBackgroundColor: '#F8F7FF',
      backgroundColor: '#fff',
      direction: 'row-reverse',
      title1: 'Интернет-магазин',
      title2: 'Продавайте товары через свой сайт',
      texts: [
        'Позвольте клиентам просматривать и оплачивать товары. В BlueWave вы создадите свой интернет-магазин за 10 минут без дизайнера и программиста.'
      ],
      linkUrl: '/constructor',
      linkText: 'Попробовать сейчас',
      imageSmall: slide4_2,
      imagesCarousel: [
        slide4_1
      ],
      imageSignatureText: 'За 10 минут',
      imageSignatureBackgroundColor: '#70BCF8'
    },
    {
      prevBackgroundColor: '#fff',
      backgroundColor: '#F8F7FF',
      title1: 'Месседжеры',
      title2: 'Позвольте клиентам связаться с вами в один клик',
      texts: [
        'Мессенджеры — самый удобный, современный и распространенный способ связи.',
        'Создайте умные ссылки на мессенджеры, позволяющие начать диалог с вами в один клик, и получайте больше обращений и заявок от своих подписчиков.'
      ],
      linkUrl: '/constructor',
      linkText: 'Попробовать сейчас',
      imageSmall: slide5_1,
      imagesCarousel: [
        slide5_2
      ],
      imageSignatureText: 'Бесплатно',
      imageSignatureBackgroundColor: '#E84B47'
    },
  ]

  return (
    <div>
      <Header />
      {Contents.map((content, i) => <DividedContent key={i} {...content} />)}
      <BlueWaves waveColor={Contents[Contents.length - 1].backgroundColor} />
      <Footer />
    </div>
  )
}

export default Landing;