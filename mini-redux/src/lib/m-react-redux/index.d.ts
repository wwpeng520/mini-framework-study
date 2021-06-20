import * as React from 'react';

export function connect(mapStateToProps?: any, mapDispatchToProps?: any): any;

interface ProviderProps {
  store: any;
}

export class Provider extends React.Component<ProviderProps, any> {}
