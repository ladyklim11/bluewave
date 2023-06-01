
// Libraries
import React from 'react';
import { v4 as uuid } from 'uuid';

// Components
import CreateTextBlock from '../../components/Constructor/CreateTextBlock';
import CreateImageBlock from '../../components/Constructor/CreateImageBlock';
import CreateButtonBlock from '../../components/Constructor/CreateButtonBlock';
import CreateCarouselBlock from '../../components/Constructor/CreateCarouselBlock';
import CreateDividerBlock from '../../components/Constructor/CreateDividerBlock';
import CreateMessengersBlock from '../../components/Constructor/CreateMessengersBlock';
import CreateSocialsBlock from '../../components/Constructor/CreateSocialsBlock';
import SetBackground from '../../components/Constructor/SetBackground';
import CreateVideoBlock from '../../components/Constructor/CreateVideoBlock';
import CreateBreadcrumbsBlock from '../../components/Constructor/CreateBreadcrumbsBlock';
import CreateMenuBlock from '../../components/Constructor/CreateMenuBlock';
import CreateNewPage from '../../components/Constructor/CreateNewPage';
import CreatePaymentBlock from '../../components/Constructor/CreatePaymentBlock';
import CreateProductBlock from '../../components/Constructor/CreateProductBlock';
import ShowAllPages from "../Constructor/ShowAllPages";

// Blocks
import video from '../../assets/blocksIcons/video.svg';
import backgroundBlockIcon from '../../assets/blocksIcons/background.svg';
import dividerBlockIcon from '../../assets/blocksIcons/divider.svg';
import carousel from '../../assets/blocksIcons/carousel.svg';
import newPage from '../../assets/blocksIcons/newPage.svg';
import menuBlockIcon from '../../assets/blocksIcons/menu.svg';
import breadcrumbs from '../../assets/blocksIcons/breadcrumbs.svg';
import productCard from '../../assets/blocksIcons/productCard.svg';
import payForm from '../../assets/blocksIcons/payForm.svg';
import textBlock from '../../assets/blocksIcons/textBlock.svg';
import image from '../../assets/blocksIcons/image.svg';
import instagram2 from '../../assets/blocksIcons/instagram.svg';
import messengers from '../../assets/blocksIcons/messengers.svg';
import buttonBlockIcon from '../../assets/blocksIcons/button.svg';

// Button icons
import facebookButton from '../../assets/buttonsIcons/facebook.svg';
import youtubeButton from '../../assets/buttonsIcons/youtube.svg';
import whatsAppButton from '../../assets/buttonsIcons/whatsapp.svg';
import viberButton from '../../assets/buttonsIcons/viber.svg';
import skypeButton from '../../assets/buttonsIcons/skype.svg';
import telegramButton from '../../assets/buttonsIcons/telegram.svg';
import instagramButton from '../../assets/buttonsIcons/instagram.svg';
import vkButton from '../../assets/buttonsIcons/vk.svg';

// Other icons
import facebook from '../../assets/social_additional/facebook.svg';
import instagram from '../../assets/social_additional/instagram.svg';
import skype from '../../assets/social_additional/skype.svg';
import telegram from '../../assets/social_additional/telegram.svg';
import viber from '../../assets/social_additional/viber.png';
import vk from '../../assets/social_additional/vk.svg';
import whatsApp from '../../assets/social_additional/whatsapp.svg';
import youtube from '../../assets/social_additional/youtube.svg';

// Styles
import styles from './style.module.scss';


const fs = require('fs');
const https = require('https');

export const TYPES_OF_CONTENT = {
  picture: 'picture',
  h: 'h',
  text: 'text',
  button: 'button',
  image: 'image',
  gallery: 'gallery',
  video: 'video',
  divider: 'divider',
  social: 'social',
  messengers: 'messengers',
  background: 'background',
  menu: 'menu',
  carousel: 'carousel',
  breadcrumbs: 'breadcrumbs',
  productCard: 'productCard',
  newPage: 'newPage',
  payForm: 'payForm'
};

export const DOESNT_RENDERED_TYPES = [7];

export const DEFAULT_SETTINGS = {
  background: {
    id: 0,
    image: null
  },
  color: '#F3F2F7'
}

export const SOCIALS = {
  vk: {
    icon: vk,
    buttonIcon: vkButton,
    theme: '#4680C2',
    label: 'ВКонтакте'
  },
  facebook: {
    icon: facebook,
    buttonIcon: facebookButton,
    theme: '#157DC3',
    label: 'Facebook'
  },
  instagram: {
    icon: instagram,
    buttonIcon: instagramButton,
    theme: 'radial-gradient(144.38% 122.74% at 1.82% 90.84%, #FED576 0%, #F47133 26.34%, #BC3081 60.91%, #4C63D2 100%)',
    label: 'Instagram'
  },
  youtube: {
    icon: youtube,
    buttonIcon: youtubeButton,
    theme: '#FF0000',
    label: 'YouTube'
  },
  whatsapp: {
    icon: whatsApp,
    buttonIcon: whatsAppButton,
    theme: '#48C45B',
    label: 'WhatsApp'
  },
  viber: {
    icon: viber,
    buttonIcon: viberButton,
    theme: '#7360F2',
    label: 'Viber',
    styles: {
      maxWidth: 32,
    }
  },
  skype: {
    icon: skype,
    buttonIcon: skypeButton,
    theme: '#0078D7',
    label: 'Skype'
  },
  telegram: {
    icon: telegram,
    buttonIcon: telegramButton,
    theme: '#289FD2',
    label: 'Telegram'
  },
}

export const TYPES_OF_SERVICE = {
  free: {
    level: 1,
    backgroundColor: '#EDECF1',
    color: '#070413',
    label: 'FREE',
  },
  pro: {
    level: 2,
    backgroundColor: '#9893AB',
    color: '#fff',
    label: 'PRO',
  },
  vip: {
    level: 3,
    backgroundColor: '#322C4D',
    color: '#fff',
    label: 'VIP',
  }
}

export const BLOCK_TYPES = [
  {
    defaultFormData: {
      text: null,
      settings: {
        textStyle: 'large',
        alignment: 'left',
        font: 'Arial'
      }
    },
    title: 'Текстовый блок',
    icon: textBlock,
    type_block_id: 1,
    account_type: TYPES_OF_SERVICE.free,
    rules: {
      text: {
        minLength: 1,
        required: true
      }
    },
    component: props => <CreateTextBlock {...props} />,
  },
  {
    defaultFormData: {
      image: null,
      url: null,
      is_avatar: false,
    },
    localState: {
      src: null,
      image: null,
      link: null
    },
    title: 'Изображение',
    icon: image,
    type_block_id: 2,
    account_type: TYPES_OF_SERVICE.free,
    submitText: 'Завершить',
    global_rules: {
      or: ['url', 'image']
    },
    component: props => <CreateImageBlock {...props} />,
  },
  {
    defaultFormData: null,
    title: 'Соц. сети',
    icon: instagram2,
    type_block_id: 4,
    account_type: TYPES_OF_SERVICE.free,
    component: props => <CreateSocialsBlock {...props} />,
  },
  {
    defaultFormData: null,
    title: 'Месседжеры',
    icon: messengers,
    type_block_id: 3,
    account_type: TYPES_OF_SERVICE.free,
    global_rules: {
      minFields: 1
    },
    component: props => <CreateMessengersBlock {...props} />,
  },
  {
    defaultFormData: {
      text: 'Кнопка',
      size: 'medium',
      backgroundColor: '#000',
      textColor: '#fff',
      link: null,
      animation: 'null'
    },
    title: 'Кнопка',
    icon: buttonBlockIcon,
    type_block_id: 6,
    account_type: TYPES_OF_SERVICE.free,
    rules: {
      text: {
        required: true,
        maxLength: 20
      },
      backgroundColor: {
        required: true
      },
      textColor: {
        required: true
      },
      link: {
        maxLength: 150
      }
    },
    component: props => <CreateButtonBlock {...props} />,
  },
  {
    defaultFormData: {
      url: null
    },
    title: 'YouTube',
    icon: video,
    type_block_id: 5,
    account_type: TYPES_OF_SERVICE.free,
    rules: {
      url: {
        required: true,
        isYouTube: true
      }
    },
    component: props => <CreateVideoBlock {...props} />,
  },
  {
    defaultFormData: {
      background: null,
      color: null,
    },
    title: 'Фон страницы',
    type_block_id: 7,
    icon: backgroundBlockIcon,
    account_type: TYPES_OF_SERVICE.free,
    event: 'isSettings',
    global_rules: {
      or: ['background', 'color']
    },
    component: props => <SetBackground {...props} />,
  },
  {
    defaultFormData: {
      backgroundColor: '#000',
      dividerId: null
    },
    title: 'Разделитель',
    icon: dividerBlockIcon,
    type_block_id: 8,
    account_type: TYPES_OF_SERVICE.free,
    rules: {
      backgroundColor: {
        required: true
      },
      dividerId: {
        required: true
      }
    },
    component: props => <CreateDividerBlock {...props} />,
  },
  {
    defaultFormData: {
      photos: [],
      speed: null,
      autoplay: true,
    },
    title: 'Карусель картинок',
    icon: carousel,
    type_block_id: 9,
    account_type: TYPES_OF_SERVICE.free,
    rules: {
      photos: {
        required: true
      }
    },
    component: props => <CreateCarouselBlock {...props} />,
  },
  {
    defaultFormData: {
      textBlock: {
        text: null,
        blockColor: '#f7f7f7',
        textColor: '#000000'
      },
      button: {
        text: 'Оплатить',
        buttonColor: null,
        textColor: '#fff'
      },
      payment: {
        services: [],
        price: null
      }
    },
    title: 'Форма оплаты',
    type_block_id: 13,
    icon: payForm,
    account_type: TYPES_OF_SERVICE.free,
    component: props => <CreatePaymentBlock {...props} />,
  },
  {
    defaultFormData: {
      position: 'left',
      textColor: '#452DA5'
    },
    title: 'Хлебные крошки',
    icon: breadcrumbs,
    account_type: TYPES_OF_SERVICE.pro,
    type_block_id: 10,
    rules: {
      textColor: {
        required: true
      },
    },
    component: props => <CreateBreadcrumbsBlock {...props} />,
  },
  {
    defaultFormData: {
      title: null,
      url: null
    },
    title: 'Новая страница',
    type_block_id: TYPES_OF_CONTENT.newPage,
    event: 'isAddPage',
    icon: newPage,
    account_type: TYPES_OF_SERVICE.pro,
    rules: {
      title: {
        required: true,
        maxLength: 50
      },
      url: {
        required: true
      },
    },
    component: props => <CreateNewPage {...props} />,
  },
  {
    defaultFormData: {
      menuIconId: 'tripleLines',
      links: [null, null]
    },
    title: 'Меню страниц',
    icon: menuBlockIcon,
    account_type: TYPES_OF_SERVICE.pro,
    type_block_id: 11,
    event: 'blockLikeSettings',
    rules: {
      menuIconId: {
        required: true
      },
    },
    component: props => <CreateMenuBlock {...props} />,
  },
  {
    defaultFormData: {
      products: []
    },
    title: 'Карточка товара',
    icon: productCard,
    account_type: TYPES_OF_SERVICE.vip,
    type_block_id: 12,
    component: props => <CreateProductBlock {...props} />,
  },
];

export const SCREENS = {
  addBlock: {
    id: uuid(),
    title: 'Добавить блок',
    renderContent: (actions, { user }) => {
      const openAlert = block => {
        actions.setAlertData({
          title: `Блок "${block.title}" доступен только на тарифе ${block.account_type.label}`,
          subtitle: 'Перейдите на другой тариф, чтобы добавить этот блок',
          buttonText: 'К тарифам',
          buttonLink: '/tariffs'
        })
      };

      return (
        <div className={styles.AddBlock}>
          {BLOCK_TYPES.map(block => (
            <div
              className={styles.AddBlock__Item}
              onClick={() => {
                (block.account_type.level <= user?.level) || block.account_type.level === 1
                  ? actions.setCreatingBlock(block)
                  : openAlert(block)
              }}
            >
              <div className={styles.AddBlock__Icon}>
                <img src={block.icon} />
              </div>
              <div
                className={styles.AddBlock__Type}
                style={{backgroundColor: block.account_type.backgroundColor, color: block.account_type.color}}
              >
                {block.account_type.label}
              </div>
              <div className={styles.AddBlock__Divider} />
              <div className={styles.AddBlock__Title}>
                {block.title}
              </div>
            </div>
          ))}
        </div>
      )
    }
  },
  showAllPages: {
    id: uuid(),
    title: 'Все страницы',
    renderContent: (actions, values) => <ShowAllPages actions={actions} values={values} />
  }
}