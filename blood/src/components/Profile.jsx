import React, { useEffect, useState } from 'react'
import { getUser, getUserByPk } from "../api/functions";
import './Profile.css'
import { Card } from 'antd';
import AppointmentsUser from './AppointmentsUser';
import background from "../assets/profile_bkgd.png";
import background2 from "../assets/profile_blood.png";
import badges from "../assets/Digital-Badges.png"

export default function Profile() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUser()
            .then(response => {
                console.log("BADGES" + response.badges);
                setData(response);
            })
    }, []);


    return (
        <>
            <div className="titles">
                <p>HELLO, {data.username}! </p>

                <div id="background_bar">
                    <div id="three-block">
                        <Card title="Badges" style={{ width: '30%', display: 'inline-block'}}>
                                <div>
                                    <img src={badges} style={{ width: '100%', objectFit:'contain'}} />
                                </div>
                            
                        </Card>
                        <Card title="Blood Information" style={{ width: '30%', display: 'inline-block'}}>
                            <img id="blood_bkgd" src={background2} style={{ width: '200px', height: '100px', objectFit:'contain'}} />
                            <div id="blood_text">
                                <p>Times Donated: {data.times_donated}</p>
                                <p>Time Since Last: {data.time_since_last === undefined || data.time_since_last === null || data.time_since_last === "" ? "NA" : data.time_since_last}</p>
                                <p>Experience: {data.experience}</p>
                            </div>
                        </Card>
                        <Card title="Account Information" style={{ width: '30%', display: 'inline-block' }}>
                            <p>Username: {data.username}</p>
                            <p>Email: {data.email}</p>
                        </Card>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '10%'}}>
            <AppointmentsUser />
            </div>
        </>
    )
}