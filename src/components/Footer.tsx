import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer bg-primary-reverse flex flex-wrap aling-content-center justify-content-center">
        <div className="flex col flex-wrap lg:col-8 md:col-10 col-12 grid">
          <div className="col-12 md:col-6 sm:col-8 lg:col-4 text-left">
            <h5>{t('FOOTER.about')}</h5>
            <p className="text-sm">
              {t('FOOTER.aboutText')}
            </p>
          </div>
          <div className="col-6 md:col-3 text-left">
            <h5>{t('FOOTER.links')}</h5>
            <ul className="list-unstyled">
              <li><a href="/">{t('FOOTER.Home')}</a></li>
              <li><a href="#">{t('FOOTER.Categories')}</a></li>
              <li><a href="#">{t('FOOTER.Tests')}</a></li>
            </ul>
          </div>
          <div className="col-6 md:col-3 text-left">
            <h5>{t('FOOTER.Support')}</h5>
            <ul className="list-unstyled">
              <li><a href="{% url 'document' 'terms_of_use' %}">{t('FOOTER.TermsOfUse')}</a></li>
              <li><a href="#">{t('FOOTER.PrivacyPolicy')}</a></li>
              <li><a href="#">{t('FOOTER.ContactUs')}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-sm col-12">
          {t('FOOTER.rights')}
        </div>
      </div>
    </>
  )
}

export default Footer