import React from "react";
import { useSelector } from './ContexProvider';
import { IState } from '../store/types';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const secretInfo = useSelector((state: IState) => state.someSecretData?.secretInfo);
  return (
    <div>
      This is sidebar
      <div style={{ margin: 10, padding: 10, backgroundColor: "#ffffdc" }}>
        {secretInfo}
      </div>
    </div>
  );
};

export default Sidebar;
