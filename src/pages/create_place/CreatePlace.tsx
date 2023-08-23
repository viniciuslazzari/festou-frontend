import { useCallback, useEffect, useState, useContext } from "react"
import Input from "../../components/input/Input"
import "./CreatePlace.css"
import Button from "../../components/button/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { white } from "../../utils/colors"
import UserContext from "../../context/UserContext"
import { FaCheck } from "react-icons/fa"
import Header from "../../components/header/header"
import InputImage from "../../components/inputImage/Input"

const CreatePlace = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [termsofuse, setTermsofuse] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  
  let user = useContext(UserContext);
  let navigate = useNavigate();

  // Only access page when logged in
  useEffect(() => {
    if (!user.state.isLoggedIn) navigate("/");
  }, [navigate, user.state.isLoggedIn])

  useEffect(() => {
    if (!placeName || placeName === "") { setButtonDisabled(true); return };
    if (!price || price === "") { setButtonDisabled(true); return };
    if (!capacity || capacity === "") { setButtonDisabled(true); return };
    if (!description || description === "") { setButtonDisabled(true); return };
    if (!location || location === "") { setButtonDisabled(true); return };
    if (!termsofuse || termsofuse === "") { setButtonDisabled(true); return };
    if (!photo || photo === null) { setButtonDisabled(true); return };
    
    setButtonDisabled(false);
  }, [placeName, price, capacity, description, location, termsofuse, user.state.isLoggedIn, photo])

  const serializeData = useCallback(() => {
    const formData = new FormData();

    formData.append("name", placeName);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("terms_of_use", termsofuse);
    formData.append("id_owner", user.state.id.toString());
    formData.append("image_1", "");
    formData.append("image_2", "");
    formData.append("image_3", "");

    if (photo) { formData.append('image_1', photo); }
    if (photo) { formData.append('image_2', photo); }
    if (photo) { formData.append('image_3', photo); }

    return formData
  }, [photo, placeName, price, capacity, description, location, termsofuse, user.state.id])

  const handleSubmit = useCallback(() => {
    const data = serializeData();

    console.log(data)

    axios.post('http://127.0.0.1:8000/festou-api/v1/place', data, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(() => {
        toast.success("Place Created!")
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [navigate, serializeData])

  return (
    <div className="create-place">
      <div className="form-wrapper-create-place">
        <div className="form-create-place">
          <Header/>
          <Input label="Place Name" placeholder="Enter the name of the place" onChange={setPlaceName}/>
          <div className="divisory">
            <Input label="Price" placeholder="Enter the price of your place" onChange={setPrice}/>
            <Input label="Capacity" placeholder="Enter the capacity of the place" onChange={setCapacity}/>
          </div>
          <Input label="Location" placeholder="Enter the location of your place" onChange={setLocation}/>
          <Input label="Description" placeholder="Enter a brief description of your place" onChange={setDescription}/>
          <Input label="Terms of Use" placeholder="Enter the terms of use of your place" onChange={setTermsofuse}/>
          <InputImage label="Images" acceptedFormats={[".png", ".jpg"]} onChange={setPhoto} />
           
          <Button 
            disabled={buttonDisabled} 
            marginTop= "20px"
            text="Create place" 
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

export default CreatePlace