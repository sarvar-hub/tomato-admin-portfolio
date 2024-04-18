import { assets } from "@/assets/assets";
import "./style.css"
import { useState } from "react";
import IProduct from "@/interfaces/Product";
import axios from "axios";
import { toast } from "react-toastify";

type TChangeEvent =
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement> |
  React.ChangeEvent<HTMLSelectElement>


const Add = () => {

  const url = import.meta.env.VITE_URL;
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<IProduct>({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event: TChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price).toString());
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setImage(null);
      toast.success(response.data.message);
    } else {
      console.log("Error");
      toast.error(response.data.message);
    }
  };


  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} name="image" type="file" id="image" hidden />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder="Write content here" required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwhich">Sandwhich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}

export default Add;
