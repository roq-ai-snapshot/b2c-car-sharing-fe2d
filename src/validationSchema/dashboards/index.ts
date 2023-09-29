import * as yup from 'yup';

export const dashboardValidationSchema = yup.object().shape({
  last_logged_in: yup.date().nullable(),
  total_bookings: yup.number().integer().nullable(),
  total_cars: yup.number().integer().nullable(),
  company_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
