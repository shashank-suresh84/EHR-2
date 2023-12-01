"use client";
import React, { useEffect, useState, useContext } from "react";
import { Contract, ethers } from "ethers";
import { NEW_DOCTRO_CONTRACT_ADDRESS, doctor_abi } from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";
const Page = () => {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);

  const getAppointments = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const response = await doctorContract.getRecievedFiles(signer.address);
      console.log(response);
      // arrangeData(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div className=" min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="font-bold">{item[2]?.split(" ")[0]}</div>
                </td>
                <td>{item[2]?.split(" ")[1]}:00</td>
                <td>{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
