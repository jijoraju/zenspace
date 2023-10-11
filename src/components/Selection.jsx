import React, { useRef, useImperativeHandle } from 'react';

const Selection = React.forwardRef((props, ref) => {
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
      <label htmlFor={props.id}>{props.label||''}</label>
      <select 
        ref={inputRef} 
        name={props.name} 
        id={props.id} 
        onBlur={props.onBlur} 
        onFocus={props?.onFocus}
        onChange={props.onChange}
        defaultValue={props.optionActive||''}
      >
        {
          props.children
          // props.options.map((item,index)=> <option key={index} value={item.name}  >{item.name}</option> )
        }
      </select>
    </div>
  );
});

export default React.memo(Selection);
