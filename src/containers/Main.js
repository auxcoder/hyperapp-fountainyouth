import { h } from 'hyperapp';
import Type from '../components/Type';
import Logo from '../components/Logo';
import Address from '../components/Address';

/**
 * first object in the store is 'state' (an object - {})
 * second object in the store is 'actions' (an object - {})
 * here we destructure what is needed
 * 'num' from 'state' and 'add'/'sub' from 'actions'
 */
export default () => (
  <div className="container">
    <div className="mx-auto text-center" id="logoType">
      <Logo />
      <Type />
      <Address />
    </div>
  </div>
);
