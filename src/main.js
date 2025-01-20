import EventApiService from './event-api-service';
import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import HeaderPresenter from './presenter/header-presenter';

const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const model = new TripModel(new EventApiService(END_POINT, AUTHORIZATION));
await model.init();

const header = new HeaderPresenter(tripInfoContainer, filtersContainer, model);
header.init();

const board = new BoardPresenter(contentContainer, tripInfoContainer, model);
board.init();
