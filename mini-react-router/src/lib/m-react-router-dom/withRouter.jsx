import RouterContext from './RouterContext';

const withRouter = (WrapperCmp) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => {
        return <WrapperCmp {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;
