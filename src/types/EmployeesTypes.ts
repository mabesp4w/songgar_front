/** @format */

import MajorsTypes from "./MajorsTypes";

// employees
interface EmployeesTypes {
  id: string | number;
  major_id: string;
  NIP?: string | number;
  nm_employee: string;
  jabatan: string;
  gender: string;
  phone: string;
  hire_date: string | Date;
  img_employee: string;
  birthdate: string | Date;
  address: string;
  status: string;
  major: MajorsTypes;
}

export default EmployeesTypes;
