interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: File;
}

export default IProduct;
