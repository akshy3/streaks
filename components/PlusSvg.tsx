import Svg, { Path } from "react-native-svg"


const SvgComponent = (props:any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} {...props}>
    <Path fill="none" d="M0 0h50v50H0z" />
    <Path fill="none" stroke="#fff" strokeWidth="5" d="M9 25h32M25 9v32" />
  </Svg>
)
export default SvgComponent
