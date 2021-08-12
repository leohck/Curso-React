import {render, screen} from "@testing-library/react";
import {Button} from "./index";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        const button_text = 'Load more';
        render(<Button text={button_text}/>);
        const button = screen.getByRole('button', {name: button_text});
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('class', 'button');
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text='Load more' onClick={fn}/>);
        const button = screen.getByRole('button', {name: /load more/i});
        userEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button text='Load more' disabled={true}/>);
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled prop is false or not passed', () => {
        render(<Button text='Load more'/>);
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeEnabled();
    });
});