export class Section{ 
  constructor({renderer}, containerSelector) { 
    //Создание и отрисовка данных на странице 
    this._renderer = renderer;  
    //Контейнер, куда будут добавляться наши элементы 
    this._container = document.querySelector(containerSelector); 
  } 

 

//Метод для отрисовки массива с картами на странице 
  renderItems(items) { 
    items.forEach(item => this._renderer(item)); 
  } 

//Метод для вставки карт 
  addItem(item) { 
    this._container.prepend(item); 
  } 
} 