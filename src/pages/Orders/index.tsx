import { useEffect, useState } from "react";
import "./style.css"
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "@/assets/assets";
import IOrder from "@/interfaces/Order";
import { EOrderStatus } from "@/enums";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const url = import.meta.env.VITE_URL;

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success) {
      setOrders(response.data.data);
    }else {
      toast.error("Error");
    }
  }

  const statusHandler = async (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId, 
      status: event.target.value
    })
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(()=> {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3> 
      <div className="order-list">
        {orders.map((order,index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" /> 
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if(index===order.items.length-1) {
                    return item.name+" x " + item.quantity;
                  }else {
                    return item.name + " x " + item.quantity+", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.state+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">+{order.address.phone}</p>
            </div>
            <p>items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id) } value={order.status}>
              <option value={EOrderStatus.FOOD_PROCESSING}>{EOrderStatus.FOOD_PROCESSING}</option>
              <option value={EOrderStatus.OUT_FOR_DELIVERY}>{EOrderStatus.OUT_FOR_DELIVERY}</option>
              <option value={EOrderStatus.DELIVERED}>{EOrderStatus.DELIVERED}</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
