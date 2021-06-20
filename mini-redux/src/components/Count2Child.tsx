import { connect } from '../lib/m-react-redux';
import { IStoreProps } from '../store/interface';

interface IProps {
  num: number;
}
function Count2Child({ num }: IProps) {
  console.log('Count2Child');
  return <div>Count2Child: {num}</div>;
}

export default connect(({ count2 }: IStoreProps) => ({ num: count2.num }))(Count2Child);
