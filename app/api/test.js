import client from "./client";

const register = (testInfo) => client.get("/tests", testInfo);

export default { register };
