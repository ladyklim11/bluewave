
// Libraries
import React from 'react';

// Components
import {FormControlLabel, Radio, RadioGroup, Checkbox} from '@material-ui/core';
import {HexColorPicker} from 'react-colorful';

// Assets
import close from '../../../assets/service/closeIcon.svg';

// Styles
import styles from './style.module.scss';
import Input from "../../Input";


const DEFAULT_TYPES = {
  radio: 'radio',
  radioGroups: 'radioGroups',
  colorPicker: 'colorPicker',
  editPage: 'editPage',
  checkbox: 'checkbox'
};

const PhoneScreen = (props) => {
  const {
    isShow,
    setHide,
    title,
    renderContent,
    actions,
    values,
    additionalFunctional = null
  } = props;
  const [isShowWithAnim, setIsShowWithAnim] = React.useState(isShow);
  const [localData, setLocalData] = React.useState(additionalFunctional?.defaultValueForDefaultType);
  const [reset, setReset] = React.useState(false);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    setLocalData(additionalFunctional?.defaultValueForDefaultType);
  }, [additionalFunctional]);

  React.useEffect(() => {
    setTimeout(() => {
      if (isShowWithAnim) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        setHide && setHide(reset ? additionalFunctional?.defaultValueForDefaultType : localData);
      }
    }, 200);
  }, [isShowWithAnim]);

  React.useEffect(() => {
    setIsShowWithAnim(isShow);
  }, [isShow]);

  const handleCloseWithoutChanges = () => {
    setReset(true);
    setIsShowWithAnim(false);
  };

  return (
    <>
      {isShow && (
        <div className={styles.Container}>
          <div className={styles.Shadow} onClick={handleCloseWithoutChanges} />
          <div ref={wrapperRef} className={styles.Wrapper} style={{bottom: isShowWithAnim ? 0 : -1000}}>
            <div className={styles.Panel}>
              <div className={styles.Close} onClick={handleCloseWithoutChanges}>
                <img src={close} alt='Закрыть' />
              </div>
              {title && (
                <div className={styles.Title}>{title}</div>
              )}
            </div>
            <div className={styles.Content}>
              {!additionalFunctional && renderContent && renderContent(actions, values)}
              {additionalFunctional && additionalFunctional?.defaultType === DEFAULT_TYPES.radio && (
                <RadioGroup
                  onChange={e => setLocalData(e.target.value)}
                  value={localData}
                  defaultValue={additionalFunctional.defaultValueForDefaultType}
                  style={{marginBottom: 20}}
                >
                  {additionalFunctional.dataForDefaultType.map(({ value, label, subLabel, style = {}, className }) => (
                    <div style={style} className={className}>
                      <FormControlLabel value={value} control={<Radio />} label={`${label}`} />
                    </div>
                  ))}
                </RadioGroup>
              )}
              {additionalFunctional && additionalFunctional?.defaultType === DEFAULT_TYPES.radioGroups
              && (
                <RadioGroup
                  onChange={e => setLocalData(() => e.target.value)}
                  value={localData}
                  defaultValue={additionalFunctional.defaultValueForDefaultType}
                >
                  {additionalFunctional?.dataForDefaultType.map(({ options, title }) => (
                    <div style={{marginBottom: 20}}>
                      <div className={styles.RadioGroupTitle}>{title}</div>
                      {options.map(({ value, label }) => (
                        <div>
                          <FormControlLabel value={value} control={<Radio />} label={`${label}`} />
                        </div>
                      ))}
                    </div>
                  ))}
                </RadioGroup>
              )}
              {additionalFunctional && additionalFunctional?.defaultType === DEFAULT_TYPES.checkbox && localData && (
                <div style={{marginBottom: 20}}>
                  {additionalFunctional.dataForDefaultType.map(({ value, label, subLabel, style = {} }) => (
                    <div key={label} {...style}>
                      <FormControlLabel
                        value={value}
                        control={
                          <Checkbox
                            checked={localData.map(item => item?.value).includes(value)}
                            onChange={e =>
                              setLocalData(prev => e.target.checked
                                ? [...prev, { value, label }]
                                : prev.filter(item => item.value !== value)
                              )
                            }
                          />
                        }
                        label={`${label}`}
                      />
                    </div>
                  ))}
                </div>
              )}
              {additionalFunctional && additionalFunctional?.defaultType === DEFAULT_TYPES.colorPicker && (
                <>
                  <HexColorPicker
                    color={localData || '#fff'}
                    onChange={setLocalData}
                    style={{width: '100%', marginBottom: 20}}
                  />
                  <input
                    value={localData}
                    onChange={e => setLocalData(e.target.value)}
                    style={{marginBottom: 20, height: 40, padding: '12px 10px'}}
                  />
                </>
              )}
              {additionalFunctional && additionalFunctional?.defaultType === DEFAULT_TYPES.editPage && (
                <div>
                  <Input
                    placeholder='Название'
                    value={localData?.name}
                    onChange={(e) => setLocalData(prev => ({ ...prev, name: e.target.value }))}
                    style={{marginBottom: 15}}
                  />
                  <Input
                    placeholder='Ссылка'
                    value={localData?.link}
                    onChange={(e) => setLocalData(prev => ({ ...prev, link: e.target.value }))}
                    style={{marginBottom: 10}}
                  />
                </div>
              )}
              {additionalFunctional?.defaultType && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <button
                    className={styles.ButtonReject}
                    onClick={handleCloseWithoutChanges}
                    style={{marginRight: 6}}
                  >
                    Отмена
                  </button>
                  <button
                    className={styles.ButtonAccept}
                    onClick={() => {
                      setReset(false);
                      setIsShowWithAnim(false);
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PhoneScreen;