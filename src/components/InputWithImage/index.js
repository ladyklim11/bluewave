
// Libraries
import React from 'react';


const InputWithImage = ({ icon, inputProps, error }) => {
  return (
    <div
      style={{
        position: 'relative',
        height: 40,
        ...inputProps?.style
      }}
    >
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: '100%',
          borderRight: '1px solid #D8D6E2',
        }}
      >
        <img src={icon} alt='Иконка' />
      </div>
      <input
        {...inputProps}
        style={{
          paddingLeft: 55,
          height: '100%',
          border: error && '1px solid rgba(188, 30, 30, 0.4)'
        }}
      />
      {error && (
        <div
          style={{
            marginTop: 8,
            color: '#BC1E1E',
            fontWeight: 'normal',
            fontSize: 12,
            lineHeight: '20px'
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
};

export default InputWithImage;