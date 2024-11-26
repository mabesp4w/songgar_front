/** @format */

import ModalDefault from "@/components/modal/ModalDefault";
import EmployeesTypes from "@/types/EmployeesTypes";
import { momentId } from "@/utils/momentIndonesia";
import { FC, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
// employees
type Props = {
  dtEmployees: EmployeesTypes;
};

const Costume: FC<Props> = ({ dtEmployees }) => {
  const [showModal, setShowModal] = useState(false);
  // store
  const handleClick = async () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <BsInfoCircleFill
        className="text-xl cursor-pointer"
        onClick={handleClick}
      />
      <ModalDefault
        title={`Detail ${dtEmployees.nm_employee}`}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <table className="mb-4">
          <tbody>
            <tr>
              <td>Tgl. Mulai Bekerja</td>
              <td className="px-2">:</td>
              <td>{momentId(dtEmployees.hire_date).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <td>No. HP</td>
              <td className="px-2">:</td>
              <td>{dtEmployees.phone}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td className="px-2">:</td>
              <td>{dtEmployees.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className="px-2">:</td>
              <td>{dtEmployees.status}</td>
            </tr>
          </tbody>
        </table>
      </ModalDefault>
    </>
  );
};

export default Costume;
