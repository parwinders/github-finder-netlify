import React, { useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";

const Userlist = () => {
    const githubContext = useContext(GithubContext);
    const user = githubContext.userArr;
    console.log("userlist", user);

    return (
        <div style={css}>
            {(window.ps = user.map((x) => <UserItem key={x.id} user={x} />))}
        </div>
    );
};
const css = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "1rem",
};

export default Userlist;
