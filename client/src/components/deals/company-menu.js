import { Modal, Button, Form, useDropdownMenu } from 'react-overlays';
import styled from 'styled-components';

const MenuContainer = styled("div")`
  display: ${(p) => (p.show ? "flex" : "none")};
  min-width: 150px;
  position: absolute;
  z-index: 1000;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const CompanyMenu = ({ role, companiesList }) => {
  const { show, onClose, props } = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });
  return (
    <MenuContainer {...props} role={role} show={show}>
      {companiesList.map(company => {
        return (
          <button
            key={company}
            type="button"
            onClick={onClose}
            className="text-left hover:bg-brand-100 px-6 py-2"
          >
            {company.name}
          </button>
        );
      })}
      
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 1
      </button>
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 2
      </button>
    </MenuContainer>
  );
};

export default CompanyMenu