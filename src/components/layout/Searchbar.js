import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Searchbar = (props) => {
    const alertContext = useContext(AlertContext);
    const githubContext = useContext(GithubContext);

    const [name, setName] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("clicked Submit ", e);
        if (name) {
            githubContext.searchFn(name);
            setName("");
        } else {
            console.log("Search can not be empty");
            alertContext.alertFn("Search can not be empty", "danger");
        }
    };

    const onChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div>
            <form className='form lol lol1 goodcss' onSubmit={onSubmit}>
                <input
                    type='text'
                    name='name'
                    onChange={onChange}
                    value={name}
                    placeholder='Search For User Here'
                />
                <input
                    className='btn btn-dark btn-block'
                    type='submit'
                    value='Search...'
                    readOnly={true}
                />
            </form>
            {githubContext.userArr.length > 0 && (
                <input
                    className='btn btn-light btn-block text-center'
                    value='Clear'
                    onClick={githubContext.clearResult}
                    readOnly={true}
                />
            )}
        </div>
    );
};

export default Searchbar;
