/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllSaleQuery } from "../redux/features/sale/saleApi";
import { useAppSelector } from "../redux/hook";

const SaleHistory = () => {
  const { user } = useAppSelector((state) => state.user);
  const [saleHistory, setSaleHistory] = useState("all");
  const {
    data: saleData,
    isLoading,
  } = useGetAllSaleQuery({
    saleHistory,
  });

  // console.log("SS",saleData?.data?.data);
  

  return (
    <div className="p-10">
      <h2 className="text-[24px] font-bold text-green w-full">Sale History</h2>
      {!user?.email ? (
        <div className="p-10">
          <h5 className="font-bold text-[24px]">
            Please Login to access this page!
          </h5>
        </div>
      ) : (
        <>
          <div className="my-5">
            <h6 className="mb-2">Filter</h6>
            <select
              onChange={(e) => setSaleHistory(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="all">All Time</option>
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="mt-5 min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Seller Name</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              {isLoading && <div className="w-full h-[100px] flex justify-center items-center">Loading...</div>}
              <tbody>
                {(saleData?.data?.data.length > 0) ?
                // <div className="">adat</div>
                  saleData?.data?.data.map((item: any) => {
                    return (
                      <tr key={item?._id}>
                        <td className="py-2 px-4 border-b">
                          {item?.flower_name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {item?.seller_name}
                        </td>
                        <td className="py-2 px-4 border-b">{item?.quantity}</td>
                        <td className="py-2 px-4 border-b flex gap-2">
                          {item?.sell_date}
                        </td>
                      </tr>
                    );
                  })
                  :
                  <div className="py-10">
                    <h2 className="text-center font-semibold">No Data Found</h2>
                  </div>
                  }
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SaleHistory;
