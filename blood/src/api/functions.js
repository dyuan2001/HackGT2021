import axios from "axios";
import Cookies from 'universal-cookie';

axios.defaults.baseURL = "http://localhost:8000";
const cookies = new Cookies();

const createUser = (username, email, password) => {
    axios.post("/create-user/", {
        username: username,
        email: email,
        password: password
    })
    .then((res) => console.log(res));

    console.log({
        username: username,
        email: email,
        password: password
    });
}

const getUserByPk = async (pk) => {
    let response = await axios.get(`/get-user/${pk}/`);
    let res = response.data;

    return {
        username: res.username,
        email: res.email,
        password: res.password,
        times_donated: res.times_donated,
        time_since_last: res.time_since_last,
        experience: res.experience,
        badges: res.badges
    };
}

const getUser = async () => {
    axios.defaults.withCredentials = true;
    let response = await axios.get("/get-user/", {
        headers: {
            Authorization: `Token ${cookies.get('Authorization')}`
        }
    })
    let res = response.data;    

    return {
        username: res.username,
        email: res.email,
        password: res.password,
        times_donated: res.times_donated,
        time_since_last: res.time_since_last,
        experience: res.experience,
        badges: res.badges
    };
}

const login = async (username, password) => {
    let res = await axios.post("/dj-rest-auth/login/", {
        username: username,
        password: password
    });
    if (res.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Token ${res.data.key}`;
        cookies.set('Authorization', res.data.key);  
        return true;
    } else {
        return false;
    }
}

const logout = async () => {
    let res = await axios.post("/dj-rest-auth/logout/");
    if (res.status === 200) {
        delete axios.defaults.headers.common['Authorization'];
        const cookies = new Cookies();
        cookies.set('Authorization', null);  
        return true;
    } else {
        return false;
    }
}

const updateUser = async (username, data) => {
    let response = await axios.patch(`/patch-user/${username}/`, data)

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

const createBloodCenter = async (name, email, address, pk) => {
    let response = await axios.post(`/create-center/${pk}/`, {
        name: name,
        address: address,
        email: email
    });

    if (response.status == 200) {
        return true;
    } else {
        return false;
    }
}

const createAppointment = async (booked, start_time, end_time, donation_type, pk) => {
    let data = {
        booked: booked,
        start_time: start_time,
        end_time: end_time,
        donation_type: donation_type
    }
    
    let response = await axios(`/create-appointment/${pk}/`, {
        method: "post",
        data: JSON.stringify(data),
        headers: {
            Authorization: `Token ${cookies.get('Authorization')}`
        }
    });

    if (response.status == 200) {
        return true;
    } else {
        return false;
    }
}

const deleteAppointment = async (pk) => {
    let response = await axios.delete(`/delete-appointment/${pk}/`);

    if (response.status == 200) {
        return true;
    } else {
        return false;
    }
}

const getAppointmentsByUser = async () => {
    let response = await axios.get(`/get-appointments/`, {
        headers: {
            Authorization: `Token ${cookies.get('Authorization')}`
        }
    });

    return response.data;
}

const getAppointmentsByCenter = async (pk) => {
    let response = await axios.get(`/get-appointments/${pk}/`);

    return response.data;
}

const getLeaderboard = async () => {
    let response = await axios.get(`/get-leaderboard/`);

    return response.data;
}

const createCoupon = async (coupon_val) => {
    let response = await axios.post(`/create-coupon/`, {
        coupon_val
    })

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

const getCoupons = async () => {
    let response = await axios.get(`/get-coupons/`);

    return response.data;
}

export { createUser, login, logout, getUser, updateUser, createBloodCenter,
        createAppointment,
        deleteAppointment,
        getAppointmentsByCenter,
        getAppointmentsByUser,
        getLeaderboard,
        createCoupon,
        getCoupons     ,
        getUserByPk  
};
