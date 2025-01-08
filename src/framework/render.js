import AbstractView from './view/abstract-view.js';

/** @enum {string} Перечисление возможных позиций для отрисовки */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Функция для создания элемента на основе разметки
 * @param {string} template Разметка в виде строки
 * @returns {HTMLElement} Созданный элемент
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  if (newElement.firstElementChild === newElement.lastElementChild) {
    return newElement.firstElementChild;
  }

  throw new Error('Can\'t create component from several sibling elements');
}

/**
 * Функция для отрисовки элемента
 * @param {HTMLElement} container Элемент в котором будет отрисован компонент
 * @param {AbstractView} component Компонент, который должен был отрисован
 * @param {string} place Позиция компонента относительно контейнера. По умолчанию - `beforeend`
 */
function render(container, component, place = RenderPosition.BEFOREEND) {

  container = container instanceof AbstractView ? container.element : container;
  component = component instanceof AbstractView ? component.element : component;

  if (!((container instanceof Element) && (component instanceof Element))) {
    throw new Error('Container or component aren\'t instance of Element');
  }
  container.insertAdjacentElement(place, component);
}

/**
 * Функция для замены одного компонента на другой
 * @param {AbstractView} oldComponent Компонент, который нужно скрыть
 * @param {AbstractView} newComponent Компонент, который нужно показать
 */
function replace(oldComponent, newComponent) {
  if (!(oldComponent && newComponent)) {
    throw new Error('Can\'t replace non-existing elements');
  }

  const oldInstance = oldComponent instanceof AbstractView ? oldComponent.element : oldComponent;
  const newInstance = newComponent instanceof AbstractView ? newComponent.element : newComponent;

  if (!((oldInstance instanceof Element) && (newInstance instanceof Element))) {
    throw new Error('Can\'t replace non-Element instance');
  }

  oldInstance.replaceWith(newInstance);
}

/**
 * Функция для удаления компонента
 * @param {AbstractView} component Компонент, который нужно удалить
 */
function remove(component) {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
}

export { RenderPosition, createElement, render, replace, remove };
