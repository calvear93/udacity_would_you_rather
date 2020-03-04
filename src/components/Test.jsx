import React from 'react';
import { connect } from 'react-redux';
import AppAction from '../store/actions/app';
import { Grid, Form, Button } from 'semantic-ui-react';

class Test extends React.Component
{
    state = {
        value: ''
    }

    componentDidMount()
    {
        this.props.dispatch(AppAction.Action(AppAction.Types.FETCH, { id: 1 }));
    }

    handleChange = (event) =>
    {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        this.props.dispatch(AppAction.Action(AppAction.Types.FETCH, { id: this.state.value }));
    }

    render()
    {
        const data = this.props.store;

        return (
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>ID:</label>
                                <input type='number' placeholder='ID User' value={this.state.value} onChange={this.handleChange} />
                            </Form.Field>
                            <Button type='submit'>Fetch</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={5}>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        {data.id}
                    </Grid.Column>
                    <Grid.Column>
                        {data.title}
                    </Grid.Column>
                    <Grid.Column>
                        {`${data.completed}`}
                    </Grid.Column>
                    <Grid.Column>
                        {process.env.REACT_APP_ENV}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

function mapStateToProps({ [AppAction.Key]: store })
{
    return { store };
}

export default connect(mapStateToProps)(Test);
