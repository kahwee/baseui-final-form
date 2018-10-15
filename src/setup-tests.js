/* eslint-env node */
// @noflow
import 'jest-extended';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()});
