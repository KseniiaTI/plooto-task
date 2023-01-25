
/// <reference types="cypress"/>

import Login from "../e2e/pageObjects/loginPage";
import Selection from "../e2e/pageObjects/companySelectionPage";
import Dashboard from "../e2e/pageObjects/dashboardPage";
import Approvals from "../e2e/pageObjects/paymentApprovalsPage";
import Pending from "../e2e/pageObjects/pendingPaymentsPage";
import ApprovalPayment from "../e2e/pageObjects/paymentApprovalPage";

const login = new Login();
const selection = new Selection();
const dashboard = new Dashboard();
const approvals = new Approvals();
const pending = new Pending();
const approvalPayment = new ApprovalPayment();

describe('Login page', function () {

    beforeEach(function () {
        cy.fixture('plooto').then(data => {
            this.data = data;
        })
        cy.visit('/login.html')
    })

    it('Verify login page elements are visible', function () {
        //these tests would ideally be broken down into three separate tests
        login.elements.getEmailField().should('be.visible')
        login.elements.getPasswordField().should('be.visible')
        login.elements.getSignInBtn().should('be.visible')
    })

    it('Clicking "Sign In" button navigates the user to the Company Selection screen', function () {
        login.elements.getEmailField().type('111')
        login.elements.getPasswordField().type('123')
        login.elements.getSignInBtn().click()
        cy.url().should('include', this.data.urlCompanySelection)
    })

})

describe('Company Selection page', function () {

    beforeEach(function () {
        cy.fixture('plooto').then(data => {
            this.data = data;
        })
        cy.visit('/company_select.html')
    })

    it('List of companies on top of the screen matches the requirements', function () {
        selection.elements.getCompaniesNav().each(($el, idx) => {
            if (idx < 5) {
                expect($el.text()).to.include(this.data.compNames[idx])
            }
        })
    })

    it('Clients table headers match the requirements', function () {
        selection.elements.getTableHeaders().each(($el, idx) => {
            if (idx < 3) {
                expect($el.text()).to.include(this.data.tableHeaders[idx])
            }
        })
    })

    it('List of client companies and their statuses is visible', function () {
        selection.elements.getListOfClients().should('be.visible')
    })

    it('Clicking "Plooto Inc" leads to the Dashboard', async function () {
        selection.elements.getListOfClients().contains('Plooto Inc').eq(0)
            .click()
            .should('have.text', this.data.Plooto)
    })

    it('Clicking "Record World" doesnt lead to the Dashboard', function () {
        selection.elements.getListOfClients().contains('Record World')
            .should('be.visible')
            .click({ force: true })
        cy.url().should('include', this.data.urlCompanySelection)
    })
})

describe('Dashboard page', function () {

    beforeEach(function () {
        cy.fixture('plooto').then(data => {
            this.data = data;
        })
        cy.visit('/dashboard.html')
    })

    it('Dashboard page displays the current status of the company verification', function () {
        dashboard.elements.getDashboardNav().contains('Verification Items').should('be.visible')
        dashboard.elements.getVerificationText().should('have.text', this.data.verificationText)
    })

    it('Dashboard page highhights actionable items', function () {
        dashboard.elements.getActionableItems().should('be.visible')
    })

    it('Clicking Payment Approvals leads to Payment Approvals page', function () {
        dashboard.elements.getPaymentApprovalsBtn().should('be.visible').click()
        cy.url().should('include', this.data.urlApprovals)
        approvals.elements.getApprovalsHeader().eq(0).should('have.text', this.data.approvalsHeaderText)
    })

    it('Clicking Pending Payments leads to Pending Payments page', function () {
        dashboard.elements.getPendingPaymentBtn().should('be.visible').click()
        cy.url().should('include', this.data.urlPending)
        pending.elements.getInTransitHeader().eq(1).should('have.text', this.data.pendingPaymentsText)
    })
})

describe('Payment Approvals page', function () {

    beforeEach(() => {
        cy.visit('/payment_approvals.html')
    })

    it('Payment Approvals Page displays a single payment that requires the users approval', function () {
        approvals.elements.getPaymentsAwaitingTab().should('be.visible')
        approvals.elements.getTableWithPayments().filter(':visible').should('have.length', 1)
    })
})

describe('Pending Payments page', function () {

    beforeEach(function () {
        cy.fixture('plooto').then(data => {
            this.data = data;
        })
        cy.visit('/pending_payments.html')
    })

    it('Pending Payments page displays ongoing payments', function () {
        pending.elements.getPendingPayablesTab().should('be.visible')
        pending.elements.getTableWithPendingPayments().should('be.visible')
    })

    it('Clicking "Cavages" navigates to a Payment Approval page', async function () {
        await pending.elements.getTableCells().each(($el) => {
            if ($el.text().includes(this.data.contactText)) {
                cy.wrap($el).click()
                cy.contains('Sent Payment Details').should('be.visible')
            }
        })

    })
})

describe('Payment Approval page', function () {

    beforeEach(function () {
        cy.fixture('plooto').then(data => {
            this.data = data;
        })
        cy.visit('/payment_approval.html')
    })

    it('On Payment Approval page Payment Details section is visible', function () {
        approvalPayment.elements.getHeadersSeaction().contains('Sent Payment Details').should('be.visible')
        approvalPayment.elements.getContactName().should('have.text', this.data.contactText)
    })

    it('On Payment Approval page Audit Trail is visible', function () {
        approvalPayment.elements.getSectionHeaders().contains('Audit Trail').should('be.visible')
        approvalPayment.elements.getAuditTimeline().should('be.visible')
    })

})