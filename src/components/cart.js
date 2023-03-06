import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function Cart(props) {
  const { trayItems } = props;
  console.log(props);

  // Define state for the cart items
  const [items, setItems] = useState([]);

  // useEffect to update the cart items whenever props.cartItems changes
  useEffect(() => {
    // setItems((prevItems) => {
    //   // Merge the previous cart items with the new ones
    //   const newItems = [...prevItems];
    //   cartItems.forEach((item) => {
    //     const index = newItems.findIndex(
    //       (cartItem) => cartItem.item === item.item
    //     );
    //     if (index >= 0) {
    //       newItems[index].qty += item.qty;
    //     } else {
    //       newItems.push(item);
    //     }
    //   });
    //   return newItems;
    // });
  }, [trayItems]);

  // const incre = (idd) => {
  //   settrayItems(
  //     trayItems.map((stat) =>
  //       stat.user_id === idd ? { ...stat, qty: stat.qty + 1 } : stat
  //     )
  //   );
  // };

  // const handleTotal = () => {
  //   // reduce will add all of your price and set a default value in case the items is empty
  //   return trayItems.reduce(
  //     (acc, curr) => Number(acc) + curr.qty * Number(curr.price),
  //     0
  //   );
  // };

  // const decre = (idd) => {
  //   settrayItems(
  //     trayItems.map((stat) =>
  //       stat.user_id === idd
  //         ? {
  //             ...stat,
  //             qty: stat.qty !== 1 ? stat.qty - 1 : (stat.qty = 0),
  //           }
  //         : stat
  //     )
  //   );
  // };

  // Define a function to add items to the cart
  const addItem = (item) => {
    // Check if the item already exists in the cart
    const index = items.findIndex((cartItem) => cartItem.item === item.item);
    if (index >= 0) {
      // If it does, update the qty
      const newItems = [...items];
      newItems[index].qty += 1;
      newItems[index].qty = parseInt(newItems[index].qty); // Move this line here
      setItems(newItems);
    } else {
      // Otherwise, add a new item to the cart
      setItems([...items, { ...item, qty: 1 }]);
    }
  };

  // Define a function to remove items from the cart
  const removeItem = (item) => {
    // Check if the item already exists in the cart
    const index = items.findIndex((cartItem) => cartItem.item === item.item);
    if (index >= 0) {
      const newItems = [...items];
      // Check if the item qty is greater than 1
      if (newItems[index].qty > 1) {
        // If it is, decrement the qty
        newItems[index].qty -= 1;
      } else {
        // Otherwise, remove the item from the cart
        newItems.splice(index, 1);
      }
      setItems(newItems);
    }
  };

  // Define a function to calculate the total price of the items in the cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.selling_price * item.qty;
    }, 0);
  };

  // Render the cart
  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {trayItems &&
          trayItems.map((ele, index) => {
            if (ele.qty > 0) {
              return (
                <tr key={index}>
                  <td>
                    <p style={{ cursor: "pointer", maxWidth: "174px" }}>
                      {" "}
                      {ele.item}
                    </p>
                  </td>
                  <td>{ele.price}</td>
                  <td>
                    <Button
                      variant="contained"
                      size="small"
                      // onClick={() => incre(ele.user_id)}
                    >
                      +
                    </Button>

                    {ele.qty}
                    <Button
                      variant="contained"
                      size="small"
                      // onClick={() => decre(ele.user_id)}
                    >
                      -
                    </Button>
                  </td>
                  <td>&nbsp;&nbsp; {ele.qty * ele.price}&nbsp;&nbsp;</td>
                </tr>
              );
            }
          })}
      </ul>
      <div></div>
    </div>
  );
}

export default Cart;
