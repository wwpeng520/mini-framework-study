import React from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default function Form({ form, children, onFinish, onFinishFailed }, ref) {
  // 类组件使用时不会传入 props.form，此时 useForm 是第一次调用
  const [formInstance] = useForm(form);

  // 子 => 父
  // 类组件可以使用 formInstance 初始化等
  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

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
