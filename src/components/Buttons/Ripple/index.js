
// Libraries
import React from 'react';

// Styles
import styles from './index.module.scss';


const styleRipple = {
  position: 'relative',
  overflow: 'hidden'
};
const styleRippleContainer = {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
}
const styleSpan = {
  transform: 'scale(0)',
  borderRadius: '100%',
  position: 'absolute',
  opacity: '0.75',
  backgroundColor: '#ffffff',
  animation: 'ripple 850ms'
}

const RippleButton = ({ ...props }) => {
  const [spanStyles, setSpanStyles] = React.useState({});
  const [count, setCount] = React.useState(0);
  const ref = React.useRef();

  const callCleanUp = (cleanup, delay) => {
  }

  const showRipple = (e) => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - (size / 2);
    const y = e.pageY - pos.y - (size / 2);

    const spanStyles = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
    setCount(prev => prev + 1);
    setSpanStyles(prev => ({ ...prev, [count]: spanStyles }));
  }

  const cleanUp = () =>{
    setSpanStyles({});
    setCount(0);
  }

  const renderRippleSpan = () => {
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return (
        spanArray.map((key, index) => {
          return <span key={'spanCount_' + index} className="" style={{ ...spanStyles[key]}}></span>
        })
      )
    } else {
      return null;
    }
  };

  const { children= null, classes = "", onClickHandler = null } = props;

  return (
    <div ref={ref} className={'ripple ' + classes} onClick={onClickHandler}>
      {children}
      <div className="rippleContainer" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
        {renderRippleSpan()}
      </div>
    </div>
  )
}

export default RippleButton;