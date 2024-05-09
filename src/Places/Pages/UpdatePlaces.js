import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import Card from "../../Shared/Components/UIElements/Card";
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import "./PlaceForm.css"

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

const UpdatePlace = () => {
 const [isLoading,setIsLoading] =useState(true);
  const placeId = useParams().placeId;    
  
  const [formState,inputHandler,setFormData]=useForm({
    title:{
        value : '',
        isValid : false
    },
    description:{
        value:'',
        isValid:false
    },
    // address:{
    //     value:identifiedPlace.address,
    //     isValid:true
    // }
  },false);

  
const identifiedPlace = Dummy_Places.find(p => p.id === placeId);

useEffect(()=>{
    if(identifiedPlace){
        setFormData({
            title:{
                value:identifiedPlace.title,
                isValid:true
            },
            description:{
                value:identifiedPlace.description,
                isValid:true
            }
        },true);
    }
    
    setIsLoading(false);
},[setFormData,identifiedPlace]);


const placeUpdateSubmitHandler = event =>{
    event.preventDefault();
        console.log(formState.inputs)
};

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
             <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if(isLoading){
    return (
        <div className="center">
          <h2>Loading....</h2>
        </div>
      );
  }
  return (
    
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initailValue={formState.inputs.title.value}
        initailValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initailValue={formState.inputs.description.value}
        initailValid={formState.inputs.description.isValid}
      />
      {/* <Input
        id="address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address)."
        onInput={inputHandler}
        initailValue={formState.inputs.address.value}
        initailValid={formState.inputs.address.isValid}
      /> */}
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
    
  );
};

export default UpdatePlace;
