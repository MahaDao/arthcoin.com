import React from 'react';
import styled from 'styled-components';
import { withStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '../../../assets/img/ToolTipColored.svg';
import Tooltip from '@material-ui/core/Tooltip';
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);
interface StatProps {
  statData: Array<{ title: string; subTitle: string }>;
}
export interface stats {
  title: string;
  subTitle: string;
}
const StatCard: React.FC<StatProps> = ({ statData }) => {
  return (
    <Card>
      {statData &&
        statData.length > 0 &&
        statData.map((eachStat: stats) => (
          <SubTitleContainer key={eachStat.title}>
            <SubTitle>
              {eachStat.subTitle}
              <HtmlTooltip enterTouchDelay={0} title={<span>dqlkndlkqwndkq</span>}>
                <img src={InfoIcon} alt="Inof" width="16px" className="margin-left-5" />
              </HtmlTooltip>
            </SubTitle>
            <Title>{eachStat.title}</Title>
          </SubTitleContainer>
        ))}
    </Card>
  );
};
const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 30px;
  height: 100%;
`;
const SubTitleContainer = styled.div`
  margin-bottom: 30px;
`;
const SubTitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
  color: #ffffff;
  opacity: 0.64;
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

export default StatCard;
