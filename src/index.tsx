import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import reportWebVitals from './reportWebVitals';
import AuthRoot from './AuthRoot';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Config } from 'config/config';

async function initApp() {
  try {
    await Config.load();

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <RecoilRoot>
            <AuthRoot />
          </RecoilRoot>
        </BrowserRouter>
      </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
  } catch (error) {
    console.error('Application initialization failed:', error);
    // document.getElementById('root').innerText = 'Failed to load configuration.';
  }
}

initApp();
