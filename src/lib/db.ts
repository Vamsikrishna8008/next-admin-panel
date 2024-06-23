import mysql from "mysql2/promise";
// export const clientUrl = process.env.CLIENT_URL || 'https://sbtravels.ymtsindia.net/';

export async function query({
  query,
  values = [],
}: {
  query: string;
  values: any[];
}) {
  const dbconnection = await mysql.createConnection(
    "mysql://root:root@localhost:3307/demo"
  );
  const [results] = await dbconnection.execute(query, values);
  await dbconnection.end();
  return results;
}
