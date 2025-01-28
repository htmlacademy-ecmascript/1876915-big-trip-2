import EventApiService from './event-api-service';
import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import HeaderPresenter from './presenter/header-presenter';
import { EventApi } from './const';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const model = new TripModel(new EventApiService(EventApi.END_POINT, EventApi.AUTHORIZATION));
model.init();

const header = new HeaderPresenter(tripInfoContainer, filtersContainer, model);
header.init();

const board = new BoardPresenter(contentContainer, tripInfoContainer, model);
board.init();

