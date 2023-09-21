require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Handbars = require('handlebars');

async function main() {
  const template = fs.readFileSync(path.resolve(__dirname, 'nginx.conf.hbs'), 'utf8');
  const content = Handbars.compile(template)({
    domain: process.env.DEPLOY_DOMAIN,
    port: process.env.SERVER_PORT,
    ssl: process.env.ssl === 'true',
    ssl_certificate: process.env.ssl_certificate,
    ssl_certificate_key: process.env.ssl_certificate_key,
    root: path.resolve(__dirname, '../../dist') + '/',    
  })
  fs.writeFileSync(path.resolve(__dirname, 'nginx.conf'), content)
}

main()