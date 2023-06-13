import express from "express";
import {
getLokers,
getLokerById,
saveLoker,
updateLoker,
deleteLoker
} from "../controllers/LokerController.js";

const router = express.Router();

router.get('/lokers', getLokers);
router.get('/lokers/:id', getLokerById);
router.post('/lokers', saveLoker);
router.patch('/lokers/:id', updateLoker);
router.delete('/lokers/:id', deleteLoker);

export default router;