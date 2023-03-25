export class Section{
  constructor({items, renderer}, containerSelector) {
    //Массив данных
    this._items = items; 
    //Создание и отрисовка данных на странице
    this._renderer = renderer; 
    //Контейнер, куда будут добавляться наши элементы
    this._container = document.querySelector(containerSelector);
  }

//Метод для отрисовки массива с картами на странице
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

//Метод для вставки карт
  addItem(item) {
    this._container.prepend(item);
  }
}