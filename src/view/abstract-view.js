export default class AbstractView {
  #element = null;
  #eventList = new Map(); // {key:element, value: [[eventType, eventHandler], ...]

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, class instance only');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = this.createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template()');
  }

  #getElementBySelector = (selector) => {
    const selectedElement = (selector instanceof Element) ? selector : this.element?.querySelector(selector);
    if (!(selectedElement instanceof Element)) {
      throw new Error('Unable to create/remove event listener for non DOM Element');
    }

    return selectedElement;
  };

  createElement = (template) => {
    if (typeof (template) === 'string') {
      const element = document.createElement('div');
      element.innerHTML = template;

      if (element.firstElementChild === element.lastElementChild) {

        return element.firstElementChild;
      }

      throw new Error('Can\'t create component from several sibling elements');
    }

    return null;
  };

  removeElement() {
    if (!this.#element) {
      return;
    }

    this.removeEventListeners();
    this.#element.remove();
    this.#element = null;
  }

  createEventListener = (selector, eventType, callback, options) => {

    const { isPreventDefault = false, isStopPropagation = false, eventOptions } = Object.assign({}, options);

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

  removeEventListeners = () => {
    for (const [elementSelector, handlers] of this.#eventList.entries()) {
      handlers.forEach(([eventType, eventHandler]) => elementSelector.removeEventListener(eventType, eventHandler));
    }
    this.#eventList.clear();
  };
}
