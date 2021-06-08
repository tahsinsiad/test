import styled from '@emotion/styled';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const PostDate = ({ date }) => {
  return (
    <DateStyle>
      {`${new Date(date).getUTCDate()} ${monthNames[new Date(date).getUTCMonth()]} ${new Date(
        date
      ).getUTCFullYear()}`}
    </DateStyle>
  );
};

const DateStyle = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 20px;
  margin-top: 10px;
`;

export default PostDate;
