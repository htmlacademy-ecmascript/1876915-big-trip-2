import { Method } from './const';
import ApiService from './framework/api-service';

export default class EventApiService extends ApiService {
  get events() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  async updateTask(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }


  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      offers: event.offerIds,
      destination: event.destinationId,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.offerIds;
    delete adaptedEvent.destinationId;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
