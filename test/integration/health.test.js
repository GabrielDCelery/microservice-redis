const { expect } = require('chai');
const axios = require('axios');

describe('/health', () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it('checks if the service is running', async () => {
    // Given
    const { ENV_APP_PORT } = process.env;
    const endpoint = `http://localhost:${ENV_APP_PORT}/health`;

    // When
    const result = await axios.get(endpoint);
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal('OK');
  });
});
