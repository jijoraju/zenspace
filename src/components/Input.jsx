import React, { useRef, useImperativeHandle } from 'react';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        className={props?.inputStyle}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onFocus={props?.onFocus}
        onBlur={props.onBlur}
        placeholder={props?.placeholder}
        maxLength={props.max}
        // {...props}
      />
      {
        <p className='error-text'>{props.hasError ?`Please enter a valid ${props.label}.`:''}</p>
      }
    </div>
  );
});

export default React.memo(Input);
