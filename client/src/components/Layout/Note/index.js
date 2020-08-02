import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-left: 6px solid #ee6e73;
  padding: 8px;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const Info = styled.div`
  font-size: 12px;
  color: #999999;
`;
export default function (props) {
    return (
        <Container>
            <Title>{props.title || "Note:"}</Title>
            <Info>{props.info}</Info>
        </Container>
    );
}
