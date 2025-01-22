enum EventType {
  Taxi, Bus, Train, Ship, Drive, Flight, CheckIn, Sightseeing, Restaurant
};

type Id = string;

type Picture = {
  src: string;
  description: string;
};

type Destination = {
  id: string;
  description: string;
  name: string;
  pictures: Picture[];
};

type Offer = {
  id: string;
  title: string;
  price: number
  isChecked: boolean;
}

type RawOffers = [
  {
    type: EventType;
    offers: Offer[];
  }
];

type RawEvent = {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Id;
  is_favorite: boolean;
  offers: Id[];
  type: EventType;
};

type TripEvent = {
  id: string;
  basePrice: number;
  dateFrom: string;
  dateTo: string;
  destinationId: Id;
  isFavorite: boolean;
  offerIds: Id[];
  type: EventType;
};
