import DealsView from './deals-view'
import { getDeals } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash';
import NoDealsView from './deals-view-no-deals'

function DealsViewHandler() {
  const { deals } = useSelector(state => state.dealsData);
  const { error } = useSelector(state => state.dealsData);
  const dispatch = useDispatch();

  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);

  const renderDealView = () => {
    if ((_.isEmpty(error)) && (!_.isEmpty(deals))) {
      return  <DealsView deals={deals} />
    } else if (!_.isEmpty(error)) {
      return (
        <div className="float-container col-md-8">
            <p>Sorry, something went wrong, please try again at a later time.</p>
        </div>
      )
    }
  };

  return (
    <>
      {renderDealView()}
    </>
  );
};

export default DealsViewHandler;
