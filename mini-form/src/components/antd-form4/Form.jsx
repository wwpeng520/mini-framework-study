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
  if (!mountRef.current) {
    formInstance.setInitialValues(initialValues);
    mountRef.current = true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
        // 应该把提交的调用（onFinish, onFinishFailed）放在 useForm 上：
        // 1.因为用户可能会自己定义提交按钮和操作，不一定会调用此方法
        // 2.提交方法放在 useForm 上只需要定义一次，任意地方调用
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
}
