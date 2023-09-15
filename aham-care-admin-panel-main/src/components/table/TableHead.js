const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'place', label: 'Place', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

const REQUIREMENT_HEAD = [
  {
    id: 'item',
    disablePadding: true,
    label: 'Item Name',
  },
  {
    id: 'requirement',
    disablePadding: false,
    label: 'Requirement',
  },

  {
    id: 'price',
    disablePadding: false,
    label: 'Total Price',
  },
  {
    id: 'needs',
    disablePadding: false,
    label: 'Balance Requirement',
  },
];

module.exports = { TABLE_HEAD, REQUIREMENT_HEAD };
