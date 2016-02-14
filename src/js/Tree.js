export default class Tree {
  constructor(data, container) {
    this.dataTree = data;
    this.container = container;
  }

  isEmpty(obj) {
    return !Object.keys(obj).length;
  }

  createTree(obj, box) {
    const container = document.createElement('div');
    container.classList.add('tree__container');
    box.appendChild(container).appendChild(this.createTreeDOM(obj));
  }

  createItem(key) {
    const li = document.createElement('li');
    const item = document.createElement('div');
    const panel = document.createElement('div');
    panel.classList.add('tree__panel');
    const add = document.createElement('i');
    add.classList.add('tree__add');
    const rm = document.createElement('i');
    rm.classList.add('tree__rm');
    const edit = document.createElement('i');
    edit.classList.add('tree__edit');
    item.classList.add('tree__item');
    const expand = document.createElement('div');
    expand.classList.add('tree__expand');
    const content = document.createElement('div');
    content.classList.add('tree__content');
    li.appendChild(item).appendChild(expand);
    item.appendChild(content);
    panel.appendChild(add);
    panel.appendChild(edit);
    panel.appendChild(rm);
    item.appendChild(panel);
    content.innerHTML = key;
    return li;
  }

  createTreeDOM(obj) {
    if (this.isEmpty(obj)) return;
    const ul = document.createElement('ul');

    Object.keys(obj).map(key => {
      const li = this.createItem(key);
      const childrenUl = this.createTreeDOM(obj[key]);
      if (childrenUl) {
        const expand = li.getElementsByClassName('tree__expand')[0];
        expand.classList.add('tree__expand--minus');
        li.appendChild(childrenUl);
      }
      ul.appendChild(li);
    });

    return ul;
  }

  init() {
    this.createTree(this.dataTree, this.container);
    this.container.addEventListener('click', (e) => {
      if(!e.target.classList.contains('tree__expand') || !e.target.parentNode.nextSibling) return;
      if(e.target.classList.contains('tree__expand--plus')) {
        e.target.classList.remove('tree__expand--plus');
        e.target.classList.add('tree__expand--minus');
      } else {
        e.target.classList.remove('tree__expand--minus');
        e.target.classList.add('tree__expand--plus');
      }
      e.target.parentNode.nextSibling.classList.toggle('tree__hidden');
    });

    const arrItems = [].slice.call(this.container.querySelectorAll('.tree__item'));
    arrItems.map((item, i) => {
      arrItems[i].style.paddingLeft = this.getPadding(item);
    });

    this.container.addEventListener('click', (e) => {
      const target = e.target;
      if(!target.classList.contains('tree__add')) return;
      const item = target.closest('.tree__item');
      const name = prompt('Имя нового элемента');
      this.createChildItem(item, name);
    });
  }

  getPadding(item) {
    let count = 0;
    while (item.parentNode !== this.container) {
      count ++;
      item = item.parentNode;
    }
    return `${count * 10}px`;
  }

  createChildItem(treeItem, nameNewChildItem) {
    const li = treeItem.parentNode;
    if (li.lastElementChild.tagName !== 'UL') {
      treeItem.children[0].classList.add('tree__expand--minus');
      const ul = document.createElement('UL');
      const newElem = this.createItem(nameNewChildItem);
      ul.appendChild(newElem);
      li.appendChild(ul);
      newElem.children[0].style.paddingLeft = this.getPadding(newElem.children[0]);
    } else {
      // debugger;
      const newElem = this.createItem(nameNewChildItem);
      li.lastElementChild.appendChild(newElem);
      newElem.children[0].style.paddingLeft = this.getPadding(newElem.children[0]);
    }
  }
}
