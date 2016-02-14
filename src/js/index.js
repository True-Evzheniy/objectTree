import { dataTree } from './defaultTree';
import Tree from './Tree';

const target = document.getElementById('container');
const tree = new Tree(dataTree, target);
tree.init();
