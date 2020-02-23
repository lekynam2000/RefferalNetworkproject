import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllCompanies } from '../../actions/company';
function AllCompany({ companies, loading, getAllCompanies }) {
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);
  return (
    <div className='company-list'>
      {!loading &&
        companies.length > 0 &&
        companies.map((company, index) => {
          let {
            name,
            avatar,
            contact,
            description,
            benefit,
            culture,
            photo
          } = company;
          if (contact) {
            var { facebook, linkedin, web } = JSON.parse(contact);
          }
          return (
            <div key={index} className='company-item'>
              <div className='company-item-name'>{name}</div>
              <div className='company-item-avatar'>
                <img src={avatar} alt='' />
              </div>
              {description && (
                <div className='company-item-description'>{description}</div>
              )}
              {benefit && <div className='company-item-benefit'>{benefit}</div>}
              {culture && <div className='company-item-culture'>{culture}</div>}
              {photo && (
                <div className='company-item-photo'>
                  <img src={photo} alt='' width='100' height='100' />
                </div>
              )}
              <Fragment>
                {contact && (
                  <ul className='company-item-contact'>
                    (
                    <Fragment>
                      {facebook && (
                        <li key='facebook'>
                          <a href={facebook}>
                            <i class='fab fa-facebook-f'></i>
                          </a>
                        </li>
                      )}

                      {linkedin && (
                        <li key='linkedin'>
                          <a href={linkedin}>
                            <i class='fab fa-linkedin-in'></i>
                          </a>
                        </li>
                      )}

                      {web && (
                        <li key='web'>
                          <a href={web}>
                            <i class='far fa-globe'></i>
                          </a>
                        </li>
                      )}
                    </Fragment>
                    )
                  </ul>
                )}
              </Fragment>
            </div>
          );
        })}
    </div>
  );
}
const mapStatetoProps = state => ({
  companies: state.company.companies,
  loading: state.company.loading
});
export default connect(mapStatetoProps, { getAllCompanies })(AllCompany);
