import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import useRequest from "../hooks/use-request"
import JobCard from "../components/job-card"
import JobTypeSidebar from "../components/sidebar-job-type"
import Pagination from "../components/pagination/";
import JobLevelSidebar from "../components/sidebar-job-level";


const BrowseJobs = () => {

    const handleTypeChange = (e) => {
        let types = type;
        if (e.target.checked) {
            types[e.target.value] = true
        } else {
            delete types[e.target.value]
        }
        setType({ ...types });
        setPage(1);
    }
    const handleLevelChange = (e) => {
        let levels = level;
        if (e.target.checked) {
            levels[e.target.value] = true
        } else {
            delete levels[e.target.value]
        }
        setLevel({ ...levels });
        setPage(1);
    }
    const [isLoading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [type, setType] = useState({});
    const [level, setLevel] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { doRequest, errors } = useRequest({
        url: `http://localhost:5000/api/jobs/${page}`,
        method: "get",
        params: {
            type: Object.keys(type),
            level: Object.keys(level)
        },
        onSuccess: () => {
            setLoading(false)
        }
    });

    useEffect(async () => {
        setLoading(true)
        const { jobs, totalPages } = await doRequest();
        setJobs(jobs);
        setTotalPages(totalPages)
    }, [type, page, totalPages, level])
    return <>
        <div className="container-xxl bg-light pt-5 pb-5">
            <div className="row">
                <div className="col-sm-7 col-md-8">
                    {isLoading ? <>

                        <Skeleton count={16} />
 
                    </> :
                        jobs.map(({ jobTitle, company, jobType, jobLevel, location }) => <JobCard location={location} jobLevel={jobLevel} jobType={jobType} company={company} jobTitle={jobTitle} />)}
                </div>
                <div className="col-sm-5 col-md-4">
                    <div className="row">
                        <div className="col">
                            <JobTypeSidebar handleChange={handleTypeChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <JobLevelSidebar handleChange={handleLevelChange} />
                        </div>
                    </div>
                </div>
                <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            </div>
        </div>
    </>
}


export default BrowseJobs;