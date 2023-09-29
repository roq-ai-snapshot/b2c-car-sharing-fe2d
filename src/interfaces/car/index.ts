import { BookingInterface } from 'interfaces/booking';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  model: string;
  make: string;
  year: number;
  color: string;
  license_plate: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  company?: CompanyInterface;
  _count?: {
    booking?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  model?: string;
  make?: string;
  color?: string;
  license_plate?: string;
  company_id?: string;
}
