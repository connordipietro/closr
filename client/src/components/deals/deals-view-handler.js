import DealsView from './deals-view'
import { getCompaniesList, getDeals } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash';
import NoDealsView from './deals-view-no-deals'

function DealsViewHandler() {
  const { deals } = useSelector(state => state.dealsData);
  const dispatch = useDispatch();

  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
    dispatch(getCompaniesList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);

  const renderDealView = () => {
    if (!_.isEmpty(deals)) {
      return  <DealsView deals={deals} />
    }   
  };

  const renderNoDeals = () => {
    if (_.isEmpty(deals)) {
      return <NoDealsView />
    }
  }

  return (
    <>
      {renderDealView()}
      {renderNoDeals()}
    </>
    
  );
};

export default DealsViewHandler;
