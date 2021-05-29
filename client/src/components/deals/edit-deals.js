import { Button } from 'react-bootstrap';

function AddDeal() {
  
  const handleEditDeals = () => {
    console.log('click')
  }

  return (
    <div>
      <Button variant="primary" className="edit-deals-button " onClick={() => handleEditDeals()}>Edit Deals</Button>
    </div>
  );
};

export default AddDeal;