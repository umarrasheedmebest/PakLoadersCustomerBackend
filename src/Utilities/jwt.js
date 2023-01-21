const JWT = require("jsonwebtoken");

const signAccessToken = async (userID) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "9999999999999999999h",
      issuer: "PakLoaders",
      audience: userID.toString(),
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(new Error("Internal server error."))
      } else {
        resolve(token);
      }
    })
  })
};

const forgetPassAccessToken = (email) => {
  return new Promise((resolve, reject) => {
    const payload = {
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "24",
      issuer: "PakLoaders",
      audience: email,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(new Error("Internal Server Error"));
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Error("Unauthorized error"));
  }
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        if (!req.headers["authorization"])
          return next(new Error("Unauthorized error"));
        const authHeader1 = req.headers["authorization"];
        const bearerToken1 = authHeader1.split(" ");
        const token1 = bearerToken1[1];
        const data1 = await verifyRefreshToken(token1);
        req.payload = { aud: data1 };
        return next();
      }
      if (err.name === "JsonWebTokenError") {
        return next(new Error("Unauthorized"));
      } else {

        return next(new Error(err.message));
      }
    } else {
      req.payload = payload;
      next();
    }
  });
};


// const verifyAccessToken = (req, res, next) => {
//   if (!req.cookies.accessToken) {
//     return next(new Error("Unauthorized error"));
//   }
//   const authHeader = req.cookies.accessToken;
//   const bearerToken = authHeader.split(" ");
//   const token = bearerToken[1];
//   JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         if (!req.headers["authorization"])
//           return next(new Error("Unauthorized error"));
//         const authHeader1 = req.headers["authorization"];
//         const bearerToken1 = authHeader1.split(" ");
//         const token1 = bearerToken1[1];
//         const data1 = await verifyRefreshToken(token1);
//         req.payload = { aud: data1 };
//         return next();
//       }
//       if (err.name === "JsonWebTokenError") {
//         return next(new Error("Unauthorized"));
//       } else {

//         return next(new Error(err.message));
//       }
//     } else {
//       req.payload = payload;
//       next();
//     }
//   });
// };

const signRefreshToken = (userID) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "9999999999999999999y",
      issuer: "PakLoaders",
      audience: userID,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        resolve(token);
      }
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return reject(new Error("Unauthorized"));
        }
        const userId = payload.aud;
        resolve(userId);
      }
    );
  });
};

module.exports = {
  signAccessToken,
  forgetPassAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
