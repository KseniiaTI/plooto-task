class Approvals {
    elements = {
        getApprovalsHeader: () => cy.get('div h3.hidden-sm'),
        getPaymentsAwaitingTab: () => cy.get('a[href="#approve_payments"]'),
        getTableWithPayments: () => cy.get('tbody tr.editRow'),
    }
}
export default Approvals