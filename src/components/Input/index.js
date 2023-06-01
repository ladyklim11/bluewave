
// Libraries
import React from 'react';


const Input = (props) => {
  const ref = React.useRef();
  const { style, placeholder, disabled, value } = props;

  return (
    <div style={{position: 'relative', width: '100%', height: 48, ...style}} ref={ref}>
      {value && (
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
        {...props}
        style={{
          width: '100%',
          height: '100%',
          fontWeight: value ? 500 : 400,
          paddingTop: value && 30,
          paddingLeft: value && 11,
          ...props?.style
        }}
      />
    </div>
  )
}

export default Input;