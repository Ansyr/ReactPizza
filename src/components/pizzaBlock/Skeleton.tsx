import React from "react"
import ContentLoader from "react-content-loader"


const Skeleton = () => (
  <ContentLoader 
    className="PizzaBlock"
    speed={0}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="126" cy="126" r="126" /> 
    <rect x="0" y="290" rx="10" ry="10" width="280" height="19" /> 
    <rect x="0" y="337" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="448" rx="10" ry="10" width="95" height="30" /> 
    <rect x="125" y="448" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton