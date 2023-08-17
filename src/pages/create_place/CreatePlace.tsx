import { useCallback, useEffect, useState } from "react"
import Input from "../../components/input/Input"
import Button from "../../components/button/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { white } from "../../utils/colors"
import { FaCheck } from "react-icons/fa"

const CreatePlace = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  
  let navigate = useNavigate();

  useEffect(() => {
    if (!placeName || placeName === "") { setButtonDisabled(true); return };
    if (!price || price === "") { setButtonDisabled(true); return };
    if (!capacity || capacity === "") { setButtonDisabled(true); return };
    if (!description || description === "") { setButtonDisabled(true); return };
    setButtonDisabled(false);
  }, [placeName, price, capacity, description, location])

  const serializeData = useCallback(() => {
    const data = {
      "name": placeName,
      "price": price,
      "capacity": capacity,
      "descrpition": description,
      "location": location,
      "score": "0"
    }

    return data
  }, [placeName, price, capacity, description, location])

  const handleSubmit = useCallback(() => {
    const data = serializeData();
    axios.post('http://127.0.0.1:8000/festou-api/v1/place', data)
      .then(function (response) {
        toast.success("Place Created!")
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [navigate, serializeData])

  return (
    <div className="createplace">
      <div className="form-wrapper-signup">
        <div className="form-signup">
          <div
            style={{
              color: white,
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "30px",
              textAlign: "center"
            }}
            >Describe the place that you want to add!</div>
          <Input label="Place Name" placeholder="Enter the name of the place" onChange={setPlaceName}/>
          <div className="divisory">
            <Input label="Price" placeholder="Enter the price of your place" onChange={setPrice}/>
            <Input label="Capacity" placeholder="Enter the capacity of the place" onChange={setCapacity}/>
          </div>
            <Input label="Location" placeholder="Enter the location of your place" onChange={setLocation}/>
            <Input label="Description" placeholder="Enter a brief description of your place" onChange={setDescription}/>
           
          <Button 
                disabled={buttonDisabled} 
                text="Create place" 
                backgroundColor={white} 
                color="black"
                icon={<FaCheck />}
                width="100%" 
                onClick={() => handleSubmit()} 
          />
        </div>
      </div>
    </div>
  ) 
}

export default CreatePlace