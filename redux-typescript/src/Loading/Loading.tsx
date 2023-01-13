import React from "react";
import { FadeLoader } from "react-spinners";

export const Loading: React.FC = () => {
    return (
        <div>
            <FadeLoader color="#14A0BA" />
        </div>
    )
}