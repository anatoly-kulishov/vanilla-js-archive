export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/fileTransformer.ts',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(gif|ttf|eot|png|css|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/test/__mock__/svg.ts',
  },
};
