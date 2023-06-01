
// Libraries
import React from 'react';
import ReactQuill from 'react-quill';

// Components
import InputWithImage from '../../InputWithImage';

// Context
import {PhoneScreenDataContext} from '../index';
import {AlertScreenDataContext} from '../index';

// Assets
import linkButton from '../../../assets/buttonsIcons/link.svg';
import boldIcon from '../../../assets/textEditor/bold.svg';
import italicIcon from '../../../assets/textEditor/italic.svg';
import linkIcon from '../../../assets/textEditor/link.svg';
import strikeIcon from '../../../assets/textEditor/strike.svg';
import underlineIcon from '../../../assets/textEditor/underline.svg';
import textIcon from '../../../assets/textEditor/text.svg';
import alignmentIcon from '../../../assets/textEditor/alignment.svg';
import colorPickerIcon from '../../../assets/service/emptyColorPicker.svg';
import arrowIcon from '../../../assets/textEditor/arrow.svg';

// Styles
import styles from './style.module.scss';


const { Quill } = ReactQuill;

const TYPES_OF_MOBILE = {
  textStyle: 'textStyle',
  fontStyle: 'fontStyle',
  alignment: 'alignment',
  colorPicker: 'colorPicker',
};

const TYPES_OF_ALERT = {
  link: 'link'
};

const TEXT_SIZES = [
  {
    value: 'huge',
    label: 'Большой текст'
  },
  {
    value: 'large',
    label: 'Средний текст'
  },
  {
    value: 'small',
    label: 'Маленький текст'
  },
];

const HEADERS = [
  {
    value: '1',
    label: 'Заголовок 1'
  },
  {
    value: '2',
    label: 'Заголовок 2'
  },
  {
    value: '3',
    label: 'Заголовок 3'
  },
]


const DEFAULT_ALERT_FORM_DATA = {
  href: null,
  text: null
};

const TextEditor = ({ value, onChange }) => {
  const quillRef = React.useRef(null);
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);
  const { alertData, setAlertData } = React.useContext(AlertScreenDataContext);

  const [mobileScreenData, setMobileScreenData] = React.useState([false, null]);
  const [alertScreenData, setAlertScreenData] = React.useState([false, null]);
  const [alertFormData, setAlertFormData] = React.useState(DEFAULT_ALERT_FORM_DATA);

  const headerValues = HEADERS.map(({ value }) => value);
  const textSizesValues = TEXT_SIZES.map(({ value }) => value);

  React.useEffect(() => {
    if (value.settings.textStyle === null) {
      const ref = quillRef?.current?.getEditor();
      const editedContents = [
        {
          insert: ' ',
          attributes: {
            size: 'large'
          }
        }
      ];
      ref.setContents(editedContents);
    }
  }, []);

  React.useEffect(() => {
    const [show, type] = alertScreenData || [];

    switch (type) {
      case TYPES_OF_ALERT.link: {
        setAlertData({
          renderContent: () => (
            <div>
              <div style={{
                marginBottom: 12,
                textStyle: 16,
                lineHeight: '24px',
                color: '#070413',
                textAlign: 'center',
              }}>
                Добавить ссылку
              </div>
              <InputWithImage
                icon={linkButton}
                inputProps={{
                  placeholder: 'Вставьте ссылку...',
                  onChange: e => setAlertFormData(prev => ({ ...prev, href: e.target.value })),
                  value: alertFormData.href,
                  style: { marginBottom: 8 }
                }}
              />
              <input
                placeholder='Текст ссылки'
                value={alertFormData.text}
                onChange={e => setAlertFormData(prev => ({ ...prev, text: e.target.value }))}
                style={{marginBottom: 8, height: 40}}
              />
              <button
                className='medium'
                style={{textStyle: 16}}
                onClick={() => {
                  const { href, text } = alertFormData;
                  const editor = quillRef?.current?.getEditor();
                  editor.focus();
                  const cursorPosition = editor.getSelection()?.index || 0;
                  editor.insertText(cursorPosition, text, 'link', href);
                  setAlertScreenData(null);
                  setAlertData(null);
                }}
              >
                Вставить
              </button>
            </div>
          )
        });
        return;
      }

      default:
        return;
    }
  }, [alertScreenData, alertFormData]);

  React.useEffect(() => {
    if (alertData === null) {
      setAlertFormData(DEFAULT_ALERT_FORM_DATA);
    }
  }, [alertData]);

  React.useEffect(() => {
    const [show, type] = mobileScreenData;

    switch (type) {
      case TYPES_OF_MOBILE.textStyle: {
        setPhoneScreenData({
          isShow: show,
          setHide: textStyle => {
            const ref = quillRef?.current?.getEditor();
            if (headerValues.includes(textStyle)) {
              ref.format('header', +textStyle);
              const editedContents = ref.getContents().map(row => ({ ...row, attributes: { ...row?.attributes, size: null }}));
              ref.setContents(editedContents);
            }

            if (textSizesValues.includes(textStyle)) {
              const editedContents = ref.getContents().map(row => ({ ...row, attributes: { ...row?.attributes, size: textStyle }}));
              ref.setContents(editedContents);
              ref.format('header', null);
            }

            onChange({ settings: { ...value.settings, textStyle } })
            setMobileScreenData([false, TYPES_OF_MOBILE.textStyle]);
          },
          title: 'Стиль текста',
          additionalFunctional: {
            defaultType: 'radioGroups',
            defaultValueForDefaultType: value.settings.textStyle,
            dataForDefaultType: [
              {
                title: 'Текст',
                options: TEXT_SIZES
              },
              {
                title: 'Заголовок',
                options: HEADERS
              }
            ]
          }
        })
        return;
      }

      case TYPES_OF_MOBILE.fontStyle: {
        setPhoneScreenData({
          isShow: show,
          setHide: font => {
            quillRef?.current?.getEditor().format('font', font);
            onChange({ settings: { ...value.settings, font } });
            setMobileScreenData([false, TYPES_OF_MOBILE.fontStyle]);
          },
          title: 'Шрифт',
          additionalFunctional: {
            defaultType: 'radio',
            defaultValueForDefaultType: value.settings.font,
            dataForDefaultType: [
              {
                value: 'arial',
                label: 'Arial',
                className: styles.Arial
              },
              {
                value: 'comicSans',
                label: 'Comic Sans',
                className: styles.ComicSansMS
              },
              {
                value: 'courierNew',
                label: 'Courier New',
                className: styles.CourierNew
              },
              {
                value: 'roboto',
                label: 'Roboto',
                className: styles.Roboto
              },
              {
                value: 'sansSerif',
                label: 'Sans-serif',
                className: styles.SansSerif
              },
            ]
          }
        })
        return;
      }

      case TYPES_OF_MOBILE.alignment: {
        setPhoneScreenData({
          isShow: show,
          setHide: alignment => {
            quillRef?.current?.getEditor().format('align', alignment);
            onChange({ settings: { ...value.settings, alignment } });
            setMobileScreenData([false, TYPES_OF_MOBILE.alignment]);
          },
          title: 'Выравнивание текста',
          additionalFunctional: {
            defaultType: 'radio',
            defaultValueForDefaultType: value.settings.alignment,
            dataForDefaultType: [
              {
                value: 'left',
                label: 'Слева'
              },
              {
                value: 'center',
                label: 'По центру'
              },
              {
                value: 'right',
                label: 'Справа'
              },
            ]
          }
        })
        return;
      }

      case TYPES_OF_MOBILE.colorPicker: {
        setPhoneScreenData({
          isShow: show,
          setHide: color => {
            quillRef?.current?.getEditor().format('color', color);
            setMobileScreenData([false, TYPES_OF_MOBILE.colorPicker]);
          },
          title: 'Цвет текста',
          additionalFunctional: {
            defaultType: 'colorPicker',
            defaultValueForDefaultType: '#000000',
          }
        })
        return;
      }

      default:
        return;
    }
  }, [mobileScreenData])

  // Это не будет работать, если засунуть в useEffect - плохо, но не сильно страшно
  const Icons = Quill.import('ui/icons');
  delete Icons.bold;
  delete Icons.italic;
  delete Icons.underline;
  delete Icons.strike;
  delete Icons.link;

  const Font = Quill.import('formats/font');
  Font.whitelist = ['roboto', 'arial', 'comicSans', 'courierNew', 'sansSerif'];
  Quill.register(Font, true);


  const TextIcon = () => (
    <div className={styles.IconContainer}>
      <img src={textIcon} className={styles.IconTextStyle} alt='Стиль текста' />
      <img src={arrowIcon} className={styles.IconArrow} alt='' />
    </div>
  );
  const AlignmentIcon = () => (
    <div className={styles.IconContainer}>
      <img src={alignmentIcon} className={styles.IconAlignment} alt='Позиционирование' />
      <img src={arrowIcon} className={styles.IconArrow} alt='' />
    </div>
  );
  const ColorPickerIcon = () => <img src={colorPickerIcon} className={styles.IconColorPicker} alt='Цвет' />;
  const BoldIcon = () => <img src={boldIcon} className={styles.IconBold} alt='Жирный' />;
  const ItalicIcon = () => <img src={italicIcon} className={styles.IconItalic} alt='Курсив' />;
  const UnderlineIcon = () => <img src={underlineIcon} className={styles.IconUnderline} alt='Подчеркнутый' />;
  const StrikeIcon = () => <img src={strikeIcon} className={styles.IconStrike} alt='Зачеркнутый' />;
  const LinkIcon = () => <img src={linkIcon} className={styles.IconLink} alt='Ссылка' />;

  const CustomToolbar = React.useCallback(() => (
    <div id='toolbar' className='ql-toolbar'>
      <div className={`${styles.Row} ${styles.Container}`} style={{marginBottom: 8}}>
        <div className={`${styles.Row} ${styles.Row_withBigButton}`}>
          <button
            style={{width: 106, background: '#fff'}}
            onClick={() => setMobileScreenData([true, TYPES_OF_MOBILE.textStyle])}
          >
            <span className={styles.TextStyle}>
              {[...TEXT_SIZES, ...HEADERS].find(({ value: textStyle }) => textStyle === value.settings.textStyle)?.label}
            </span>
            <img src={arrowIcon} className={styles.IconArrow} alt='' />
          </button>
        </div>
        <div className={`${styles.Row} ${styles.Row_small}`}>
          <button
            className='ql-formats'
            onClick={() => setMobileScreenData([true, TYPES_OF_MOBILE.fontStyle])}
          >
            <TextIcon />
          </button>
          <button
            className='ql-alignment'
            onClick={() => setMobileScreenData([true, TYPES_OF_MOBILE.alignment])}
          >
            <AlignmentIcon />
          </button>
          <button
            className='ql-colorPicker'
            onClick={() => setMobileScreenData([true, TYPES_OF_MOBILE.colorPicker])}
          >
            <ColorPickerIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.Row} ${styles.Container}`}>
        <button className='ql-bold'>
          <BoldIcon />
        </button>
        <button className='ql-italic'>
          <ItalicIcon />
        </button>
        <button className='ql-underline'>
          <UnderlineIcon />
        </button>
        <button className='ql-strike'>
          <StrikeIcon />
        </button>
        <button
          onClick={() => setAlertScreenData([true, TYPES_OF_ALERT.link])}
        >
          <LinkIcon />
        </button>
      </div>
    </div>
  ), [value.settings.textStyle]);

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'bullet',
    'indent',
    'link',
    'color',
    'align'
  ];

  const modules = {
    toolbar: {
      container: '#toolbar',
      font: ['roboto', 'arial', 'comicSans', 'courierNew', 'sansSerif']
    },
    clipboard: {
      matchVisual: false,
    }
  };

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        onChange={text => onChange({ text })}
        value={value.text}
        modules={modules}
        formats={formats}
        theme={false}
      />
    </>
  )
}

export default TextEditor;