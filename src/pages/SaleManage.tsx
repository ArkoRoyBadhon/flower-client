/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetAllFlowerQuery } from "../redux/features/flower/flowerApi";
import { useState } from "react";
import {
  colorOptions,
  fragranceOptions,
  occationOptions,
  sizeOptions,
  typeOptions,
} from "../components/flowerOptions";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { stateType } from "../types/addFlowerType";
import Pagination from "../utils/pagination";
import SaleModal from "../components/saleModal";
import { useAppSelector } from "../redux/hook";

const SaleManage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selectedColor, setSelectedColor] = useState<stateType | null>();
  const [selectedType, setSelectedType] = useState<stateType | null>();
  const [selectedSize, setSelectedSize] = useState<stateType | null>();
  const [selectedFragrance, setSelectedFragrance] =
    useState<stateType | null>();
  const [selectedOccation, setSelectedOccation] = useState<stateType | null>();
  const [selectedBloom, setSelectedBloom] = useState<any>("");
  const [pageNum, setPageNum] = useState("1");

  // for modals
  const [sellToggle, setSellToggle] = useState(false);
  const [flowerInfo, setFlowerInfo] = useState();

  const {
    data: flowerData,
    isLoading,
    isSuccess,
    error,
  } = useGetAllFlowerQuery({
    searchVal,
    selectedColor,
    selectedFragrance,
    selectedOccation,
    selectedSize,
    selectedType,
    selectedBloom,
    pageNum,
  });

  const handleSearch = () => {
    setSearchVal(searchValue);
  };

  const pageCount = Math.ceil(
    Number(flowerData?.data?.meta?.count) /
      Number(flowerData?.data?.meta?.limit)
  );

  const handlePageChange = (page: any) => {
    setPageNum(page);
  };

  return (
    <div className="p-5">
      <h1 className="text-[18px] font-bold text-green w-full">Manage Sale</h1>
      {!user.email ? (
        <div className="p-10">
          <h5 className="font-bold text-[24px]">
            Please Login to access this page!
          </h5>
        </div>
      ) : (
        <div className="">
          <div className="mt-5">
            <h4 className="">Filter</h4>
            <div className="">
              <div className="h-fit py-5">
                <div className="flex outline w-[400px] rounded-md outline-1 outline-light">
                  <input
                    className="w-full px-2 outline-none"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Search"
                  />
                  <p
                    onClick={() => handleSearch()}
                    className="bg-light px-2 py-1 rounded-r-md cursor-pointer hover:bg-deep hover:text-white transition-all ease-in"
                  >
                    Search
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 w-fit pt-5">
                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Color:</label>
                    <Select
                      name="color"
                      options={colorOptions}
                      isClearable={true}
                      onChange={(selectedOption) =>
                        setSelectedColor(selectedOption)
                      }
                      value={selectedColor}
                    />
                  </div>
                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Type:</label>
                    <Select
                      name="type"
                      options={typeOptions}
                      isClearable={true}
                      onChange={(selectedOption) =>
                        setSelectedType(selectedOption)
                      }
                      value={selectedType}
                    />
                  </div>
                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Size:</label>
                    <Select
                      name="size"
                      options={sizeOptions}
                      isClearable={true}
                      onChange={(selectedOption) =>
                        setSelectedSize(selectedOption)
                      }
                      value={selectedSize}
                    />
                  </div>
                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Fragrance:</label>
                    <Select
                      name="fragrance"
                      options={fragranceOptions}
                      isClearable={true}
                      onChange={(selectedOption) =>
                        setSelectedFragrance(selectedOption)
                      }
                      value={selectedFragrance}
                    />
                  </div>
                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Occation:</label>
                    <Select
                      name="occation"
                      options={occationOptions}
                      isClearable={true}
                      onChange={(selectedOption) =>
                        setSelectedOccation(selectedOption)
                      }
                      value={selectedOccation}
                    />
                  </div>

                  <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                    <label htmlFor="selectgender">Bloom Date:</label>
                    <DatePicker
                      showIcon
                      // minDate={new Date()}
                      onChange={(date) => setSelectedBloom(date)}
                      dateFormat="yyyy-MM-dd"
                      selected={selectedBloom ? new Date(selectedBloom) : null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {sellToggle && (
            <SaleModal setSellToggle={setSellToggle} flowerInfo={flowerInfo} />
          )}
          <div className="mt-5 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-x-10 gap-x-0">
            {flowerData?.data?.data?.map((item: any) => {
              return (
                <div
                  key={item?._id}
                  className="w-[300px] h-fit shadow-md rounded-md "
                >
                  <div className="w-full h-[50%] overflow-hidden">
                    <img
                      className="rounded-t-md w-full transition-transform transform hover:scale-110 h-[180px] bg-red-500"
                      src={item?.img}
                      alt="img"
                    />
                  </div>
                  <div className="p-3 text-[16px]">
                    <p className="font-semibold">{item?.name}</p>
                    <p className="">
                      <span className="font-semibold">Price: </span>{" "}
                      {item?.price}
                    </p>
                    <p className="">
                      <span className="font-semibold">Color: </span>{" "}
                      {item?.color}
                    </p>
                    <p className="">
                      <span className="font-semibold">Quantity: </span>
                      {item?.quantity}
                    </p>
                    <Link to={`/single-service/${item?._id}`} className="">
                      <div className="bg-gray-200 hover:bg-green px-3 py-1 mt-3 rounded-md w-full hover:text-white transition-all ease-in text-center">
                        View
                      </div>
                    </Link>
                    <div
                      onClick={() => {
                        setFlowerInfo(item);
                        setSellToggle(true);
                      }}
                      className="bg-gray-200 hover:bg-green px-3 py-1 mt-3 rounded-md w-full hover:text-white transition-all ease-in text-center"
                    >
                      Sell
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <div className="flex justify-center">
              <Pagination
                totalPages={pageCount}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleManage;
