import FiltersPresenter from './presenter/filters-presenter';
import RouteListPresenter from './presenter/route-list-presenter';
import SortPresenter from './presenter/sort-presenter';
import TripSummaryPresenter from './presenter/trip-summary-presenter';

const tripSummaryContainer = document.querySelector('.trip-main');
const filtersContainer = tripSummaryContainer.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');


const tripSummary = new TripSummaryPresenter(tripSummaryContainer);
tripSummary.init();

const routeFilters = new FiltersPresenter(filtersContainer);
routeFilters.init();

const routesSort = new SortPresenter(contentContainer);
routesSort.init();

const routeDesk = new RouteListPresenter(contentContainer);
routeDesk.init();

