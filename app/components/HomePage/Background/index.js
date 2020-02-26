import styled from 'styled-components';
import Background from '../images/background-apple-flower.jpg';

const BackgroundStyle = styled.div`
  background-image: url('${Background}');

  /* Add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);

  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export default BackgroundStyle;
