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

export const replace = (oldComponent, newComponent) => {
  if (!(oldComponent && newComponent)) {
    throw new Error('Can\'t replace non-existing elements');
  }

  const oldInstance = oldComponent instanceof AbstractView ? oldComponent.element : oldComponent;
  const newInstance = newComponent instanceof AbstractView ? newComponent.element : newComponent;

  if (!((oldInstance instanceof Element) && (newInstance instanceof Element))) {
    throw new Error('Can\'t replace non-Element instance');
  }

  oldInstance.replaceWith(newInstance);
};
