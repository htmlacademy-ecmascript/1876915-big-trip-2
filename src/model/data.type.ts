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

type OfferList = [
  {
    type: EventType;
    offers: Offer[];
  }
];

type RawEvent = {
  id: string;
  basePrice: number;
  dateFrom: string;
  dateTo: string;
  destination: Id;
  isFavorite: boolean;
  offers: Id[];
  type: EventType;
};

type TripEvent = {
  id: string;
  basePrice: number;
  dateFrom: string;
  dateTo: string;
  destination: Destination;
  isFavorite: boolean;
  offers: Offer[];
  type: EventType;
};
