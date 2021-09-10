import React, { Fragment, useEffect } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Repos from "./Repos";
import { useContext } from "react";
import GithubContext from "../../context/github/githubContext";

const Userpage = (props) => {
    const githubContext = useContext(GithubContext);

    useEffect(() => {
        try {
            githubContext.getUser(props.match.params.login);
            githubContext.getUserRepos(props.match.params.login);
        } catch (e) {
            console.log(e, "MY EROOOR");
            throw e;
        }
    }, []);

    const {
        public_gists,
        public_repos,
        following,
        login,
        avatar_url,
        followers,
        bio,
        location,
        hirable,
        html_url,
    } = githubContext.singleUser;
    if (githubContext.loading) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hirable:{" "}
            {hirable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <br />
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        className='round-img'
                        alt=''
                        style={{ width: "160px" }}
                    />
                    <h1>{login}</h1>
                    <h2>{location && <p>location:{location}</p>}</h2>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3> <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                    </a>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers:{followers}</div>
                <div className='badge badge-success'>Following:{following}</div>
                <div className='badge badge-dark'>
                    Public Repos:{public_repos}
                </div>
                <div className='badge badge-light'>
                    Public gists:{public_gists}
                </div>
            </div>
            <Repos repos={githubContext.repos} />
        </Fragment>
    );
};

export default Userpage;
