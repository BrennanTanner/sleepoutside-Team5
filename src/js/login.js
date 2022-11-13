import { loadHeaderFooter } from '../js/utils';
import Admin from '../js/admin';

loadHeaderFooter();
const myAdmin = new Admin('main');
myAdmin.showLogin();