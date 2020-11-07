import JobCard from "../components/job-card"
import JobTypeSidebar from "../components/sidebar-job-type"

const BrowseJobs = () => {
    return <>
        <div className="container-xxl bg-light pt-5 pb-5">
            <div className="row">
                <div className="col-sm-7 col-md-8">
                    <JobCard />
                    <JobCard />
                </div>
                <div className="col-sm-5 col-md-4">
                    <JobTypeSidebar />
                </div>
            </div>
        </div>
    </>
}


export default BrowseJobs;