import { render, screen } from '@testing-library/react';
import DocumentLoadFrame from '../documentLoadFrame';
import {
  DOCUMENTS_TITLE,
  HC_DROPZONE_SUBLABEL,
  HC_FORM_BACK,
  HC_FORM_NEXT,
  HC_FORM_SUBMIT,
} from '../../../constants';

import { DOCUMENTS } from '../../../ui/createHomeContentsInsuranceApplication/apartamentInsuranceForm/constants';
import { Button, Stepper } from '@/shared';
import { FormProvider, useForm } from 'react-hook-form';

describe('Test CardBlock', () => {
  test('CardBlock should be render correctly', () => {
    const Wrapper = () => {
      const methods = useForm();
      const prevButton = <Button theme='third'>{HC_FORM_BACK}</Button>;

      const nextButton = (
        <Button theme='primary' size='s'>
          {HC_FORM_NEXT}
        </Button>
      );

      const submitButton = (
        <Button type='button' theme='primary' size='s'>
          {HC_FORM_SUBMIT}
        </Button>
      );

      const stepper = <Stepper totalSteps={5} currentStep={1} />;

      const controls = { stepper, prevButton, nextButton, submitButton };
      return (
        <FormProvider {...methods}>
          <DocumentLoadFrame {...controls} documents={DOCUMENTS} />
        </FormProvider>
      );
    };
    render(<Wrapper />);
    const elements = screen.getAllByText(HC_DROPZONE_SUBLABEL);
    expect(elements.length).toBe(4);
    expect(screen.getByText(DOCUMENTS_TITLE)).toBeInTheDocument();
    expect(screen.getByText(HC_FORM_BACK)).toBeInTheDocument();
    expect(screen.getByText(HC_FORM_SUBMIT)).toBeInTheDocument();
    expect(screen.getByText(DOCUMENTS[0].label)).toBeInTheDocument();
    expect(screen.getByText(DOCUMENTS[1].label)).toBeInTheDocument();
    expect(screen.getByText(DOCUMENTS[2].label)).toBeInTheDocument();
    expect(screen.getByText(DOCUMENTS[3].label)).toBeInTheDocument();
  });
});
