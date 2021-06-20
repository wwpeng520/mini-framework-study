import { connect } from '../lib/m-react-redux';
import { IStoreProps } from '../store/interface';

interface IProps {
  count: number;
}
function CountChild({ count }: IProps) {
  console.log('CountChild');
  return <div>CountChild: {count}</div>;
}

export default connect(({ count }: IStoreProps) => ({ count }))(CountChild);
