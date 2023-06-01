
// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

// Components
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getMenu } from '../Menus';
import { getDivider } from '../Dividers';
import ControlPanel from '../ControlPanel';
import Block from '../Block';
import ProductCard from '../../Constructor/ProductCard';
import Slider from 'react-slick';

// Constants
import { DOESNT_RENDERED_TYPES, SOCIALS } from '../constants';

// Styles
import styles from '../style.module.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {useMediaQuery} from "react-responsive";
import history from "../../../history";


// userMode - флаг для просмотра в режиме пользователя
export const renderByType = (block, userMode, isMobile) => {
  const { type_block_id, content } = block;

  if (content) {
    switch (type_block_id) {
      case 1: {
        return (
          <div
            className={`${styles.Text} ql-editor`}
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        )
      }

      case 2: {
        return (
          <div className={styles.Picture}>
            <img
              src={content?.url || content?.image}
              alt='Аватар'
              className={content.is_avatar && 'Avatar'}
            />
          </div>
        )
      }

      case 3: {
        const rotation = {
          telegram: 1,
          whatsapp: 2,
          viber: 3,
          skype: 4
        }

        const Content = ({ id, link }) => link && (
          <div
            key={link}
            className={styles.Social__Item}
            style={{background: SOCIALS[id].theme}}
          >
            <div className={styles.Social__Container}>
              <img
                src={SOCIALS[id].icon}
                className={styles.Social__Img}
                alt='Соц сеть'
                style={SOCIALS[id]?.styles}
              />
            </div>
            <div className={styles.Social__Name}>
              {SOCIALS[id].label}
            </div>
          </div>
        );

        return (
          <div className={styles.Social}>
            {Object.entries(content).sort((a, b) => rotation[a[0]] - rotation[b[0]]).map(([id, link]) => userMode ? (
              <a href={link}>
                <Content id={id} link={link} />
              </a>
            ) : <Content id={id} link={link} />)}
          </div>
        )
      }

      case 4: {
        const rotation = {
          vk: 1,
          facebook: 2,
          youtube: 4
        };

        const Content = ({ id, link }) => link && (
          <div
            key={link}
            className={`${styles.Social__Item} ${styles.Social__Item_small}`}
            style={{background: SOCIALS[id].theme}}
          >
            <div className={styles.Social__Container}>
              <img src={SOCIALS[id].icon} className={styles.Social__Img} alt='Соц сеть' />
            </div>
          </div>
        )

        return (
          <div className={`${styles.Social} ${styles.Social_small}`}>
            {Object.entries(content).sort((a, b) => rotation[a[0]] - rotation[b[0]]).map(([id, link]) => userMode ? (
              <a href={link} style={{marginRight: 8}}>
                <Content id={id} link={link} />
              </a>
            ) : <Content id={id} link={link} />)}
          </div>
        )
      }

      case 5: {
        return (
          <div className={styles.Video} style={{height: userMode && !isMobile && 600}}>
            <iframe
              src={`https://www.youtube.com/embed/${
                (
                  content.url
                  && content.url.split('=')
                  && content.url.split('=')[1]
                  && content.url.split('=')[1].split('&')[0]
                ) || (
                  content.url
                  && content.url.split('/')
                  && content.url.split('/')[3]
                )
              }`}
              width='100%'
              height='100%'
              title='YouTube video player'
              frameBorder='0'
              allow='fullscreen'
            />
          </div>
        )
      }

      case 6: {
        const Content = () => (
          <button
            className={content.size}
            style={{backgroundColor: content.backgroundColor, color: content.textColor}}
          >
            {content.text}
          </button>
        )

        return userMode ? (
          <a href={content.link}>
            <Content />
          </a>
        ) : <Content />
      }

      case 8: {
        return getDivider(content.dividerId).content(content.backgroundColor)
      }

      case 9: {
        const settings = {
          dots: false,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: content.autoplay,
          autoplaySpeed: content.speed ? content.speed * 1000 : 2000
        };

        return (
          <div className={styles.Slides}>
            {/*<div className={styles.Gallery}>
                {content && content.photos && content.photos.map(({ image }, i) => (
                  <div className={`${styles.Gallery__Item} ${i === 0 && styles.Gallery__MainPicture}`}>
                    <img src={image} alt='' />
                  </div>
                ))}
              </div>*/}
            <Slider {...settings}>
              {content && content.photos && content.photos.map(({ image }) => (
                <div className={styles.Slide}>
                  <img src={image} alt='Слайд' />
                </div>
              ))}
            </Slider>
          </div>
        )
      }

      case 10: {
        return (
          <div
            className={styles.Breadcrumbs}
            style={{justifyContent: content.position === 'right' ? 'flex-end' : 'flex-start'}}
          >
            <div style={{color: content.textColor}}>Хлебные крошки</div>
          </div>
        )
      }

      case 11: {
        return (
          <div>
            <img src={getMenu(content.menuIconId).icon} alt='Иконка меню' />
          </div>
        )
      }

      case 12: {
        return content.products.map(product => <ProductCard product={product} />)
      }

      case 13: {
        return (
          <div className={styles.PaymentForm}>
            <div className={styles.PaymentForm__Title} style={{color: content.textBlock.textColor}}>
              {content.textBlock.text}
            </div>
            <div className={`${styles.Block__Label} ${styles.PaymentForm__Subtitle}`}>
              Сумма оплаты
            </div>
            <input value={`${content.payment.price || 0} Р`} />
            <button className={styles.PaymentForm__Button} style={{color: content.button.textColor, background: content.button.buttonColor}}>
              {content.button.text}
            </button>
          </div>
        )
      }
    }
  }
};

const getWarning = warning => ({
  subscription: (
    <span>
      <span>
        Ваш тариф «{warning.currentSubType}» заканчивается {moment(warning.date).format('DD.MM.YYYY')} в {moment(warning.date).format('hh:mm')}.
      </span>
      <span> </span>
      <Link to='/tariffs'>Обновить тариф</Link>
    </span>
  )
}[warning.type]);

const List = ({ actions, values }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const {
    setSelectedBlock,
    swapBlocks
  } = actions;

  const {
    activePage,
    selectedBlock
  } = values;

  const Content = ({ block }) => (
    <div
      className={`${styles.List__Item} ${block.id === selectedBlock?.id && styles.List__Edit}`}
      onClick={() => setSelectedBlock(prev => prev?.id !== block.id ? block : null)}
    >
      <ControlPanel
        show={block.id === selectedBlock?.id}
        actions={actions}
        values={values}
      />
      {renderByType(block)}
    </div>
  );

  const getBlocks = () => activePage
    && !!activePage?.blocks?.length
    ? activePage.blocks.filter(block => !DOESNT_RENDERED_TYPES.includes(block.type_block_id))
      .sort((a, b) => a.index_number - b.index_number)
    : [];

  return (
    <div
      className={styles.List}
      style={{
        background: !isMobile && (
          activePage?.settings?.background.image
            ? `url(${activePage?.settings?.background.image }) no-repeat center / cover`
            : activePage?.settings?.color
        ),
      }}
    >
      <PerfectScrollbar>
        {activePage && !!activePage?.warnings?.length && activePage.warnings.map(warning => (
          <div
            key={warning.id}
            className={`${styles.List__Item} ${styles.List__Item_alert}`}
          >
            {getWarning(warning)}
          </div>
        ))}
        {isMobile ? (
          <div className={styles.DND}>
            {getBlocks().map(block => <Content block={block} />)}
          </div>
        ) : (
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div className={styles.DND}>
              {getBlocks().map(block => (
                <Block
                  key={block.id}
                  index={block.index_number}
                  id={block.id}
                  content={<Content block={block} />}
                  moveBlock={swapBlocks}
                />
              ))}
            </div>
          </DndProvider>
      )}
      </PerfectScrollbar>
    </div>
  )
}

export default List;