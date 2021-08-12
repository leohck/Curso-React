import { render, screen } from '@testing-library/react';
import { Posts } from '../Posts/index';
import {postsPropsMock} from "./mocks";

const props = postsPropsMock;

describe('<Posts />', () => {
   it('should render posts correctly', () => {
      render(<Posts {...props} />);
      expect(
          screen.getAllByRole('heading', {name: /title/i})
      ).toHaveLength(props.posts.length);
   });

   it('should match snapshot', () => {
      const { container } = render(<Posts {...props} />);
      expect(
          container.firstChild
      ).toMatchSnapshot();
   });
});