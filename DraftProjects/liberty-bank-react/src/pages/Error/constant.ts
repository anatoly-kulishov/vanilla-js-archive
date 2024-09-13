interface ErrorObject {
  id: number;
  status: string;
  width: string;
  height: string;
}

export const DataError: ErrorObject[] = [
  { id: 1, status: '400', width: '247', height: '200' },
  { id: 2, status: '401', width: '392', height: '293' },
  { id: 3, status: '403', width: '268', height: '200' },
  { id: 4, status: '404', width: '268', height: '200' },
  { id: 5, status: '405', width: '283', height: '244' },
  { id: 6, status: '408', width: '324', height: '280' },
  { id: 7, status: '429', width: '251', height: '220' },
  { id: 8, status: '500', width: '264', height: '200' },
  { id: 9, status: '503', width: '227', height: '200' },
];
