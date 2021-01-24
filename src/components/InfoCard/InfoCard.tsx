import React from 'react';
import styled from 'styled-components';

const InfoCard: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  padding: 5px 0;
  color: #eee;
  border-radius: 12px;
  // backdrop-filter: blur(70px);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  flex: 1;
  // flex-direction: column;

  margin-bottom: 15px;
  position: relative; /*  */
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  background-clip: padding-box;
  border: solid 1px transparent;
  @media (max-width: 768px) {
    margin-bottom: 15px !important;
  } ;
`;

export default InfoCard;
