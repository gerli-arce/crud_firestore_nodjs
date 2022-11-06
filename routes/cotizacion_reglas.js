import express from "express";
import {
  addCotizacion_reglas,
  getAllCotizacion_reglas,
  getCotizacion_regla,
  updateCotizacion_regla,
  deleteCotizacion_regla
} from "../controllers/cotizacion_reglasController.js";

const router = express.Router();

router.post("/cotizacionreglas", addCotizacion_reglas);
router.get("/cotizacionreglas", getAllCotizacion_reglas);
router.get("/cotizacionregla/:id", getCotizacion_regla);
router.put("/cotizacionreglas", updateCotizacion_regla);
router.delete("/cotizacionregla/:id", deleteCotizacion_regla)
export default router;
