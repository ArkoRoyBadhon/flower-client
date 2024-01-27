export interface stateType {
  value: string;
  label: string;
}

export type IFlower = {
  _id?: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  bloom_date: string;
  color: { value: string };
  type: { value: string };
  size: { value: string };
  fragrance: { value: string };
  occation: { value: string };
};
