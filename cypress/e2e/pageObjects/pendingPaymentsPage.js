class Pending {
    elements = {
        getInTransitHeader: () => cy.get('div h3.hidden-sm'),
        getPendingPayablesTab: () => cy.get('a[href="#pending_payables"]'),
        getTableWithPendingPayments: () => cy.get('tbody tr'),
        getTableCells: () => cy.get('tbody td:nth-child(1)'),
    }
}
export default Pending