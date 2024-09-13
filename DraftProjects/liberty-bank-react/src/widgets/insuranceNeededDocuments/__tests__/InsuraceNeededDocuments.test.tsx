import { render, screen } from '@testing-library/react';
import { InsuranceNeededDocument } from '../InsuranceNeededDocuments';
import { MemoryRouter } from 'react-router-dom';

describe('InsuranceNeededDocument component', () => {
  const mockNeededDocuments = {
    title: 'Sample Title',
    documents: [
      {
        id: 1,
        name: 'Document 1',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'Document 2',
        description: 'Description 2',
      },
    ],
  };

  const mockDocumentImage = 'sample-image.png';

  test('renders with correct props', () => {
    render(
      <MemoryRouter>
        <InsuranceNeededDocument
          neededDocuments={mockNeededDocuments}
          documentImage={mockDocumentImage}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockNeededDocuments.title)).toBeInTheDocument();
    Object.values(mockNeededDocuments.documents).forEach((document) => {
      expect(screen.getByText(document.name)).toBeInTheDocument();
      expect(screen.getByText(document.description)).toBeInTheDocument();
    });
  });
});
