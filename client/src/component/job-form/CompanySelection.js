import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllCompanies } from '../../actions/company';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const CompanySelection = ({
  company: { companies, loading },
  onChangeParent,
  defaultValue = '',
  getAllCompanies
}) => {
  const [CompanyValid, SetCompanyValid] = useState('');
  const [companyName, setCompanyName] = useState(defaultValue);
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  const validateCompany = name => {
    var flag = false;
    companies.forEach(company => {
      if (company.name.toString() === name.toString()) {
        flag = company._id;
      }
    });
    return flag;
  };
  const onChange = e => {
    var value = e.target.value;
    setCompanyName(value);
    console.log(value);
    console.log(defaultValue);
    if (validateCompany(value) != false) {
      SetCompanyValid(
        <span>
          <i className='fa fa-check'></i> Valid Company
        </span>
      );
      onChangeParent(validateCompany(value), value);
    } else {
      SetCompanyValid(
        <span>
          <i className='fa fa-close'></i> Please Enter A Valid Company
        </span>
      );
      onChangeParent('', '');
    }
  };
  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          <input
            type='text'
            list='companies'
            name='company'
            value={companyName}
            onChange={e => {
              onChange(e);
            }}
          />
          <datalist id='companies'>
            {companies.map(com => (
              <option key={com._id}>{com.name}</option>
            ))}
          </datalist>
          <small>{CompanyValid}</small>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

CompanySelection.propTypes = {
  company: PropTypes.object.isRequired,
  onChangeParent: PropTypes.func.isRequired,
  getAllCompanies: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  company: state.company
});

export default connect(mapStatetoProps, { getAllCompanies })(CompanySelection);
