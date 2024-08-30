/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {

        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'EKfwmhqN',
        database: 'webDevDB',

        host_dev: 'localhost',
        port_dev: '3306',
        user_dev: 'root',
        password_dev: 'EKfwmhqN',
        database_dev: 'webDevDB',
    }
};
//module.exports = nextConfig;
export default nextConfig;
