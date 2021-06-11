import React, { useState } from 'react';

class FormStore {
  constructor(forceRootRender) {
    // 强行刷新组件方法
    this.forceRootRender = forceRootRender;
    this.store = {};

    // Fields 字段实体数组
    this.fieldEntities = [];

    // Form 组件传入 onFinish, onFinishFailed，提交时执行
    this.callbacks = Object.create(null);
  }

  // 订阅和取消订阅，监听和取消监听要成对出现
  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    // 返回取消监听函数
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallbacks = (cbs) => {
    const { initialValues = {}, ...rest } = cbs || {};

    this.setFieldsValue(initialValues);
    this.callbacks = { ...this.callbacks, ...rest };
  };

  setInitialValues = (initialValues, mounted) => {
    if (!mounted) {
      this.store = { ...initialValues };
    }
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  setFieldsValue = (newStore) => {
    // 1. 更新store
    this.store = { ...this.store, ...newStore };

    // 2. 更新组件（只会更新对应的 Field 组件）
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    // antd@4 中使用的是 async-validator 校验库

    // 存储错误信息
    let err = [];
    this.fieldEntities.forEach((field) => {
      const { name, rules } = field.props;
      let rule = rules && rules[0];
      let value = this.getFieldValue(name);
      if (rule && rule.required && !value) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });

    return err;
  };

  submit = () => {
    let err = this.validate();
    console.log('err: ', err);
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length > 0) {
      // 出错了
      onFinishFailed(err, this.getFieldsValue());
    } else {
      // 校验通过
      onFinish(this.getFieldsValue());
    }
  };

  // 导出获取、变更 store 方法，以及表单验证等执行等
  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      setCallbacks: this.setCallbacks,
      setInitialValues: this.setInitialValues,
      validate: this.validate,
      submit: this.submit,
    };
  };
}

// const [form] = Form.useForm();
export default function useForm(form) {
  // form 可传可不传
  // 传的时候直接使用传入的 form 实例，否则创建一个实例，并且每个 Form 只会创建一个 form 实例
  const formRef = React.useRef();

  // 强行刷新组件方法
  const [, forceUpdate] = useState({});

  if (!formRef.current) {
    // formStore 在整个生命周期中只能初始化一次，否则每次更新去初始化，那每次初始化前表单变更的数据都会丢失
    if (form) {
      formRef.current = form;
    } else {
      // 调用此方法可以让组件刷新
      const forceReRender = () => {
        forceUpdate({});
      };
      const formStore = new FormStore(forceReRender);
      formRef.current = formStore.getForm();
    }
  }

  // 一般自定义 hooks 返回一个数组，方便拓展，且不限制导出项的名称
  return [formRef.current];
}
