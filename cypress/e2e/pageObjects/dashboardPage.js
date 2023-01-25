class Dashboard {
    elements = {
        getDashboardHeader: () => cy.get('h1 a span'),
        getDashboardNav: () => cy.get('.nav'),
        getVerificationText: () => cy.get('h3.mt-du-6 a'),
        getActionableItems: () => cy.get('.badge'),
        getPaymentApprovalsBtn: () => cy.get('a[href="#user/dashboard/approvePayments"]'),
        getPendingPaymentBtn: () => cy.get('a[href="#user/dashboard/pendingPayments"]'),
    }
}
export default Dashboard