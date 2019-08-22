import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({
  paymentInit: ['payload'],
});

export const PaymentTypes = Types;
export default Creators;
