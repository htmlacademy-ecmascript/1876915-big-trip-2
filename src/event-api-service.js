import { Method } from './const';
import ApiService from './framework/api-service';

export default class EventApiService extends ApiService {

  async getTripData() {
    const data = await Promise.all([
      this._load({ url: 'points' }),
      this._load({ url: 'offers' }),
      this._load({ url: 'destinations' })
    ]).then((response) => response.map(ApiService.parseResponse));

    const result = [];
    for await (const item of data) {
      result.push(item);
    }

    return result;
  }

  async createEvent(event) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event, true)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer = (event, isCreation = false) => {
    const adaptedEvent = {
      id: event.id,
      'base_price': +event.basePrice,
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      destination: event.destinationId,
      'is_favorite': event.isFavorite,
      offers: event.offerIds,
      type: event.type,
    };

    if (isCreation) {
      delete adaptedEvent.id;
    }

    return adaptedEvent;
  };
}
