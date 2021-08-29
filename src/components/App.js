import React, {Fragment, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "./Footer";
import Bar from "./Bar";
import Hero from "./Hero";
import CardsContainer from "./CardsContainer";
import {useDispatch} from "react-redux";
import {fetchCurrentProfiles} from "../redux/requests/fetchCurrentProfiles";
import {fetchInitData} from "../redux/requests/fetchInitData";
import {getLoaderData} from "../redux/requests/getLoader";

export default function App() {
    const dispatch = useDispatch()
    const [progress, setProgress] = React.useState(0);
    const [filters, setFilters] = useState(
        {
                    sex: 1,
                    status: 4,
                    hasPhoto: 1,
                    isClosed: false,
                    canAccessClosed: true,
                    sort: 0,
                    offset: 0,
                    instagram: true,
                    morePhotos: true,
                    count: 950,
                    birthDay: 31,
                    birthMonth: 8,
                    searchFields: ['lists'],
                    getUserFields: ['counters', 'relatives', 'relation', 'connections', 'exports']
                }
    );

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress !== 0) getLoaderTempData();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [progress]);

    const initSearchHandler = (newFilters) => {
        setFilters(newFilters);
        fetchInitData(dispatch, newFilters);
        getLoaderTempData();
    }

    function getLoaderTempData() {
        getLoaderData().then(res => {
            if (res.current === 0 || res.total === 0) {
                setProgress(1);
            } else {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : res.current / res.total * 100));
            }
        });
    }

    const searchHandler = (newFilters) => {
        setFilters(newFilters);
        fetchCurrentProfiles(dispatch, newFilters);
    }

    return (
        <Fragment>
            <CssBaseline />
            <Bar/>
            <main>
                <Hero filters={filters}
                      searchHandler={(newFilters) => searchHandler(newFilters)}
                      initSearchHandler={(newFilters) => initSearchHandler(newFilters)}
                      progress={progress}
                />
                <CardsContainer/>
            </main>
            <Footer/>
        </Fragment>
    );
}