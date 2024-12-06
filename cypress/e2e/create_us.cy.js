describe('Create User Story', () => {
  it('should create a new user story', () => {
    cy.request({
      method: 'POST',
      url: '/userStories',
      body: {
        user: 1, // Replace with a valid user ID
        action: 'Write a test',
        need: 'To ensure the application works correctly',
        assignedTo: 1, // Replace with a valid user ID
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('action');
      expect(response.body).to.have.property('need');
      expect(response.body).to.have.property('assignedTo');
    });
  });
});
