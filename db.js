const Pool = require("pg").Pool;

const db = (config) => {
  const pool = new Pool({
    user: config.dbuser,
    host: config.dbhost,
    database: config.dbname,
    password: config.dbpassword,
    port: config.dbport,
  });

  const getMahasiswa = (request, response) => {
    const { npm } = request.params;
    pool.query(
      "SELECT * FROM mahasiswa WHERE npm = $1 FETCH FIRST ROW ONLY",
      [npm],
      (error, results) => {
        if (error) {
          return response
            .status(500)
            .send({ status: 500, message: "Internal Server Error" });
        }

        if (results.rowCount === 0)
          return response
            .status(404)
            .send({ status: 404, message: "npm tidak tersedia" });

        const mahasiswa = results.rows[0];

        return response.status(200).send({
          status: "OK",
          npm: mahasiswa.npm,
          nama: mahasiswa.nama,
        });
      }
    );
  };

  return {
    getMahasiswa,
  };
};

module.exports = db;
