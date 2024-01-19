require("dotenv").config({ path: ".env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { verifyToken } = require("./helpers/authHelper");

const app = express();

const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  // Check if the error is a JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle JSON parsing error
    return res.status(400).json({ error: "Invalid Input" });
  }
});


// Swagger System

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "ProjectX API",
      version: "1.0.0",
    },
    servers: [{ url: process.env.BASE_URL }],
  },
  apis: ["./routes/countryRoutes.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware Authenticated

// Router

const countryRouter = require("./routes/countryRoutes")(express.Router());
const stateRouter = require("./routes/stateRoutes")(express.Router());
const cityRouter = require("./routes/cityRoutes")(express.Router());
const statusRouter = require("./routes/statusRoutes")(express.Router());
const testscoreRouter = require("./routes/testscoreRoutes")(express.Router());
const intakeRouter = require("./routes/intakeRoutes")(express.Router());
const studylevelRouter = require("./routes/studylevelRoutes")(express.Router());
const vendorRouter = require("./routes/vendorRoutes")(express.Router());
const disciplineRouter = require("./routes/disciplineRoutes")(express.Router());
const institutionRouter = require("./routes/institutionRoutes")(
  express.Router()
);
const programRouter = require("./routes/programRoutes")(express.Router());
const agentRouter = require("./routes/agentRoutes")(express.Router());
const leadSourceRouter = require("./routes/leadSourceRoutes")(express.Router());
const leadStageRouter = require("./routes/leadStageRoutes")(express.Router());
const studentRouter = require("./routes/studentRoutes")(express.Router());
const authRouter = require("./routes/authRoutes")(express.Router());
const signupRouter = require("./routes/signupRoutes")(express.Router());
const postRouter = require("./routes/postRouters")(express.Router()); 
const postCategoriesRouter = require("./routes/postCategoriesRouters")(express.Router()); 

app.use("/country", verifyToken, countryRouter);
app.use("/institution", institutionRouter);
app.use("/students", studentRouter);
app.use("/program", programRouter);
app.use("/leadSource", leadSourceRouter);
app.use("/leadStage", leadStageRouter);
app.use("/agent", agentRouter);
app.use("/state", stateRouter);
app.use("/city", cityRouter);
app.use("/intake", intakeRouter);
app.use("/status", statusRouter);
app.use("/testscore", testscoreRouter);
app.use("/discipline", disciplineRouter);
app.use("/studylevel", studylevelRouter);
app.use("/vendor", vendorRouter);
app.use("/auth", authRouter);
app.use("/signup", signupRouter);
app.use("/post", postRouter);
app.use("/post-categories", postCategoriesRouter);

app.listen(port, (err) => {
  console.log(`Hii Welcome to ProjectX!! using port ${port}`);
});
