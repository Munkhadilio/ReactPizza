import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
    <ContentLoader className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="135" cy="125" r="125" />
        <rect x="0" y="274" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="420" rx="10" ry="10" width="90" height="27" />
        <rect x="128" y="418" rx="25" ry="25" width="152" height="45" />
        <rect x="-3" y="326" rx="10" ry="10" width="280" height="76" />
    </ContentLoader>
)

export default PizzaSkeleton;

