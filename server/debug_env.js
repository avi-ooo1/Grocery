import 'dotenv/config';
console.log(`'${process.env.MONGODB_URL}'`);
console.log(`Length: ${process.env.MONGODB_URL.length}`);
console.log(`First char code: ${process.env.MONGODB_URL.charCodeAt(0)}`);
console.log(`Last char code: ${process.env.MONGODB_URL.charCodeAt(process.env.MONGODB_URL.length - 1)}`);
