import React, { useCallback, useContext, useEffect, useState } from 'react';
import './profile.css';
import Header from '../../components/header/header';
import ProfilePicture from '../../components/profile-picture/ProfilePicture';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { white } from '../../utils/colors';
import UserContext from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const optionsDictionary = {
  '1': { value: '1', label: 'Itau', icon: <img src="../../../public/assets/itau.webp" alt="Itau" /> },
  '2': { value: '2', label: 'Bradesco', icon: <img src="../../../public/assets/bradesco.png" alt="Bradesco" /> },
  '3': { value: '3', label: 'Inter', icon: <img src="../../../public/assets/inter.png" alt="Inter" /> },
  '4': { value: '4', label: 'Nubank', icon: <img src="../../../public/assets/nubank.png" alt="Nubank" /> },
  '5': { value: '5', label: 'Banco do Brasil', icon: <img src="../../../public/assets/bb.png" alt="Banco do Brasil" /> }
};


const Profile = () => {
  type BankKey = '1' | '2' | '3' | '4' | '5';
  const DEFAULT_INFO = {
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    phone: '',
    birthdate: '',
    bank: '1' as BankKey,
    account: '',
    agency: '',
  };
  const [userInfo, setUserInfo] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    cpf: string;
    phone: string;
    birthdate: string;
    bank: BankKey;
    account: string;
    agency: string;
  }>(DEFAULT_INFO);

  let navigate = useNavigate();
  let user = useContext(UserContext);

  const handleEditProfile = useCallback(() => {
    navigate("/editProfile");
  }, [navigate]);

  const handleMyPlaces = useCallback(() => {
    navigate("/userPlaces");
  }, [navigate]);

  const loadUserProfile = useCallback(() => {
    if (!user.state.isLoggedIn) toast.error("You need to be logged in to perform this action!")

    axios.get('http://127.0.0.1:8000/festou-api/v1/user/' + user.state.id)
      .then(function (response) {
        setUserInfo(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [user.state.id, user.state.isLoggedIn]);

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-data">
        <div className="profile-sidebar">
          <ProfilePicture img="assets/profile.png" />
          <h2>{userInfo.first_name} {userInfo.last_name}</h2>
          <div className='buttons-profile'>
            <Button
              disabled={false}
              onClick={handleEditProfile}
              text="Edit Profile"
              width="300px"
              backgroundColor="black"
              color={white}
              fontSize='20px'
              marginTop='20px'
            />
            <Button
              disabled={false}
              onClick={handleMyPlaces}
              text="My Places"
              width="300px"
              backgroundColor="black"
              color={white}
              fontSize='20px'
              marginTop='20px'
            />
            </div>
        </div>
        <div className="profile-info">
          <div className="data-container">
            <strong>Email:</strong>
            <span>{userInfo.email}</span>
          </div>
          <div className="data-container">
            <strong>CPF:</strong>
            <span>{userInfo.cpf}</span>
          </div>
          <div className="data-container">
            <strong>Phone:</strong>
            <span>{userInfo.phone}</span>
          </div>
          <div className="data-container">
            <strong>Birthdate:</strong>
            <span>{userInfo.birthdate}</span>
          </div>
          <div className="data-container">
            <strong>Bank:</strong>
            <span>
              {optionsDictionary[userInfo.bank] && (
                <>
                  {optionsDictionary[userInfo.bank].label}
                </>
              )}
            </span>
          </div>
          <div className="data-container">
            <strong>Account:</strong>
            <span>{userInfo.account}</span>
          </div>
          <div className="data-container">
            <strong>Agency:</strong>
            <span>{userInfo.agency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;