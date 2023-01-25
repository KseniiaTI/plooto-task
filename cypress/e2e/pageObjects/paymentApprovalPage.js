class ApprovalPayment {
    elements = {
        getHeadersSeaction: () => cy.get('.details-header'),
        getContactName: () => cy.get('.col-md-6 span a'),
        getSectionHeaders: () => cy.get('.details-header'),
        getAuditTimeline: () => cy.get('.my-du-3'),
    }
}
export default ApprovalPayment