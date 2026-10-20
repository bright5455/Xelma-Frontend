import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import MaskedBalance from './MaskedBalance';
import { useProfileStore } from '../store/useProfileStore';

function setProfile(streamerMode: boolean | null) {
  useProfileStore.setState({
    profile:
      streamerMode === null
        ? null
        : { avatarUrl: null, name: 'Tester', bio: '', twitterLink: '', streamerMode },
  });
}

describe('MaskedBalance', () => {
  afterEach(() => {
    setProfile(null);
  });

  describe('streamer mode on', () => {
    it('blurs the masked text and disables selection', () => {
      setProfile(true);
      const { container } = render(<MaskedBalance value="1,234.56 XLM" />);

      const inner = container.querySelector('span > span') as HTMLElement;
      expect(inner).toHaveClass('blur-sm');
      expect(inner).toHaveClass('select-none');
      expect(inner).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows the mask instead of the real value', () => {
      setProfile(true);
      const { container } = render(<MaskedBalance value="1,234.56 XLM" />);

      expect(container).toHaveTextContent('••••••');
      expect(container).not.toHaveTextContent('1,234.56');
    });

    it('sets an aria-label announcing the value is hidden', () => {
      setProfile(true);
      render(<MaskedBalance value="1,234.56 XLM" />);

      const el = screen.getByLabelText('Balance hidden because streamer mode is enabled');
      expect(el).toHaveAttribute('title', 'Hidden by streamer mode');
      expect(el.getAttribute('aria-label')).not.toContain('1,234.56');
    });

    it('uses a custom label and custom masked text', () => {
      setProfile(true);
      const { container } = render(
        <MaskedBalance value="50 vXLM" label="vXLM balance" maskedText="***" />,
      );

      expect(
        screen.getByLabelText('vXLM balance hidden because streamer mode is enabled'),
      ).toBeInTheDocument();
      expect(container).toHaveTextContent('***');
    });
  });

  describe('streamer mode off', () => {
    it('shows the real value without blur', () => {
      setProfile(false);
      const { container } = render(<MaskedBalance value="1,234.56 XLM" />);

      const inner = container.querySelector('span > span') as HTMLElement;
      expect(inner).toHaveTextContent('1,234.56 XLM');
      expect(inner).not.toHaveClass('blur-sm');
      expect(inner).not.toHaveClass('select-none');
    });

    it('exposes the value in the aria-label and title', () => {
      setProfile(false);
      render(<MaskedBalance value="1,234.56 XLM" label="Wallet" />);

      expect(screen.getByLabelText('Wallet: 1,234.56 XLM')).toHaveAttribute(
        'title',
        '1,234.56 XLM',
      );
    });

    it('treats a missing profile as streamer mode off', () => {
      setProfile(null);
      render(<MaskedBalance value="9 XLM" />);

      expect(screen.getByLabelText('Balance: 9 XLM')).toBeInTheDocument();
    });
  });

  it('forwards className to the wrapper', () => {
    setProfile(true);
    render(<MaskedBalance value="1 XLM" className="font-mono" />);

    expect(
      screen.getByLabelText('Balance hidden because streamer mode is enabled'),
    ).toHaveClass('font-mono');
  });
});
