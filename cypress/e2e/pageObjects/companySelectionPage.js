class Selection {
    elements = {
        getCompaniesNav: () => cy.get('.nav-tabs').find('li'),
        getTableHeaders: () => cy.get('thead tr').find('th'),
        getListOfClients: () => cy.get('tbody tr'),
        getTableCell: () => cy.get('tbody td:nth-child(1)'),
    }
}
export default Selection