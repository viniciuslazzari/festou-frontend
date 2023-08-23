import { useCallback, useContext, useEffect, useState } from "react"
import Input from "../../components/input/Input"
import "./EditProfile.css"
import Button from "../../components/button/Button"
import Select from "../../components/select/Select"
import { cpfMask } from "../../utils/cpfMask"
import { phoneMask } from "../../utils/phoneMask"
import { dateMask } from "../../utils/dateMask"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { white } from "../../utils/colors"
import UserContext from "../../context/UserContext"
import { FaCheck, FaStar } from "react-icons/fa"
import { cpfIsValid } from "../../utils/cpfValidator"
import { stringIsValid } from "../../utils/stringValidator"
import { dateIsValid } from "../../utils/dateValidator"
import { emailIsValid } from "../../utils/emailValidator"
import Header from "../../components/header/header"

const options = [
  { value: 1, label: 'Itau', icon: <img src="assets/itau.webp" alt="Itau"/> },
  { value: 2, label: 'Bradesco', icon: <img src="assets/bradesco.png" alt="Bradesco"/> },
  { value: 3, label: 'Inter', icon: <img src="assets/inter.png" alt="Inter"/> },
  { value: 4, label: 'Nubank', icon: <img src="assets/nubank.png" alt="Nubank"/> },
  { value: 5, label: 'Banco do Brasil', icon: <img src="assets/bb.png" alt="Banco do Brasil"/> }
]

interface IProfile {
  first_name: string,
  last_name: string,
  phone: string,
  password: string,
  birthdate: string,
  bank: number,
  account: string,
  agency: string,
}


const EditProfile = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [bank, setBank] = useState<number>(0);
  const [account, setAccount] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [defaultValues, setDefaultValues] = useState<IProfile | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  let navigate = useNavigate();
  let user = useContext(UserContext);

  const serializeData = useCallback(() => {
    const dateArr = birthdate.split('/');

    const data = {
      "first_name": firstName,
      "last_name": lastName,
      "phone": phone,
      "birthdate": parseInt(dateArr[2]) +  '-' + parseInt(dateArr[1]) + '-' + parseInt(dateArr[0]),
      "bank": bank,
      "account": account,
      "agency": agency
    }

    return data
  }, [account, agency, bank, birthdate, firstName, lastName, phone])

  useEffect(() => {
    if (!firstName || firstName === "") { setButtonDisabled(true); return };
    if (!lastName || lastName === "") { setButtonDisabled(true); return };
    if (!phone || phone === "") { setButtonDisabled(true); return };
    if (!birthdate || birthdate === "") { setButtonDisabled(true); return };
    if (!bank || bank === 0) { setButtonDisabled(true); return };
    if (!account || account === "") { setButtonDisabled(true); return };
    if (!agency || agency === "") { setButtonDisabled(true); return };

    if (!stringIsValid(firstName)) { setButtonDisabled(true); return };
    if (!stringIsValid(lastName)) { setButtonDisabled(true); return };
    if (!dateIsValid(birthdate)) { setButtonDisabled(true); return };

    setButtonDisabled(false);
  }, [account, agency, bank, birthdate, firstName, lastName, phone])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/user/' + user.state.id)
      .then(function(response){
        setDefaultValues(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [user.state.id])

  const handleSubmit = useCallback(() => {
    const data = serializeData();

    axios.post('http://127.0.0.1:8000/festou-api/v1/editProfile', data)
      .then(function (response) {
        toast.success("User created!")
        user.setState({ isLoggedIn: true, id: response.data.id, name: response.data.first_name })
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [navigate, serializeData, user])

  return (
    <div className="signup">
      <Header/>
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
          >Edit your profile!</div>
          <div className="divisory">
            <Input label="First name" placeholder="Enter your first name" onChange={setFirstName} defaultValue={defaultValues?.first_name}/>
            <Input label="Last name" placeholder="Enter your last name" onChange={setLastName}defaultValue={defaultValues?.last_name}/>
          </div>
          <div className="divisory">
            <Input label="Phone" mask={phoneMask} placeholder="(000) 00000-0000" onChange={setPhone}defaultValue={defaultValues?.phone}/>
          </div>
          <div className="divisory">
            <Input label="Birthdate" maxLenght={10} mask={dateMask} placeholder="00/00/0000" onChange={setBirthdate}defaultValue={defaultValues? new Date(defaultValues.birthdate).toLocaleDateString("pt-BR"): ''}/>
            <Select label="Bank" options={options} onChange={setBank} />
          </div>
          <div className="divisory">
            <Input label="Account" placeholder="Enter your account" onChange={setAccount} type="number"defaultValue={defaultValues?.account}/>
            <Input label="Agency" placeholder="Enter your agency" onChange={setAgency} type="number"defaultValue={defaultValues?.agency}/>
          </div>
          <Button 
            disabled={buttonDisabled} 
            text="Create account" 
            backgroundColor={white} 
            color="black"
            icon={<FaCheck />}
            width="100%" 
            onClick={() => handleSubmit()} 
          />
        </div>
      </div>

      <div className="picture-wrapper-signup">
        <div className="picture-signup">
          <div className="signup-card">
            <div
              style={{
                color: white,
                width: "90%",
                fontSize: "23px"
              }}
            >
              Best place to party with friends, I couldn't recommend this place more!
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "90%", marginTop: "20px" }}>
              <div style={{ width: "50%", color: white }}>Vinicius Lazzari</div>
              <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", color: white }}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile