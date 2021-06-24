import React, { useRef } from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default function Form({ form, children, onFinish, onFinishFailed, initialValues }, ref) {
  // 类组件使用时不会传入 props.form，此时 useForm 是第一次调用
  const [formInstance] = useForm(form);
  const mountRef = useRef(null);

  // 子 => 父
  // 类组件可以使用 formInstance 初始化等
  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  // 初始化数据，只能初始化一次
  formInstance.setInitialValues(initialValues, mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
}
