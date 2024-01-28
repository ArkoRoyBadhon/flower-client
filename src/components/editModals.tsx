/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateFlowerMutation } from "../redux/features/flower/flowerApi";
import { IFlower } from "../types/addFlowerType";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import {
  colorOptions,
  fragranceOptions,
  occationOptions,
  sizeOptions,
  typeOptions,
} from "../components/flowerOptions";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const EditModals = ({
  EFlower,
  setEditFlower,
}: {
  EFlower: IFlower;
  setEditFlower: any;
}) => {
  const {
    control,
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<IFlower>();

  const [updateFlower, { isSuccess, error }] = useUpdateFlowerMutation();

  const img_hosting_token = import.meta.env.VITE_PUBLIC_IMAGE_UPLOAD;

  const onSubmit: SubmitHandler<IFlower> = async (data) => {
    const formData = new FormData();
    formData.append("image", data.img[0]);

    try {
      let responseData;
      if (data.img[0]) {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
          {
            method: "POST",
            body: formData,
          }
        );

        responseData = await response.json();
      }

      // console.log("response Data", responseData?.data?.url);

      const formattedDate = data.bloom_date
        ? new Date(data.bloom_date).toISOString().split("T")[0]
        : "";

      const flowerData = {
        ...data,
        img: responseData?.data?.url || EFlower?.img,
        bloom_date: formattedDate || EFlower?.bloom_date,
        color: data?.color?.value,
        type: data?.type?.value,
        size: data?.size?.value,
        fragrance: data?.fragrance?.value,
        occation: data?.occation?.value,
      };

      // console.log("payload", flowerData);
      const info = { flowerData, id: EFlower?._id };

      // console.log("INFO", info);

      await updateFlower(info);
      // setImage(null);
      // reset();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (isSuccess) {
    setEditFlower(false);
    toast("Flower Updated", {
      toastId: "flower-update",
    });
  }
  if (error) {
    toast((error as any)?.data?.message, {
      toastId: "update-error",
    });
  }

  const color = colorOptions.find(
    (option) => (option.value as string) === (EFlower?.color as unknown)
  );
  const type = typeOptions.find(
    (option) => (option.value as string) === (EFlower?.type as unknown)
  );
  const size = sizeOptions.find(
    (option) => (option.value as string) === (EFlower?.size as unknown)
  );
  const fragrance = fragranceOptions.find(
    (option) => (option.value as string) === (EFlower?.fragrance as unknown)
  );
  const occation = occationOptions.find(
    (option) => (option.value as string) === (EFlower?.occation as unknown)
  );

  return (
    <div className="fixed z-10 top-[100px] h-[80vh] bg-gray-200 shadow-md w-[60%] rounded-md overflow-hidden overflow-y-auto">
      <div className="flex justify-end">
        <div
          className="cursor-pointer
          px-2 py-1 bg-red-300 w-fit"
          onClick={() => setEditFlower(false)}
        >
          close
        </div>
      </div>
      <div className="">
        <h3 className="text-center font-bold underline text-lg">Edit Flower</h3>
        <div className="mt-10 w-full flex justify-center">
          <form
            className="w-full shadow-md p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mb-2">
              <label htmlFor="">Name</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="text"
                placeholder="name"
                defaultValue={EFlower.name}
                {...register("name")}
              />
              {errors.name && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="">Image</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="file"
                placeholder="Image"
                // defaultValue={EFlower?.img}
                {...register("img")}
              />
              {errors.img && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="">Price</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="text"
                placeholder="Price"
                defaultValue={EFlower?.price}
                {...register("price")}
              />
              {errors.price && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="">Quantity</label>
              <input
                className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
                type="text"
                placeholder="Quantity"
                defaultValue={EFlower?.quantity}
                {...register("quantity")}
              />
              {errors.quantity && (
                <span className="text-center text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="">Bloom Date</label>
              <div className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300">
                <Controller
                  control={control}
                  name="bloom_date"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DatePicker
                      showIcon
                      // minDate={new Date()}
                      onChange={onChange}
                      onBlur={onBlur}
                      dateFormat="yyyy-MM-dd"
                      selected={
                        value ? new Date(value) : new Date(EFlower?.bloom_date)
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="">Color</label>
              <div className="">
                <Controller
                  control={control}
                  name="color"
                  defaultValue={color}
                  render={({ field }) => (
                    <Select options={colorOptions} {...field} />
                  )}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="">Type/Category</label>
              <div className="">
                <Controller
                  control={control}
                  name="type"
                  defaultValue={type}
                  render={({ field }) => (
                    <Select options={typeOptions} {...field} />
                  )}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="">Size</label>
              <div className="">
                <Controller
                  control={control}
                  name="size"
                  defaultValue={size}
                  render={({ field }) => (
                    <Select options={sizeOptions} {...field} />
                  )}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="">Fragrance</label>
              <div className="">
                <Controller
                  control={control}
                  name="fragrance"
                  defaultValue={fragrance}
                  render={({ field }) => (
                    <Select options={fragranceOptions} {...field} />
                  )}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="">Occation</label>
              <div className="">
                <Controller
                  control={control}
                  name="occation"
                  defaultValue={occation}
                  render={({ field }) => (
                    <Select options={occationOptions} {...field} />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <input
                className="bg-green py-2 rounded-md cursor-pointer text-white mx-auto w-full md:w-[60%]"
                type="submit"
                value="Update Flower"
              />
            </div>
            {errors && <p className="text-red-500">There are form errors!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModals;
