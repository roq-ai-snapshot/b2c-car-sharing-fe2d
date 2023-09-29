import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DashboardInterface {
  id?: string;
  company_id: string;
  user_id: string;
  last_logged_in?: any;
  total_bookings?: number;
  total_cars?: number;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DashboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  user_id?: string;
}
