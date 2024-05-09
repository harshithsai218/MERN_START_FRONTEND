import React from "react";
import {useParams} from "react-router-dom";

import PlaceList from "../Components/PlacesList";
    const Dummy_Places=[
    {
        id:'p1',
        title:'funnel hill',
        description:'waffle place',
        imageUrl:"https://www.mappls.com/place/K9SLBP_1668488163176.jpg",
        address:'beside More Super Market, Defence Colony, Sainikpuri, Hyderabad, Secunderabad, Telangana 500036',
        location:{
            lat: 40.748817,
            lng: -73.985428
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'funnel hill 222',
        description:'waffle place',
        imageUrl:'https://www.mappls.com/place/K9SLBP_1668488163176.jpg',
        address:'beside More Super Market, Defence Colony, Sainikpuri, Hyderabad, Secunderabad, Telangana 500036',
        location:{
            lat: 40.748817,
            lng: -73.985428
        },
        creator:'u2'
}
]

const UserPlaces = () =>{
    const userId=useParams().userId;
    const loadPlaces = Dummy_Places.filter(place => place.creator === userId)
    return <PlaceList items={loadPlaces}/>
};

export default UserPlaces;