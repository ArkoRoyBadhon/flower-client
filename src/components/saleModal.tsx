/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateSaleMutation } from "../redux/features/sale/saleApi";
import { toast } from "react-toastify";
import {
  useDeleteFlowerMutation,
  useUpdateFlowerMutation,
} from "../redux/features/flower/flowerApi";

type saleType = {
  quantity: number;
  sell_date: Date;
  seller_name: string;
  flower_id: string;
};

const SaleModal = ({ setSellToggle, flowerInfo }: any) => {
  const [createSale, { isSuccess, error }] = useCreateSaleMutation();
  const [updateFlower] = useUpdateFlowerMutation();
  const [deleteFlower] = useDeleteFlowerMutation();

  const {
    control,
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<saleType>();

  const onSubmit: SubmitHandler<saleType> = async (data) => {
    if (data?.quantity >= 1 && data?.quantity <= flowerInfo.quantity) {
      const payload = {
        quantity: data?.quantity,
        seller_name: data?.seller_name,
        // sell_date: formattedDate || new Date().toISOString().split("T")[0],
        sell_date: data?.sell_date,
        flower_id: flowerInfo?._id,
      };

      const val = flowerInfo?.quantity - data?.quantity;

      console.log("form", payload);
      await createSale(payload);
      await updateFlower({
        id: flowerInfo?._id,
        flowerData: { quantity: val },
      });
      
      if (val === 0) {
        await deleteFlower(flowerInfo?._id)
      }
    } else {
      toast("Quantity do not less than 1 or not more than availability", {
        toastId: "error-sell-id",
      });
    }
  };

  if (isSuccess) {
    setSellToggle(false)
    toast("Flower Listed to sell", {
      toastId: "flower-sell",
    });
  }
  if (error) {
    toast("failed to sell", {
      toastId: "sell-error",
    });
  }

  return (
    <div className="fixed z-10 top-[100px] h-[80vh] bg-gray-200 shadow-md w-[60%] rounded-md overflow-hidden overflow-y-auto">
      <div className="flex justify-end">
        <div
          className="cursor-pointer
          px-2 py-1 bg-red-300 w-fit"
          onClick={() => setSellToggle(false)}
        >
          close
        </div>
      </div>
      <div className="px-10 py-5">
        <h4 className="text-[20px] font-semibold">Sell</h4>
        <div className="">
          <form
            className="w-full shadow-md p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mb-2">
              <label htmlFor="">Quantity</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="text"
                placeholder="Quantity"
                defaultValue={1}
                {...register("quantity", { required: true })}
              />
              <small className="">
                Available quantity: {flowerInfo.quantity}
              </small>
              {errors.quantity && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Seller Name</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="text"
                placeholder="Seller"
                {...register("seller_name", { required: true })}
              />
              {errors.seller_name && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Sell Date</label>
              <div className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300">
                <Controller
                  control={control}
                  name="sell_date"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DatePicker
                      showIcon
                      onChange={onChange}
                      onBlur={onBlur}
                      dateFormat="yyyy-MM-dd"
                      selected={value ? new Date(value) : null}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <input
                className="bg-green py-2 rounded-md cursor-pointer text-white mx-auto w-full md:w-[60%]"
                type="submit"
                value="Sell Flower"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaleModal;
