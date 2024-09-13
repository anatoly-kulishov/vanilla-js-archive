import { PATH_PAGE, Modal, InfoFrame, CardType } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { useState, FC } from 'react';
import { TEXT, ICON, CHECKBOX_TEXT, URL_LINK } from '../constants';

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvestModal: FC<IModal> = ({ isModalOpen, setIsModalOpen }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const onPrimaryButtonClick = () => setIsModalOpen(false);
  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <InfoFrame
        checkbox={{
          checked: isActive,
          onChange: () => setIsActive(!isActive),
          text: CHECKBOX_TEXT,
          link: URL_LINK,
        }}
        icon={ICON}
        primaryBtnText={TEXT.no}
        secondaryBtnText={TEXT.yes}
        title={TEXT.title}
        cardType={CardType.checkbox}
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={() => navigate(PATH_PAGE.investmentAccClosureAssets)}
      />
    </Modal>
  );
};

export default InvestModal;
