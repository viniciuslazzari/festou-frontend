import { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import './editPlace.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { white } from "../../utils/colors";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { FaCheck } from "react-icons/fa";
import InputImage from "../../components/inputImage/Input";

interface IPlace {
  name: string,
  price: string,
  capacity: string,
  description: string,
  location: string,
  terms_of_use: string,  
}

const EditPlace = () => {
  const { state } = useLocation();

  const [placeName, setPlaceName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [terms_of_use, setTermsofuse] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [defaultValues, setDefaultValues] = useState<IPlace | null>(null);

  let user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!placeName || placeName === "") { setButtonDisabled(true); return };
    if (!price || price === "") { setButtonDisabled(true); return };
    if (!capacity || capacity === "") { setButtonDisabled(true); return };
    if (!location || location === "") { setButtonDisabled(true); return };
    //if (!description || description === "") { setButtonDisabled(true); return };
    //if (!terms_of_use || terms_of_use === "") { setButtonDisabled(true); return };
    if (!user.state.isLoggedIn) { setButtonDisabled(true); return };
    
    setButtonDisabled(false);
  }, [placeName, price, capacity, description, location, terms_of_use, user.state.isLoggedIn])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/place/' + state.id)
      .then(function(response){
        setDefaultValues(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [state.id])

  const serializeData = useCallback(() => {
    const formData = new FormData();

    formData.append("name", placeName);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("terms_of_use", terms_of_use);
    formData.append("id_owner", user.state.id.toString());
    formData.append("image_1", "");
    formData.append("image_2", "");
    formData.append("image_3", "");

    if (photo) { formData.append('image_1', photo); }
    if (photo) { formData.append('image_2', photo); }
    if (photo) { formData.append('image_3', photo); }

    return formData
  }, [placeName, price, capacity, description, location, terms_of_use, user.state.id, photo])

  // Only access page when logged in
  useEffect(() => {
    if (!user.state.isLoggedIn) navigate("/");
  }, [navigate, user.state.isLoggedIn])

  const handleSubmit = useCallback(() => {
    const data = serializeData();

    axios.put('http://127.0.0.1:8000/festou-api/v1/editPlace/' + state.id, data)
      .then(() => {
        toast.success("Place updated!")
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [navigate, serializeData, state.id])
  
  return (
    <div className="create-place">
      <div className="form-wrapper-create-place">
        <div className="form-create-place">
          <Header/>
          <div
            style={{
              color: white,
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "30px",
              textAlign: "center"
            }}
            >Edit your own place!</div>
          <Input label="Place Name" defaultValue={defaultValues?.name} placeholder="Enter the name of the place" onChange={setPlaceName} />
          <div className="divisory">
            <Input label="Price"  defaultValue={defaultValues?.price} placeholder="Enter the price of your place" onChange={setPrice} />
            <Input label="Capacity" defaultValue={defaultValues?.capacity} placeholder="Enter the capacity of the place" onChange={setCapacity} />
          </div>
          <Input label="Location" defaultValue={defaultValues?.location} placeholder="Enter the location of your place" onChange={setLocation} />
          <Input label="Description" defaultValue={defaultValues?.description} placeholder="Enter a brief description of your place" onChange={setDescription} />
          <Input label="Terms of Use" defaultValue={defaultValues?.terms_of_use} placeholder="Enter the terms of use of your place" onChange={setTermsofuse} />
          <InputImage label="Images" acceptedFormats={[".png", ".jpg"]} onChange={setPhoto} />
          
          <Button 
            disabled={buttonDisabled} 
            marginTop= "20px"
            text="Save Changes" 
            backgroundColor={white} 
            color="black"
            icon={<FaCheck />}
            width="100%" 
            onClick={() => handleSubmit()} 
          />
        </div>
      </div>   
      <div className="picture-wrapper-create-place">
        <div className="picture-create-place">
        </div>
      </div>   
    </div>
  )
}

export default EditPlace;
