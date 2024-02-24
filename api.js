const fastify = require("fastify")({ logger: true });
require("dotenv").config();
//const connection = require("./Database/conn.js");
const cors = require("@fastify/cors");

const PORT = process.env.PORT || 7070;
fastify.register(cors);

function queryDatabase(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}
// Register Fastify Swagger
fastify.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Book CRUD API',
      description: 'API documentation for Book CRUD operations',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'books', description: 'Books related endpoints' }
    ]
  },
  exposeRoute: true
});


        // ========== Base Route For testing ===================//
fastify.get("/", async (request, reply) => {
  return { hello: "User All thing work preety well 🎉" };
});


                   // ========  GET ALL BOOKS ==================//
fastify.get("/getallbooks", async (request, reply) => {
  try {
    const results = await queryDatabase("SELECT  * FROM bookcrud;");
    return { result: results };
  } catch (err) {
    console.error("Error:", err);
    reply.code(500).send({ error: "Internal server error" });
  }
});


                      // ======= ADD BOOK DETAILS ==================//
fastify.post("/addbook", async (request, reply) => {
  try {

    const { BOOKNAME, BOOKAUTHOR, BOOKGENRE, BOOKTYPE } = request.body;
    console.log("Received data:", { BOOKNAME, BOOKAUTHOR, BOOKGENRE, BOOKTYPE });
    const result = await queryDatabase(`INSERT INTO bookcrud (BOOKNAME, BOOKAUTHOR, BOOKGENRE, BOOKTYPE) VALUES ('${BOOKNAME}', '${BOOKAUTHOR}', '${BOOKGENRE}', '${BOOKTYPE}')`);
    return { result: result, message: "Book added successfully." };
  
  } catch (error) {
    console.error("Error:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
});


                    //======= UPDATE BOOK DETAILS ================//
fastify.patch("/updatebook/:id", async (request, reply) => {
  try {
    const { id } = request.params; // Use 'id' instead of 'BOOKID'
    const { BOOKNAME, BOOKAUTHOR, BOOKGENRE, BOOKTYPE } = request.body; 
    const updateQuery = ` UPDATE bookcrud SET BOOKNAME='${BOOKNAME}', BOOKAUTHOR='${BOOKAUTHOR}', BOOKGENRE='${BOOKGENRE}', BOOKTYPE = '${BOOKTYPE}' WHERE BOOKID=${id};`;
    const result = await queryDatabase(updateQuery);
    return { result: result, message: `Book with ID ${id} updated successfully.` };
  } catch (error) {
    console.error("Error:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
});


                //======== DELETE BOOK DETAILS ==================//
fastify.delete("/deletebook/:id", async (request, reply) => {
  try {

    const { id } = request.params;
    const deleteQuery = `DELETE FROM bookcrud WHERE BOOKID = ${id};`;
    const result = await queryDatabase(deleteQuery);
    return { result: result, message: `Book with ID ${id} deleted successfully.` };

  } catch (error) {
    console.error("Error:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
});


const start = async () => {
  try {
    await fastify.listen(PORT);
    console.log("Server 🖥️   is  running on", fastify.server.address());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
