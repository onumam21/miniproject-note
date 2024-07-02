const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("access token: ${token}");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    console.log(user);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };

//อันนี้คือการสร้าง middleware function เอาไว้สร้าง tools authicate token function
//jwt เป็นไลบารลี่ที่เราดาวน์โหลดมา จะเอาไว้ authicate token ของ user
//เพราะเป็น middleware จึงจำเป็นต้องจบด้วย next();
//1.จะเข้า header ของ ...
