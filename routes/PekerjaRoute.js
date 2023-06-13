import express from "express";
import {
    getPekerja,
    getPekerjaById,
    savePekerja,
    updatePekerja,
    deletePekerja
} from "../controllers/PekerjaController.js";

const router = express.Router();

router.get('/pekerja', getPekerja);
router.get('/pekerja/:id', getPekerjaById);
router.post('/pekerja', savePekerja);
router.patch('/pekerja/:id', updatePekerja);
router.delete('/pekerja/:id', deletePekerja);

export default router;
