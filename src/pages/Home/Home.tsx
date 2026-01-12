export default function Home() {
    return (
       <div className="w-full bg-gradient-main flex justify-content-center">
                <div className="flex flex-column lg:col-8 md:col-10 col-12 justify-content-center align-items-center mb-4">
                    <div className="text-center mb-4 p-2 md:p-0">
                        <h1 className="display-4">Start exploring yourself today</h1>
                    </div>
                    <div className="col-10 md:col-12 flex flex-row align-items-center justify-content-center">
                        <p className="text-center">Pick a test and unlock insights into your personality, intellect, habits, or emotional patterns.
                          <br />  Instant results. Expert-designed. Affordable
                        </p>
                    </div>
                    <div className="flex justify-content-center">
                        <a href="/tests?page=1&from=10&itemsPerPage=10"
                            className="btn-main primary-btn">
                            <svg width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.1313 9.75H3V8.25H12.1313L7.93125 4.05L9 3L15 9L9 15L7.93125 13.95L12.1313 9.75Z"
                                    fill="white" />
                            </svg>
                            Brows all tests
                        </a>
                    </div>
                </div>
            </div >
    )
}