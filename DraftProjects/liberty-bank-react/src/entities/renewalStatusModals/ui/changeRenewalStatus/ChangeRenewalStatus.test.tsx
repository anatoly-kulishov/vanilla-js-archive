import { ChangeRenewalStatus } from '.';
import { render, screen } from '@testing-library/react';
import { PROLONGATION_MODAL } from '../../constants';

const MockChangeRenewalStatus = {
  handleOpenRenewalStatusModal: () => {},
  handleCancel: () => {},
};

describe('changeRenewalStatus', () => {
  test('the data is displayed correctly ChangeRenewalStatus when autoRenewal false', () => {
    render(<ChangeRenewalStatus {...MockChangeRenewalStatus} autoRenewal={false} />);
    expect(
      screen.getAllByText(/Вы действительно хотите пролонгировать депозит?/i)[0].textContent,
    ).toEqual(PROLONGATION_MODAL.titleIsAgreeProlongation);

    expect(screen.getByText(PROLONGATION_MODAL.yes)).toBeInTheDocument();
    expect(screen.getByText(PROLONGATION_MODAL.cancel)).toBeInTheDocument();
  });

  test('data is displayed RenewalStatus correctly when autoRenewal true', () => {
    render(<ChangeRenewalStatus {...MockChangeRenewalStatus} autoRenewal />);
    expect(
      screen.getAllByText(/Вы действительно хотите отказаться от пролонгации депозита?/i)[0]
        .textContent,
    ).toEqual(PROLONGATION_MODAL.titleIsRefusalProlongation);

    expect(screen.getByText(PROLONGATION_MODAL.yes)).toBeInTheDocument();
    expect(screen.getByText(PROLONGATION_MODAL.cancel)).toBeInTheDocument();
  });
});
