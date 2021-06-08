# 实现简化版 form 表单库（antd@4的 Form 基于 rc-field-form）

## step.0

参考 antd@4 Form 组件的使用（通过组件的使用方法反过来实现组件的功能）
使用示例：/pages/AntdFormPage.jsx
主要组件和 api：Form, Field(Form.Item), useForm

## step.1

创建基础组件等：(/components/my-rc-field-form/)

```jsx
// Form.jsx
import React from 'react';

export default function Form({ children, onFinish, onFinishFailed }) {
  return children;
}

// Field.jsx
import React, { Component } from 'react';

export default class Field extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

// useForm.jsx
export default function useForm() {
  return [];
}

// index.jsx
import React from 'react';
import _Form from './Form';
import Field from './Field';
import useForm from './useForm';

const Form = _Form;
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };
export default Form;
```

不出意外的话就能看到正常的页面出来了，虽然没有任何交互功能。

## step.2

考虑 Field 组件的用法：

```jsx
<Field name="username" rules={[nameRules]}>
  <Input placeholder="input value" />
</Field>
```

内部是 Input 等组件，管理 Input 内部状态需要把其变成受控组件（否则需用用户自行管理其状态）。所以不能直接返回 props.children，可以使用`React.cloneElement(children, {...props})`将其变成受控组件。

```jsx
import React, { Component } from 'react';

export default class Field extends Component {
  getControlled = () => {
    return {
      value: 'otz',
      onChange: (e) => {
        const newValue = e.target.value;
        console.log('newValue: ', newValue);
      },
    };
  };
  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
```

考虑一下是否可以在 Field 内部维护 Input 的 value 属性和 onChange 事件。答案是可以的，但是状态维护在 Field 内部时，它的兄弟组件（同一个 Form 下的兄弟组件）怎么获取表单的数据呢？所以组件状态不能维护在 Field 内部。

那是不是可以把各个 Field 组件的状态都在他们的共同父节点上维护呢？这种方式也是我们最常使用的一种方式，也是 antd@3 中 Form 的设计方式。但是其有个弊端，就是每个 Field 状态变更时，其同一 Form 组件下的所有 Field（Form.Item）都会更新，因为在 React 中，父组件的内部的 state 变化，其所有的子组件都会更新。antd@4 中对此进行了优化，不在父组件中维护各个子组件的状态了，而是另外开辟一个存储空间维护状态，使用 context 传递给子组件（不能直接使用 props，因为 Form 与 Field 可能不是直接父子关系）。改造 useForm.jsx 如下：

```jsx
import React from 'react';

class FormStore {
  constructor() {
    this.store = {};
  }

  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  setFieldsValue = (newStore) => {
    // 更新 store
    this.store = {
      ...this.store,
      ...newStore,
    };
  };

  validate = () => {};

  submit = () => {};

  // 导出获取、变更 store 方法，以及表单验证等执行等
  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      validate: this.validate,
      submit: this.submit,
    };
  };
}

// 使用方法：const [form] = Form.useForm();
// form 对象上挂载了获取、变更 formStore 等方法：form.getFieldsValue, form.setFieldsValue...
export default function useForm() {
  const formRef = React.useRef();

  if (!formRef.current) {
    // formStore 在整个生命周期中只能初始化一次，否则每次更新去初始化，那每次初始化前表单变更的数据都会丢失
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
```

创建 FormContext.jsx：

```jsx
import React from 'react';

const FieldContext = React.createContext();
export default FieldContext;
```

改造 Form.jsx：

```jsx
import React from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default function Form({ form, children, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);

  return <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>;
}
```

在 MyRcFormPage 中调用了一次 useForm，获取了 form 实例，并把该实例传递给了 Form 组件（form props）。这里为什么要调用 useForm 呢？这里获取了 form 可以做一些操作，比如：初始化表单数据，还有在组件内校验和提交表单都必须确保和 Form 组件内的 formInstance 是同一个。

在 Form 组件内通过`const [formInstance] = useForm(form);`获取了 formInstance 通过 FieldContext.Provider 包裹以传递给子孙组件。

这里需要注意一点，我们应该确保即使多次调用 useForm 也只会生成一个 form 实例，所以稍微改造一下 useForm：

```jsx
export default function useForm(form) {
  const formRef = React.useRef();

  if (!formRef.current) {
    // formStore 在整个生命周期中只能初始化一次，否则每次更新去初始化，那每次初始化前表单变更的数据都会丢失
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
```

form 实例通过 context 方式传递下去了，子组件 Field 中需要获取：

```jsx
import React, { Component } from 'react';
import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name), // "otz", // get(name) store
      onChange: (e) => {
        const newVal = e.target.value;
        console.log('onChange: ', newVal)
        setFieldsValue({ [name]: newVal });
      },
    };
  };

  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
```

输入文字可以看到 onChange 事件有效了，只是 Input 数据未显示正确，formStore 内部状态已变化，只是组件未根据 store 状态更新。

接下来目标就是在 formStore 中 setFieldsValue 时触发对应的组件更新函数，要实现这个目标就要在 Field 组件上实现 onStoreChange 函数，并在组件初始化时挂载到 formStore 上。

```jsx
class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    this.unregister = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  // ...
}
```

```jsx
class FormStore {
  constructor() {
    this.store = {};
    // 开辟一个空间存储Fields
    this.fieldEntities = [];
  }

  // 订阅和取消订阅，监听和取消监听要成对出现
  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    // 返回取消监听函数（组件卸载时删除监听函数，以免内存泄漏）
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setFieldsValue = (newStore) => {
    // 1. 更新store
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 2. 更新组件（只会更新对应的 Field 组件）
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  getForm = () => {
    return {
      setFieldEntities: this.setFieldEntities,
      setFieldsValue: this.setFieldsValue,
      // ...
    };
  };
}
```

进一步完善 FormStore：加上 validate 校验和 submit 提交：

```jsx
class FormStore {
  constructor() {
    this.store = {};
    // 开辟一个空间存储Fields
    this.fieldEntities = [];
    // Form 组件传入 onFinish, onFinishFailed，提交时执行
    this.callbacks = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  validate = () => {
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
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length > 0) {
      // 出错了
      onFinishFailed(err, this.getFieldsValue());
    } else {
      // 校验通过
      onFinish(this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      validate: this.validate,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
      // ...
    };
  };
}
```

submit 提交时需要执行 Form 组件传入的 onFinish, onFinishFailed，所以 Form 上应传入 onFinish 和 onFinishFailed 方法：

```jsx
export default function Form({ form, children, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);

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
```

上面的 MyRcFormPage 使用的是函数式组件，我们也需要兼容类组件方式的调用。此时 MyRcFormPage 不能使用 useForm 实例化 formInstance，也无法在 MyRcFormPage 内调用 formInstance 上的方法（初始化等）。可以使用`formRef = React.createRef()`，然后传递 ref 属性到 Form，这样就可以获取 Form 上的 formInstance

```jsx
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
```

使用`React.useImperativeHandle(ref, () => formInstance)`方法可以使父组件调用子组件的方法。对应的需要改造一下 index.jsx：const Form = React.forwardRef(_Form);
