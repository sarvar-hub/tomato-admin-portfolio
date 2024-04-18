import { useEffect, useState } from "react";
import "./style.css"
import axios from "axios";
import { toast } from "react-toastify";
import IProduct from "@/interfaces/Product";

const List = () => {

  const url = import.meta.env.VITE_URL;
  const [list, setList] = useState<IProduct[]>();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data);
    }else {
      toast.error("Error");
    }
  }

  const removeFood = async(foodId: string) => {
    const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
    await fetchList();

    if(response.data.success) {
      toast.success(response.data.message);
    }else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchList(); 
  }, [])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((item)=> {
          return (
            <div key={item._id} className="list-table-format" >
              <img src={`${url}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=> item._id && removeFood(item._id)} className="cursor">X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List;
