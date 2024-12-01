import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <p>The page does not exist.</p>
            <Link to={"/"}>Go to Main</Link>
        </div>
    );
};

export default PageNotFound;