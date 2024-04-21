
interface IFoodList {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity?: number;
}

export default IFoodList;

