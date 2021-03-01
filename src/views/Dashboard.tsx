import React from 'react';
import styles from '../App.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

interface DashboardProps { } 

export const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className={styles.App}>
      <div className={styles.HeaderArea}>
        <Header />
      </div>
      <div className={styles.SidebarArea}>
        <Sidebar />
      </div>
      <div>
        <Content />
      </div>
    </div>
  );
}

export default Dashboard;
