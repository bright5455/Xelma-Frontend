import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HowItWorks from './HowItWorks';

describe('HowItWorks', () => {
  it('exposes a labelled landmark', () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole('region', { name: 'How It Works' }),
    ).toBeInTheDocument();
  });

  it('renders the three steps in order', () => {
    render(<HowItWorks />);
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Connect Freighter');
    expect(items[1]).toHaveTextContent('Practice vXLM');
    expect(items[2]).toHaveTextContent('Submit prediction');
  });

  it('does not render the contributor placeholder', () => {
    render(<HowItWorks />);
    expect(screen.queryByText(/Rebuild How It Works/i)).not.toBeInTheDocument();
  });
});
