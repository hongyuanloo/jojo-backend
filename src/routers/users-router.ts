import express, { Router, Request, Response } from "express";

const router = Router();

/* GET programming languages. */
router.get("/", (req: Request, res: Response) => {
  res.send("router-get...");
});

/* POST programming language */
// router.post("/", programmingLanguagesController.create);

// /* PUT programming language */
// router.put("/:id", programmingLanguagesController.update);

// /* DELETE programming language */
// router.delete("/:id", programmingLanguagesController.remove);

export default router;
