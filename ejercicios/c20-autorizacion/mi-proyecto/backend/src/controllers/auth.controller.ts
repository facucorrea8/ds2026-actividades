import { Request, Response, NextFunction } from "express";
import { registroSchema, loginSchema } from "../validations/auth.validation";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async registrar(req: Request, res: Response, next: NextFunction) {
    try {
      const datosValidados = registroSchema.parse(req.body);

      const nuevoUsuario = await AuthService.registrar(datosValidados);

      return res.status(201).json(nuevoUsuario);
    } catch (error: any) {
      if (error.message === "EL_EMAIL_YA_EXISTE") {
        return res.status(409).json({ error: "El email ya está registrado" });
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const datosValidados = loginSchema.parse(req.body);

      const resultado = await AuthService.login(datosValidados);

      return res.json(resultado);
    } catch (error: any) {
      if (error.message === "CREDANCIALES_INVALIDAS") {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      next(error);
    }
  }

  static async me(req: Request, res: Response) {
    return res.json({ usuario: req.usuario });
  }
}