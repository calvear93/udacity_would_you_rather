import React from 'react';
import { Input, Label } from 'semantic-ui-react';

class QuestionInput extends React.PureComponent
{
    state = {}

    render()
    {
        const { id, onChange, placeholder, minInputLength = 5 } = this.props;

        const value = this.state[id];
        const hasError = value && value.length < minInputLength && value.length > 0;

        return (
            <>
                <Input
                    id={ id }
                    className='question-input'
                    label={ { icon: 'pencil' } }
                    labelPosition='right corner'
                    placeholder={ placeholder }
                    onChange={ onChange }
                />
                {hasError && (
                    <Label pointing>Please enter a value of min {minInputLength} chars</Label>
                )}
            </>
        );
    }
}

export default QuestionInput;
