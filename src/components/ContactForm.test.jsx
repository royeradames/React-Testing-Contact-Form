import React from 'react'
import { render, screen, fireEvent, act} from '@testing-library/react'
import ContactForm from './ContactForm'

test('Renders form without errors', () => {
    render(<ContactForm />)
})

test('Adds new user when form is filled out and submitted', async () => {
    //render Contact form
    render(<ContactForm />)
    //query for the different inputs
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    //fill out the inputs
    fireEvent.change(firstNameInput, { target: {value: 'Royer'}})
    fireEvent.change(lastNameInput, {target: {value:'Adames'}})
    fireEvent.change(emailInput, { target: {value: 'RoyerAAdames@gmail.com'}})
    fireEvent.change(messageInput, {target: { value: 'Royer was here.'}})
    //query for the submit button
    const submitBtn = screen.getByRole('button', {type:/submit/i})
    //click on the submit button
    await act(async() => fireEvent.click(submitBtn)) 
    //make our assertions
    expect(screen.getByText(/roy/i)).toBeInTheDocument()

})