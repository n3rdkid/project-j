import Link from "next/link"

const Search = () => {
    return (
        <div className="search container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="nav nav-tabs text-center justify-content-center" id="search-tab" role="tablist" aria-orientation="vertical">
                        <Link href="#">
                            <a className="nav-link active find-job" id="find-job-pill" data-toggle="tab" href="#find-job" role="tab" aria-controls="v-pills-1" aria-selected="true">Find a Job</a>
                        </Link>
                        <Link href="#">
                            <a className="nav-link find-candidate" id="find-candidate-pill" data-toggle="tab" href="#find-candidate" role="tab" aria-controls="v-pills-2" aria-selected="false">Find a Candidate</a>
                        </Link>
                    </div>
                </div>
                <div className="col-12 tab-content">
                    <div className="tab-pane fade show active" id="find-job">
                        <div className="search-job-form">
                        <form>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <input type="text" className="form-control" placeholder="eg. Garphic. Web Developer" />
                                    </div>
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <select className="form-select">
                                            <option value="">Employment Type</option>
                                            <option value="">Full Time</option>
                                            <option value="">Part Time</option>
                                            <option value="">Freelance</option>
                                            <option value="">Internship</option>
                                            <option value="">Temporary</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <button type="submit" className="form-control btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </form>
                   </div>
                    </div>
                    <div className="tab-pane fade" id="find-candidate">
                        <div className="search-job-form">
                            <form>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <input type="text" className="form-control" placeholder="eg. Garphic. Web Developer" />
                                    </div>
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <select className="form-select">
                                            <option value="">Employment Type</option>
                                            <option value="">Full Time</option>
                                            <option value="">Part Time</option>
                                            <option value="">Freelance</option>
                                            <option value="">Internship</option>
                                            <option value="">Temporary</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 col-lg-4 mb-3">
                                        <button type="submit" className="form-control btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Search;
