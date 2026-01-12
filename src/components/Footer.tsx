function Footer() {
  return (
    <>
      <div className="footer bg-primary-reverse ">
      <div className="flex flex-row col-12 grid">
        <div className="col-12 md:col-6 sm:col-8 lg:col-4">
          <h5>About Mono quiz</h5>
          <p className="text-sm">
            Our platform offers expert-designed tests to help you discover your true potential.
          </p>
        </div>
        <div className="col-6 md:col-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Tests</a></li>
          </ul>
        </div>
        <div className="col-6 md:col-3">
          <h5>Support</h5>
          <ul className="list-unstyled">
            <li><a href="{% url 'document' 'terms_of_use' %}">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="text-sm">
        © Mono quiz. All rights reserved.
      </div>
    </div>
    </>
  )
}

export default Footer