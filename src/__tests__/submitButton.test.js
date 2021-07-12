import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SubmitButton from '../components/SubmitButton/submitButton';

describe('SubmitButton Component', () => {
  test('show submit button', async () => {
    render(
      <SubmitButton> Submit </SubmitButton>,
    );
    expect(await screen.findByText('Submit')).toBeInTheDocument();
  });
});
