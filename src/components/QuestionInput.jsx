import React from 'react';
import { Input, Label } from 'semantic-ui-react';

class QuestionInput extends React.PureComponent
{
    state = {}

    handleInputChange = (event) =>
    {
        const { id, onChange, minInputLength } = this.props;
        const value = event.target.value;
        const isValid = this.isValid(value, minInputLength);

        onChange(id, value, isValid);

        this.setState({ value });
    };

    isValid = (value, minInputLength) => value ? value.length >= minInputLength : false;

    showError = (value, minInputLength) => value ? value.length < minInputLength && value.length > 0 : false;

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
