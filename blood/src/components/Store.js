import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { getCoupons } from '../api/functions';


const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Store = () => {
    let [data, setData] = useState([]);

    useEffect(() => {
        const fetchCoupons = () => {
            if (data.length > 0) {
                return;
            }
            console.log("start");
            getCoupons()
            .then((response) => {
                console.log("end " + response);
                setData(response[0]["coupon_val"]);
            })
        }
        fetchCoupons()
        if (data == null || data == undefined || data.length == 0) {
            return;
        } else {
            let list = [];
            for (let i = 0; i < data.length; i++) {
                list.push(<div><h3 style={contentStyle}>{data[i]["coupon_val"]}</h3></div>);
            }

            return (
                <Carousel autoplay>
                    {list}
                </Carousel>
            )
        }
    }, [data])

    return (
    <Carousel autoplay>
        <div>
      <h3 style={contentStyle}>McDonald's $10 Off</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Burger King Free Whopper</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Smoothie King Free Small Drink</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Tiff's Treats Free Cookie</h3>
    </div>
    </Carousel>
    )
}

export default Store;