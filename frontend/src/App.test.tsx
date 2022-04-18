import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import CreateHero from './components/CreateHero';



const mockedSubmission = jest.fn();

test('check if the login page renders correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Don't have an account/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if Submit button is present in the CreateHero component', () => {
  render(<CreateHero/>)
  const linkElement = screen.getByText(/Create/i);
  expect(linkElement).toBeInTheDocument();
})

test('check if logn works', () => {
  render(<App/>)
  const inputName = screen.getByLabelText(/name/i);
  const inputPassword= screen.getByLabelText(/Password/i);
  const login = screen.getByRole('button', {name: /Sign In/i})
  fireEvent.click(inputName)
  fireEvent.change(inputName, { target: { value: 'Testa' } });
  fireEvent.click(inputPassword)
  fireEvent.change(inputPassword, { target: { value: '1234' } });
  fireEvent.click(login)
  
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTAzMDc0MDgsImV4cCI6MTY1MDM5MzgwOH0.bui0KLQRTDc1uQqZj7MyrAetsqy58eJtFEJr1D8k0y8',
  });
 
})

describe("check hero creation", () => {
  it('should render input element', () => {
      render(
          <CreateHero />
      );
      const inputElement = screen.getByLabelText(/name/i);
      expect(inputElement).toBeInTheDocument();
  });
  it('check if name changes, when updated', () => {
    render(
        <CreateHero />
    );
    const inputElement = screen.getByLabelText(/name/i)
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Superman" } })
    expect((inputElement as HTMLInputElement).value).toBe("Superman")
  });
  it('check if submit button works', () => {
    render(
        <CreateHero
          onSubmit={mockedSubmission}
        />
    );
    const inputElement = screen.getByLabelText(/name/i)
    const submitElement = screen.getByRole('button', {name: /Create/i})
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Superman" } })
    fireEvent.click(submitElement)
    expect(mockedSubmission).toBeCalled()
  });
  it('check if value gets cleared after submition', () => {
    render(
        <CreateHero
          onSubmit={mockedSubmission}
        />
    );
    const inputElement = screen.getByLabelText(/name/i)
    const submitElement = screen.getByRole('button', {name: /Create/i})
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Superman" } })
    fireEvent.click(submitElement)
    expect((inputElement as HTMLInputElement).value).toBe("")
  });
})

