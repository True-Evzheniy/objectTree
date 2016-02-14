export default class Tree{
  constructor(data, container) {
    this.dataTree = data;
    this.container = container;
  };

  isEmpty(obj) {
    return !Object.keys(obj).length;
  }

  createTree(obj, box) {
    box.appendChild(this.createTreeDOM(obj));
  }

  createTreeDOM(obj) {
    if (this.isEmpty(obj)) return;
    let ul = document.createElement('ul');

    Object.keys(obj).map(key => {
      let li, expand, content,item;
      li = document.createElement('li');
      item = document.createElement('div');
      item.classList.add('tree__item');
      expand = document.createElement('div');
      expand.classList.add('tree__expand');
      content = document.createElement('div');
      content.classList.add('tree__content');
      li.appendChild(item).appendChild(expand);
      item.appendChild(content);
      content.innerHTML = key;
      const childrenUl = this.createTreeDOM(obj[key]);
      if (childrenUl) {
        expand.classList.add('tree__expand--minus');
        li.appendChild(childrenUl);
      }
      ul.appendChild(li);
    });

    return ul;
  };

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
      e.target.parentNode.nextSibling.classList.toggle('hidden');
    });

    let arrItems = [].slice.call(this.container.querySelectorAll('.tree__item'));
    arrItems.map((item, i) => {
      let count = 0;
      while (item.parentNode != this.container) {
        count ++;
        item = item.parentNode;
      }
      arrItems[i].style.paddingLeft = 10 * count + 'px';
    });
  }
}