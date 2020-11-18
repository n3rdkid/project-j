import { useState, useEffect } from "react"

import useRequest from "../hooks/use-request"
import JobCard from "../components/job-card"
import JobTypeSidebar from "../components/sidebar-job-type"
import Pagination from "../components/pagination/";

const BrowseJobs = () => {

    const handleChange = (e) => {
        let types = type;
        if (e.target.checked) {
            types[e.target.value] = true
        } else {
            delete types[e.target.value]
        }
        setType({ ...types });
        setPage(1);
    }
    const [jobs, setJobs] = useState([]);
    const [type, setType] = useState({});
    const [level, setLevel] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { doRequest, errors } = useRequest({
        url: `http://localhost:5000/api/jobs/${page}`,
        method: "get",
        params: {
            type: Object.keys(type),
            level
        }
    });

    useEffect(async () => {
        const { jobs, totalPages } = await doRequest();
        setJobs(jobs);
        setTotalPages(totalPages)
    }, [type, page, totalPages])// level])
    return <>
        <div className="container-xxl bg-light pt-5 pb-5">
            <div className="row">
                <div className="col-sm-7 col-md-8">
                    {jobs.map(({ jobTitle, company, jobType, jobLevel, location }) => <JobCard location={location} jobLevel={jobLevel} jobType={jobType} company={company} jobTitle={jobTitle} />)}

                </div>
                <div className="col-sm-5 col-md-4">
                    <JobTypeSidebar handleChange={handleChange} />
                </div>
            </div>
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        </div>
    </>
}


export default BrowseJobs;