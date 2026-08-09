module.exports = {
  api: {
    input: {
      target: '../../b10backend/backend/docs/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/endpoints',
      schemas: './src/api/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance'
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npx prettier --write'
    }
  },
  zod: {
    input: {
      target: '../../b10backend/backend/docs/openapi.json',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/api/zod',
    }
  }
};
