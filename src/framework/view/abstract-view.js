import { createElement } from '../render.js';
import './abstract-view.css';

/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * Абстрактный класс представления
 */
export default class AbstractView {
  /** @type {HTMLElement|null} Элемент представления */
  #element = null;

  /** @type {Map<HTMLElement, [[string, Function]]>} {key:element, value: [[eventType, eventHandler], ...]}*/
  #eventList = new Map();

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  /**
   * Геттер для получения разметки элемента
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  /**
   * Метод для получения DOM элемента по селектору
   * @param {string | HTMLElement} selector Строковый селектор или элемент
   * @returns {HTMLElement} Выбранный элемент
  */
  #getElementBySelector = (selector) => {
    const selectedElement = (selector instanceof Element) ? selector : this.element?.querySelector(selector);
    if (!(selectedElement instanceof Element)) {
      throw new Error('Unable to create/remove event listener for non DOM Element');
    }

    return selectedElement;
  };

  /**
   * Метод для установки обработчика событий элемента
   * @param {string | HTMLElement} selector Строковый селектор или элемент
   * @param {string} eventType Тип события
   * @param {Function} callback Обработчик события
   * @param {Object} options Опции для обработчика события
  */
  createEventListener = (selector, eventType, callback, options) => {

    const { isPreventDefault = false, isStopPropagation = false, eventOptions } = options || {};

    if (typeof (callback) !== 'function') {
      throw new Error('Argument "callback" is not a function');
    }

    const element = this.#getElementBySelector(selector);
    const eventHandler = (evt) => {
      if (isPreventDefault) {
        evt.preventDefault();
      }

      if (isStopPropagation) {
        evt.stopPropagation();
      }

      callback(evt);
    };

    const elementHandlers = this.#eventList.get(element) || [];
    const isHandlerExist = elementHandlers.some(([type, handler]) => (type === eventType) && (handler === callback));

    if (!isHandlerExist) {
      elementHandlers.push([eventType, callback]);
      this.#eventList.set(element, elementHandlers);
      element.addEventListener(eventType, eventHandler, eventOptions);
    }
  };

  /** Метод для удаления обработчиков событий элемента */
  removeEventListeners = () => {
    for (const [elementSelector, handlers] of this.#eventList.entries()) {
      handlers.forEach(([eventType, eventHandler]) => elementSelector.removeEventListener(eventType, eventHandler));
    }
    this.#eventList.clear();
  };

  /** Метод для удаления элемента */
  removeElement() {
    this.removeEventListeners();
    this.#element = null;
  }

  /**
   * Метод, реализующий эффект "покачивания головой"
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */
