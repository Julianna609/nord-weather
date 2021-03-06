import React, { Component } from 'react';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
    // FormText,
    FormFeedback,
} from 'reactstrap';

class FormInputs extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            validate: {
                emailState: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    validateEmail = e => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    submitForm = e => {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`)
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className='form-wrapper'>
                <h2>Log In</h2>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="myemail@email.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={(e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                }}
                            />
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your email. Please input a correct email.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default FormInputs;