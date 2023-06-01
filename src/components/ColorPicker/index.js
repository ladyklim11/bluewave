
// Libraries
import React from 'react';
import {PhoneScreenDataContext} from '../Editor';
import emptyIcon from '../../assets/service/emptyColorPicker.svg';


const ColorPicker = ({ color, onChange, style, placeholder, disabled }) => {
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);

  const ref = React.useRef();
  const [showPicker, setShowPicker] = React.useState(false);

  React.useEffect(() => {
    setPhoneScreenData({
      isShow: showPicker,
      setHide: color => {
        color && onChange(color);
        setShowPicker(false);
      },
      title: placeholder,
      additionalFunctional: {
        defaultType: 'colorPicker',
        defaultValueForDefaultType: color,
      }
    });
  }, [showPicker]);

  return (
    <div style={{position: 'relative', width: '100%', height: 50, ...style}} ref={ref}>
      {color && (
        <div
          style={{
            position: 'absolute',
            fontSize: 10,
            color: disabled ? 'black' : '#8F8D98',
            padding: '8px 12px',
          }}
        >
          {placeholder}
        </div>
      )}
      <input
        value={color}
        style={{
          width: '100%',
          height: '100%',
          fontWeight: color ? 500 : 400,
          paddingTop: color && 30,
          paddingLeft: color && 12
        }}
        placeholder={placeholder}
        onChange={e => {
          const updatedColor = e.target.value;
          switch (updatedColor.length) {
            case 0: {
              onChange('#' + updatedColor)
              return;
            }

            default: {
              if (updatedColor.length <= 7) {
                onChange(updatedColor);
              }

              return;
            }
          }
        }}
        disabled={disabled}
      />
      <div
        style={{
          position: 'absolute',
          width: 18,
          height: 18,
          background: color || `url(${emptyIcon})`,
          top: 5,
          right: 0,
          margin: 10,
          borderRadius: '50%',
          border: color && '1px solid rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}
        onClick={() => !disabled && setShowPicker(prev => !prev)}
      />
    </div>
  )
};

export default ColorPicker;