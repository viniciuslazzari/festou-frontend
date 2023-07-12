import { useCallback, useContext, useState } from "react"
import Input from "../../components/input/Input"
import "./Signup.css"
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

const options = [
  { value: 1, label: 'Itau', icon: <img src="assets/itau.webp" alt="Itau"/> },
  { value: 2, label: 'Bradesco', icon: <img src="assets/bradesco.png" alt="Bradesco"/> },
  { value: 3, label: 'Inter', icon: <img src="assets/inter.png" alt="Inter"/> },
  { value: 4, label: 'Nubank', icon: <img src="assets/nubank.png" alt="Nubank"/> },
  { value: 5, label: 'Banco do Brasil', icon: <img src="assets/bb.png" alt="Banco do Brasil"/> }
]

const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [bank, setBank] = useState<number>(0);
  const [account, setAccount] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let navigate = useNavigate();
  let user = useContext(UserContext);

  const serializeData = useCallback(() => {
    const dateArr = birthdate.split('/');

    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "cpf": cpf,
      "phone": phone,
      "birthdate": new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0])),
      "bank": bank,
      "account": account,
      "agency": agency,
      "password": password
    }

    return data
  }, [account, agency, bank, birthdate, cpf, email, firstName, lastName, password, phone])

  const handleSubmit = useCallback(() => {
    if (!birthdate){
      return
    }

    const data = serializeData();

    axios.post('http://127.0.0.1:8000/festou-api/v1/signup', data)
      .then(function (response) {
        toast.success("User created!")
        user.setState({ isLoggedIn: true, id: 1, name: "Vinicius" })
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data["Bad Request"])
      });
  }, [birthdate, navigate, serializeData, user])

  return (
    <div className="signup">
      <div className="form-wrapper-signup">
        <div className="form-signup">
          <div className="divisory">
            <Input label="First name" placeholder="flfksl" onChange={setFirstName}/>
            <Input label="Last name" placeholder="flfksl" onChange={setLastName}/>
          </div>
          <Input label="Email" placeholder="flfksl" onChange={setEmail}/>
          <div className="divisory">
            <Input label="CPF" mask={cpfMask} placeholder="flfksl" onChange={setCpf}/>
            <Input label="Phone" mask={phoneMask} placeholder="flfksl" onChange={setPhone}/>
          </div>
          <div className="divisory">
            <Input label="Birthdate" mask={dateMask} placeholder="flfksl" onChange={setBirthdate}/>
            <Select label="Bank" options={options} onChange={setBank}/>
          </div>
          <div className="divisory">
            <Input label="Account" placeholder="flfksl" onChange={setAccount} type="number"/>
            <Input label="Agency" placeholder="flfksl" onChange={setAgency} type="number"/>
          </div>
          <div className="divisory" style={{ marginBottom: "20px" }}>
            <Input label="Password" placeholder="flfksl" onChange={setPassword} type="password"/>
            <Input label="Confirm password" placeholder="flfksl" onChange={() => {}} type="password"/>
          </div>
          <Button text="Create account" backgroundColor={white} color="black" width="100%" onClick={() => handleSubmit()} />
        </div>
      </div>

      <div className="picture-wrapper-signup">
        <div className="picture-signup" style={{ backgroundColor: white }}></div>
      </div>
    </div>
  )
}

export default Signup