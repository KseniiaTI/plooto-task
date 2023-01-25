class Login {
    elements = {
        getEmailField: () => cy.get('#email'),
        getPasswordField: () => cy.get('#passphrase'),
        getSignInBtn: () => cy.get('.form-group .btn')
    }
}
export default Login