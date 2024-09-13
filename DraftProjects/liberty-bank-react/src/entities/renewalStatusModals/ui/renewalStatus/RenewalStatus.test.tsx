import { RenewalStatus } from '.';
import { render, screen } from '@testing-library/react';
import { PROLONGATION_MODAL } from '../../constants';

const MockRenewalStatus = {
  handleCancel: () => {},
};

describe('Renewal Status', () => {
  test('data is displayed RenewalStatus correctly when autoRenewal false', () => {
    render(<RenewalStatus {...MockRenewalStatus} autoRenewal={false} />);
    expect(
      screen.getAllByText(/Автоматическая пролонгация депозита отключена/i)[0].textContent,
    ).toEqual(PROLONGATION_MODAL.titleProlongationRemoved);

    expect(screen.getByText(PROLONGATION_MODAL.backToMainBtnText)).toBeInTheDocument();
  });

  test('data is displayed RenewalStatus correctly when autoRenewal true', () => {
    render(<RenewalStatus {...MockRenewalStatus} autoRenewal />);
    expect(screen.getAllByText(/Ваш депозит успешно пролонгирован/i)[0].textContent).toEqual(
      PROLONGATION_MODAL.titleProlongationDone,
    );

    expect(screen.getByText(PROLONGATION_MODAL.backToMainBtnText)).toBeInTheDocument();
  });
});
