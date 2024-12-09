import AbstractView from './view/abstract-view.js';

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function render(container, component, place = RenderPosition.BEFOREEND) {

  container = container instanceof AbstractView ? container.element : container;
  component = component instanceof AbstractView ? component.element : component;

  if (!((container instanceof Element) && (component instanceof Element))) {
    throw new Error('Container or component aren\'t instance of Element');
  }
  container.insertAdjacentElement(place, component);
}
