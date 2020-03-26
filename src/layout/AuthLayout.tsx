import './AuthLayout.scss';
import React, { FC } from 'react';

const AuthLayout: FC = props => {
  return (
    <div className="auth-container full-size">
      <div className="full-size ">
        <div className="ion-justify-content-center ion-align-items-center full-size">
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
