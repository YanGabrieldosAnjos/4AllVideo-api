// const {
//   MONGO_USER,
//   MONGO_PASSWORD,
//   DB_NAME,
//   DB_URI,
//   MONGO_USER_TEST,
//   MONGO_PASSWORD_TEST,
//   DB_NAME_TEST,
//   DB_URI_TEST,
//   NODE_ENV,
// } = process.env;

// export function getMongoOptions() {
//   if (NODE_ENV !== "test") {
//     return {
//       user: MONGO_USER!,
//       pass: MONGO_PASSWORD!,
//       useNewUrlParser: true,
//       dbName: DB_NAME!,
//       authSource: "admin",
//     };
//   }
//   return {
//     user: MONGO_USER_TEST!,
//     pass: MONGO_PASSWORD_TEST!,
//     useNewUrlParser: true,
//     dbName: DB_NAME_TEST!,
//     authSource: "admin",
//   };
// }

// export function getMongoUri() {
//   if (NODE_ENV !== "test") {
//     return DB_URI;
//   }
//   return DB_URI_TEST;
// }

// export default {
//   MONGO_OPTIONS: getMongoOptions(),
//   DB_URI: getMongoUri(),
// };
