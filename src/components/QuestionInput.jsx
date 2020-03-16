import React from 'react';
import { Input, Label } from 'semantic-ui-react';

/**
 * Input for write a question in New Question page.
 *
 * @class QuestionInput
 * @extends {React.PureComponent}
 */
class QuestionInput extends React.PureComponent
{
    /**
     * Component state.
     *
     * @memberof QuestionInput
     */
    state = {}

    /**
     * Handles input change event.
     *
     * @param {any} event Input event.
     * @memberof QuestionInput
     */
    handleInputChange = (event) =>
    {
        const { id, onChange, minInputLength } = this.props;
        const value = event.target.value;
        const isValid = this.isValid(value, minInputLength);

        onChange(id, value, isValid);

        this.setState({ value });
    };

    /**
     * Whether current input is valid.
     *
     * @param {string} value Input value.
     * @param {number} minInputLength Min input length.
     * @memberof QuestionInput
     *
     * @returns {bool} Whether input valid.
     */
    isValid = (value, minInputLength) => value ? value.length >= minInputLength : false;

    /**
     * Whether error should be show.
     *
     * @param {string} value Input value.
     * @param {number} minInputLength Min input length.
     *
     * @memberof QuestionInput
     *
     * @returns {bool} Whether error should be show.
     */
    showError = (value, minInputLength) => value ? value.length < minInputLength && value.length > 0 : false;

    /**
     * Renders the input.
     *
     * @returns {JSX} Question input component.
     * @memberof QuestionInput
     */
    render()
    {
        const { id, placeholder, minInputLength } = this.props;
        const value = this.state.value;
        const showError = this.showError(value, minInputLength);

        return (
            <>
                <Input
                    id={ id }
                    className='question-input'
                    label={ { icon: 'pencil' } }
                    labelPosition='right corner'
                    placeholder={ placeholder }
                    onChange={ this.handleInputChange }
                    error={ showError }
                />
                {showError && (
                    <Label pointing>Please enter a value of min {minInputLength} chars</Label>
                )}
            </>
        );
    }
}

export default QuestionInput;
