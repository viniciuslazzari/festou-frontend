import { useCallback, useContext, useEffect, useState } from "react"
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
import { FaCheck, FaStar } from "react-icons/fa"
import { cpfIsValid } from "../../utils/cpfValidator"
import { stringIsValid } from "../../utils/stringValidator"
import { dateIsValid } from "../../utils/dateValidator"
import { emailIsValid } from "../../utils/emailValidator"

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
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  let navigate = useNavigate();
  let user = useContext(UserContext);

  const serializeData = useCallback(() => {
    const dateArr = birthdate.split('/');

    const data = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "cpf": cpf,
      "phone": phone,
      "password": btoa(password),
      "birthdate": parseInt(dateArr[2]) +  '-' + parseInt(dateArr[1]) + '-' + parseInt(dateArr[0]),
      "bank": bank,
      "account": account,
      "agency": agency
    }

    return data
  }, [account, agency, bank, birthdate, cpf, email, firstName, lastName, password, phone])

  useEffect(() => {
    if (!firstName || firstName === "") { setButtonDisabled(true); return };
    if (!lastName || lastName === "") { setButtonDisabled(true); return };
    if (!email || email === "") { setButtonDisabled(true); return };
    if (!cpf || cpf === "") { setButtonDisabled(true); return };
    if (!phone || phone === "") { setButtonDisabled(true); return };
    if (!birthdate || birthdate === "") { setButtonDisabled(true); return };
    if (!bank || bank === 0) { setButtonDisabled(true); return };
    if (!account || account === "") { setButtonDisabled(true); return };
    if (!agency || agency === "") { setButtonDisabled(true); return };
    if (!password || password === "") { setButtonDisabled(true); return };

    if (password !== confirmPassword) { setButtonDisabled(true); return };
    if (!cpfIsValid(cpf)) { setButtonDisabled(true); return };
    if (!stringIsValid(firstName)) { setButtonDisabled(true); return };
    if (!stringIsValid(lastName)) { setButtonDisabled(true); return };
    if (!emailIsValid(email)) { setButtonDisabled(true); return };
    if (!dateIsValid(birthdate)) { setButtonDisabled(true); return };

    setButtonDisabled(false);
  }, [account, agency, bank, birthdate, confirmPassword, cpf, email, firstName, lastName, password, phone])

  const handleSubmit = useCallback(() => {
    const data = serializeData();

    axios.post('http://127.0.0.1:8000/festou-api/v1/signup', data)
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
          >Welcome to Festou, sign up to continue!</div>
          <div className="divisory">
            <Input label="First name" placeholder="Enter your first name" onChange={setFirstName}/>
            <Input label="Last name" placeholder="Enter your last name" onChange={setLastName}/>
          </div>
          <Input label="Email" placeholder="Enter your email" onChange={setEmail}/>
          <div className="divisory">
            <Input label="CPF" mask={cpfMask} placeholder="000.000.000-00" onChange={setCpf}/>
            <Input label="Phone" mask={phoneMask} placeholder="(000) 00000-0000" onChange={setPhone}/>
          </div>
          <div className="divisory">
            <Input label="Birthdate" maxLenght={10} mask={dateMask} placeholder="00/00/0000" onChange={setBirthdate}/>
            <Select label="Bank" options={options} onChange={setBank}/>
          </div>
          <div className="divisory">
            <Input label="Account" placeholder="Enter your account" onChange={setAccount} type="number"/>
            <Input label="Agency" placeholder="Enter your agency" onChange={setAgency} type="number"/>
          </div>
          <div className="divisory" style={{ marginBottom: "20px" }}>
            <Input label="Password" placeholder="Enter your password" onChange={setPassword} type="password"/>
            <Input label="Confirm password" placeholder="Confirm your password" onChange={setConfirmPassword} type="password"/>
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

export default Signup