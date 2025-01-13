const points = [
  {
    id: '8220b3c4-7c8b-43b9-a36c-87860c29a201',
    basePrice: 7863,
    dateFrom: '2024-12-03T11:14:08.471Z',
    dateTo: '2024-12-05T04:59:08.471Z',
    destinationId: '82a3bad6-6498-4989-ae4f-815082508c30',
    isFavorite: false,
    offerIds: [],
    type: 'sightseeing'
  },
  {
    id: '7bd944c8-0d45-426b-aaf7-a87f096e8c53',
    basePrice: 67,
    dateFrom: '2024-12-06T08:46:08.471Z',
    dateTo: '2024-12-06T16:52:08.471Z',
    destinationId: '070ea513-2210-42df-bad4-ede76ba22a3e',
    isFavorite: false,
    offerIds: [
      '89b4eb84-3d09-475f-814a-879bcf96a900',
      'd1d46527-003a-43e2-a3c1-714db831a54e'
    ],
    type: 'restaurant'
  },
  {
    id: '33280e36-1490-4a7a-b497-d2c0e38f5442',
    basePrice: 3087,
    dateFrom: '2024-12-07T04:06:08.471Z',
    dateTo: '2024-12-09T00:49:08.471Z',
    destinationId: '466c2985-2db8-47fa-85e4-0d07cb9e48fe',
    isFavorite: true,
    offerIds: [],
    type: 'sightseeing'
  },
  {
    id: '939e4b88-b4d0-49e7-97bb-3544cc12e1a1',
    basePrice: 2921,
    dateFrom: '2024-12-09T14:04:08.471Z',
    dateTo: '2024-12-10T12:35:08.471Z',
    destinationId: 'ec9110f7-4767-4179-b856-5d8bb23324ec',
    isFavorite: false,
    offerIds: [],
    type: 'sightseeing'
  },
  {
    id: '8319ffe9-6f6b-4fc7-bc7e-6266c4ac0fab',
    basePrice: 1499,
    dateFrom: '2024-12-10T18:44:08.471Z',
    dateTo: '2024-12-12T16:09:08.471Z',
    destinationId: 'e4bc89ed-4df2-40a4-b8d1-21b953502799',
    isFavorite: true,
    offerIds: [
      '35aa9a64-dbfd-4059-bb77-117e839bfcc2',
      '0a72ec19-d026-4a7b-9158-f00431ff883f',
      '1ca8aa30-0131-4b9f-956a-b7f90d2bf6a8',
      '00fdf487-91f5-4175-97cc-4b8cf30240a0',
      '6e21cc5e-e5ef-453d-a401-86846f294d02'
    ],
    type: 'ship'
  },
  {
    id: 'b4fae42a-bfa8-48eb-8b53-c01c591185b6',
    basePrice: 1350,
    dateFrom: '2024-12-13T19:10:08.471Z',
    dateTo: '2024-12-15T17:23:08.471Z',
    destinationId: '64a8701c-632e-48ae-9052-353c1a3465df',
    isFavorite: false,
    offerIds: [
      '199e8e51-dc14-4795-9638-5f707452da51'
    ],
    type: 'bus'
  },
  {
    id: '58bae41c-eb1d-4ef5-ac46-b22681b052b1',
    basePrice: 3905,
    dateFrom: '2024-12-17T11:38:08.471Z',
    dateTo: '2024-12-17T21:26:08.471Z',
    destinationId: '82a3bad6-6498-4989-ae4f-815082508c30',
    isFavorite: false,
    offerIds: [
      '73522a17-f05d-49b9-a141-5ebccae6fb24',
      'd658acef-46f7-4c88-b7ed-df131ffabe0c',
      '4a956f99-a055-4143-969f-b29f2be5da50'
    ],
    type: 'check-in'
  },
  {
    id: 'ab96a7c9-cd35-4ae0-8ca6-33e50c3376a5',
    basePrice: 8353,
    dateFrom: '2024-12-19T14:12:08.471Z',
    dateTo: '2024-12-21T11:32:08.471Z',
    destinationId: 'c7fcf894-e8ef-4347-94cf-8c76aa6c6833',
    isFavorite: false,
    offerIds: [
      'd1d46527-003a-43e2-a3c1-714db831a54e'
    ],
    type: 'restaurant'
  },
  {
    id: 'bcc01238-cfd9-4432-b53e-fcea1b958e08',
    basePrice: 330,
    dateFrom: '2024-12-21T23:11:08.471Z',
    dateTo: '2024-12-23T20:10:08.471Z',
    destinationId: 'ec9110f7-4767-4179-b856-5d8bb23324ec',
    isFavorite: false,
    offerIds: [
      'd82abaa6-4c4e-4bb4-a49d-83e80c37cdd5'
    ],
    type: 'drive'
  },
  {
    id: '91214a0f-dec3-4402-873c-a66f63a024f4',
    basePrice: 1387,
    dateFrom: '2024-12-25T07:41:08.471Z',
    dateTo: '2024-12-27T08:06:08.471Z',
    destinationId: '82a3bad6-6498-4989-ae4f-815082508c30',
    isFavorite: false,
    offerIds: [],
    type: 'bus'
  },
  {
    id: 'fc4b109b-7a99-444d-a583-caa344411cb8',
    basePrice: 12,
    dateFrom: '2024-12-27T21:44:08.471Z',
    dateTo: '2024-12-29T10:43:08.471Z',
    destinationId: 'ec9110f7-4767-4179-b856-5d8bb23324ec',
    isFavorite: false,
    offerIds: [
      'e3dbdc12-23b8-453f-afd1-e0dcb281bf7a',
      '56b72afa-d7d0-4dab-9d80-e64a2442783e',
      '73522a17-f05d-49b9-a141-5ebccae6fb24',
      'd658acef-46f7-4c88-b7ed-df131ffabe0c',
      '4a956f99-a055-4143-969f-b29f2be5da50'
    ],
    type: 'check-in'
  },
  {
    id: '0de5090a-72e9-418b-89b0-5926aea97d4a',
    basePrice: 4884,
    dateFrom: '2024-12-31T10:15:08.471Z',
    dateTo: '2025-01-01T23:58:08.471Z',
    destinationId: '82a3bad6-6498-4989-ae4f-815082508c30',
    isFavorite: false,
    offerIds: [],
    type: 'drive'
  },
  {
    id: '4df8e4e0-bbca-4b72-91c3-ef2654b4d60f',
    basePrice: 6597,
    dateFrom: '2025-01-02T10:15:08.471Z',
    dateTo: '2025-01-02T19:36:08.471Z',
    destinationId: '070ea513-2210-42df-bad4-ede76ba22a3e',
    isFavorite: false,
    offerIds: [
      '6e21cc5e-e5ef-453d-a401-86846f294d02'
    ],
    type: 'ship'
  },
  {
    id: 'da0271c3-fc37-4eaa-a2be-290c8903b02f',
    basePrice: 7863,
    dateFrom: '2025-01-03T22:15:08.471Z',
    dateTo: '2025-01-04T19:50:08.471Z',
    destinationId: 'fdd837e1-fd2d-463c-9a2d-555cf8efa89e',
    isFavorite: true,
    offerIds: [
      '5093df18-a4d0-42f7-b9cd-b6ef378563fa'
    ],
    type: 'train'
  },
  {
    id: '5a73c621-2544-4995-990e-3ffaf72464f9',
    basePrice: 9488,
    dateFrom: '2025-01-05T19:34:08.471Z',
    dateTo: '2025-01-06T16:19:08.471Z',
    destinationId: '466c2985-2db8-47fa-85e4-0d07cb9e48fe',
    isFavorite: false,
    offerIds: [
      'df01f087-8af8-4024-ade2-434e572a1939',
      '0690c5cc-879c-4aa5-80c1-244935547967',
      'bba6b2a4-115c-4470-9e70-bab52e7b6da9',
      '61a27c8e-492d-4194-8d09-c85e8fbc0ed2',
      '428136ce-b310-4e4e-bb3e-e09946178b81'
    ],
    type: 'taxi'
  },
  {
    id: 'cf1362d0-2e46-4f39-aa39-85e2c602b7e8',
    basePrice: 6644,
    dateFrom: '2025-01-08T06:43:08.471Z',
    dateTo: '2025-01-09T13:18:08.471Z',
    destinationId: '82a3bad6-6498-4989-ae4f-815082508c30',
    isFavorite: false,
    offerIds: [],
    type: 'sightseeing'
  },
  {
    id: 'c6b22ee7-7613-4853-8baf-291c479d879a',
    basePrice: 5731,
    dateFrom: '2025-01-10T14:06:08.471Z',
    dateTo: '2025-01-12T12:22:08.471Z',
    destinationId: '070ea513-2210-42df-bad4-ede76ba22a3e',
    isFavorite: true,
    offerIds: [
      '1021812a-82b3-4fb5-a657-51d6b005d366',
      '4dc8e801-b123-489e-816a-1b900e12d270',
      '151f488d-e03a-4347-8837-2e7171061983',
      '7511ff9e-227d-4732-9e27-d4cd1b78c220',
      '52cfccc0-c186-4dea-9fe4-b04528650af9'
    ],
    type: 'flight'
  },
  {
    id: '0e475bfd-d99a-412c-8270-efab3cfe7399',
    basePrice: 3306,
    dateFrom: '2025-01-14T04:58:08.471Z',
    dateTo: '2025-01-14T18:23:08.471Z',
    destinationId: 'ec9110f7-4767-4179-b856-5d8bb23324ec',
    isFavorite: true,
    offerIds: [
      '00fdf487-91f5-4175-97cc-4b8cf30240a0',
      '6e21cc5e-e5ef-453d-a401-86846f294d02'
    ],
    type: 'ship'
  },
  {
    id: '4402d983-2d5e-46da-8c96-3c06f2b24e51',
    basePrice: 1890,
    dateFrom: '2025-01-15T13:06:08.471Z',
    dateTo: '2025-01-16T01:26:08.471Z',
    destinationId: '070ea513-2210-42df-bad4-ede76ba22a3e',
    isFavorite: true,
    offerIds: [
      '61a27c8e-492d-4194-8d09-c85e8fbc0ed2',
      '428136ce-b310-4e4e-bb3e-e09946178b81'
    ],
    type: 'taxi'
  },
  {
    id: 'fdae4f8a-f63b-418c-8a92-2d4001eecad4',
    basePrice: 5102,
    dateFrom: '2025-01-17T17:21:08.471Z',
    dateTo: '2025-01-19T05:47:08.471Z',
    destinationId: 'ec9110f7-4767-4179-b856-5d8bb23324ec',
    isFavorite: true,
    offerIds: [
      '56b72afa-d7d0-4dab-9d80-e64a2442783e',
      '73522a17-f05d-49b9-a141-5ebccae6fb24',
      'd658acef-46f7-4c88-b7ed-df131ffabe0c',
      '4a956f99-a055-4143-969f-b29f2be5da50'
    ],
    type: 'check-in'
  },
  {
    id: '59a69467-c2cc-45d2-bde2-10cb698e7260',
    basePrice: 2276,
    dateFrom: '2025-01-21T04:56:08.471Z',
    dateTo: '2025-01-22T00:39:08.471Z',
    destinationId: 'c7fcf894-e8ef-4347-94cf-8c76aa6c6833',
    isFavorite: false,
    offerIds: [
      '7511ff9e-227d-4732-9e27-d4cd1b78c220',
      '52cfccc0-c186-4dea-9fe4-b04528650af9'
    ],
    type: 'flight'
  },
  {
    id: 'f7737a0d-3124-49eb-8487-d16d1c690d42',
    basePrice: 1237,
    dateFrom: '2025-01-22T22:40:08.471Z',
    dateTo: '2025-01-24T16:43:08.471Z',
    destinationId: '64a8701c-632e-48ae-9052-353c1a3465df',
    isFavorite: false,
    offerIds: [
      '6e21cc5e-e5ef-453d-a401-86846f294d02'
    ],
    type: 'ship'
  },
  {
    id: '73edeee1-d1fe-4371-a2f3-1012eaef876f',
    basePrice: 2489,
    dateFrom: '2025-01-26T06:26:08.471Z',
    dateTo: '2025-01-27T18:41:08.471Z',
    destinationId: 'fdd837e1-fd2d-463c-9a2d-555cf8efa89e',
    isFavorite: true,
    offerIds: [
      '151f488d-e03a-4347-8837-2e7171061983',
      '7511ff9e-227d-4732-9e27-d4cd1b78c220',
      '52cfccc0-c186-4dea-9fe4-b04528650af9'
    ],
    type: 'flight'
  },
  {
    id: '3a88f1e1-5926-43aa-aa65-be250ff0947f',
    basePrice: 5807,
    dateFrom: '2025-01-28T23:33:08.471Z',
    dateTo: '2025-01-30T12:51:08.471Z',
    destinationId: 'e4bc89ed-4df2-40a4-b8d1-21b953502799',
    isFavorite: true,
    offerIds: [
      '4dc8e801-b123-489e-816a-1b900e12d270',
      '151f488d-e03a-4347-8837-2e7171061983',
      '7511ff9e-227d-4732-9e27-d4cd1b78c220',
      '52cfccc0-c186-4dea-9fe4-b04528650af9'
    ],
    type: 'flight'
  },
  {
    id: '413b04c2-c606-48f9-b0b7-d2a062bbbf6a',
    basePrice: 7758,
    dateFrom: '2025-01-31T09:26:08.471Z',
    dateTo: '2025-02-02T04:15:08.471Z',
    destinationId: '64a8701c-632e-48ae-9052-353c1a3465df',
    isFavorite: true,
    offerIds: [
      '4a956f99-a055-4143-969f-b29f2be5da50'
    ],
    type: 'check-in'
  }
];

export const getPointMocks = () => points;
