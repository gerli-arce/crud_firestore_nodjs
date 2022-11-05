import firebase from "../db.js";
import Cotizacion_reglas from "../models/Cotizacion_reglas.js";
const firestore = firebase.firestore();

export const addCotizacion_reglas = async (req, res, next) => {
  try {
    const data = req.body;
    if (
      data.campo == undefined ||
      data.nuevo_registro == undefined ||
      data.nuevo_num_cot == undefined ||
      data.auditoria == undefined ||
      data.estado == undefined
    ) {
      throw new Error("datos incompletos");
    }
    await firestore.collection("Cotizacion_reglas").doc().set(data);
    res.status(200).json({
      message: "Reguistro agregado",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllCotizacion_reglas = async (req, res, next) => {
  try {
    const cotizaciones = await firestore.collection("Cotizacion_reglas");
    const data = await cotizaciones.get();
    const cotizacionArray = [];
    if (data.empty) {
      res.status(400).json({
        message: "NO EXISTEN REGUISTROS",
      });
    } else {
      data.forEach((cot) => {
        const cotizacion = new Cotizacion_reglas(
          cot.id,
          cot.data().campo,
          cot.data().nuevo_registro,
          cot.data().nuevo_num_cot,
          cot.data().auditoria,
          cot.data().estado
        );
        cotizacionArray.push(cotizacion);
      });
      res.status(200).json({
        message: "Operacion Correcta",
        data: cotizacionArray,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getCotizacion_regla = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id == undefined) {
      throw new Error("ID debe ser enviado");
    }
    const cotizacion = await firestore.collection("Cotizacion_reglas").doc(id);
    const data = await cotizacion.get();
    if (!data.exists) {
      throw new Error("El reguistro no existe");
    } else {
      res.status(200).json({
        message: "Operacion Correcta",
        data: data.data(),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateCotizacion_regla = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (
      id == undefined ||
      data.campo == undefined ||
      data.nuevo_registro == undefined ||
      data.nuevo_num_cot == undefined ||
      data.estado == undefined
    ) {
      throw new Error("datos incompletos");
    }
    const cotizacionValidation = await firestore.collection("Cotizacion_reglas").doc(id);
    const datavalidation = await cotizacionValidation.get();
    if (!datavalidation.exists) {
      throw new Error("El reguistro no existe");
    }else{
        const cotizacion = await firestore.collection("Cotizacion_reglas").doc(id);
        await cotizacion.update(data);
        res.status(200).json({
          message: "Operacion Correcta",
          data: data,
        });
    }

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCotizacion_regla = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cotizacionValidation = await firestore.collection("Cotizacion_reglas").doc(id);
    const datavalidation = await cotizacionValidation.get();
    if (!datavalidation.exists) {
      throw new Error("El reguistro no existe");
    } else {
      await firestore.collection("Cotizacion_reglas").doc(id).delete();
      res.status(200).json({
        message: "Operacion Correcta",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
