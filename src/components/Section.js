export class Section {
  constructor({items, renderer}, selector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }
  renderItems() {
    this.items.forEach(item => this.renderer(item));
  }
  addItem(element) {
    this.container.append(element);
  }
}
