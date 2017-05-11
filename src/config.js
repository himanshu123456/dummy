const url = 'https://developers.zomato.com/api/v2.1/search?';
const apiKey = '96e021466e2bee68eed2609c7ca3d733';

export const zomatoUrl = function(q) {
  return `${url}q=${q.q}&entity_id=${q.entity_id}&entity_type=${q.entity_type}&start=${q.start}&count=${q.count}&sort=${q.sort}&order=${q.order}`;
}

export const header = {
  'user-key': apiKey
};

export const cities = [
  {
    id: 10,
    name: 'Jaipur',
  },
  {
    id: 5,
    name: 'Pune',
  },
  {
    id: 3,
    name: 'Mumbai',
  },
  {
    id: 1,
    name: 'Delhi NCR',
  },
  {
    id: 4,
    name: 'Banglore',
  },
  {
    id: 12,
    name: 'Chandigarh',
  },
]
