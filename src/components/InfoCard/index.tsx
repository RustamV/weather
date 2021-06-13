import React from "react";
import { Card, Typography } from "antd";
import "./index.scss";

const { Title, Text } = Typography;

const InfoCard = ({
  title,
  subtitle,
  main,
}: {
  title?: string | undefined;
  subtitle?: string | undefined;
  main: string | number | undefined;
}) => {
  return (
    <Card className="info-card">
      <div className="info-card__content">
        <div>
          <Title level={2} className="info-card__title">
            {title}
          </Title>
          <Text strong>{subtitle}</Text>
        </div>
        <Title level={1}>{main}</Title>
      </div>
    </Card>
  );
};

export default InfoCard;
