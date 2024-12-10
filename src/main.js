import RouteFiltersPresenter from './presenter/route-filters-presenter';
import RouteDeskPresenter from './presenter/route-desk-presenter';
import TripSummaryPresenter from './presenter/trip-summary-presenter';

const tripSummaryContainer = document.querySelector('.trip-main');
const filtersContainer = tripSummaryContainer.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');


const tripSummary = new TripSummaryPresenter(tripSummaryContainer);
tripSummary.init();

const routeFilters = new RouteFiltersPresenter(filtersContainer);
routeFilters.init();

const routeDesk = new RouteDeskPresenter(contentContainer);
routeDesk.init();

