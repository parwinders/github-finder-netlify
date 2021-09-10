import React, { Fragment, useContext } from "react";
import Searchbar from "../layout/Searchbar";
import Userlist from "../users/Userlist";
import Spinner from "../users/Spinner";
import GithubContext from "../../context/github/githubContext";
const Home = () => {
    const githubContext = useContext(GithubContext);
    return (
        <Fragment>
            <Searchbar />
            {githubContext.loading ? <Spinner /> : <Userlist />}
        </Fragment>
    );
};

export default Home;
