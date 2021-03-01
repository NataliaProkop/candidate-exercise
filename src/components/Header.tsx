import React from "react";
import { useHistory } from 'react-router-dom';
import { useStore, useSelector } from './ContexProvider';
import { IState } from '../store/types';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const store = useStore();
  const secretInfo = useSelector((state: IState) => state.someSecretData?.secretInfo);
  const userEmail = useSelector((state: IState) => state.userData?.email);
  const history = useHistory();
  const handleClik = () =>{
    store.logout();
    history.push('/login');
  }

  return (
    <div>
      Hello, this is header!
      <span style={{ margin: 10, padding: 10, backgroundColor: "#ffffdc" }}>
        {secretInfo}
      </span>
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        You're logged in as {userEmail} user.
        <div>
          <button onClick={handleClik}>Click here to log out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
