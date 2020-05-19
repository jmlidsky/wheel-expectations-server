module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: 'https://wheel-expectations-client.now.sh',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jill:password@localhost/wheel-expectations',
    TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jill:password@localhost/wheel-expectations-test',
}