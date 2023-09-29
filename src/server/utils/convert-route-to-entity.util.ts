const mapping: Record<string, string> = {
  bookings: 'booking',
  cars: 'car',
  companies: 'company',
  dashboards: 'dashboard',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
