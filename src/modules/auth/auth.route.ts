// import { Router } from "express";
// import { register } from "./auth.controller";

// const router = Router();

// router.post("/register", register);

// export default router;

import { Router } from "express";
import { login, register } from "./auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;