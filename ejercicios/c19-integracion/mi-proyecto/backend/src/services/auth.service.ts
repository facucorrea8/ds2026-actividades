import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import { RegistroInput, LoginInput } from "../validations/auth.validation";

export class AuthService {
  static async registrar(datos: RegistroInput) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: datos.email },
    });

    if (usuarioExistente) {
      throw new Error("EL_EMAIL_YA_EXISTE");
    }

    const passwordHash = await bcrypt.hash(datos.password, SALT_ROUNDS);

    const usuario = await prisma.usuario.create({
      data: {
        nombre: datos.nombre,
        email: datos.email,
        passwordHash,
        rol: "CLIENTE",
      },
    });

    return usuario;
  }

  static async login(datos: LoginInput) {
    const usuario = await prisma.usuario.findUnique({
      where: { email: datos.email },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        passwordHash: true,
      },
    });

    if (!usuario) {
      throw new Error("CREDANCIALES_INVALIDAS");
    }

    const passwordValida = await bcrypt.compare(datos.password, usuario.passwordHash);

    if (!passwordValida) {
      throw new Error("CREDANCIALES_INVALIDAS");
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { passwordHash, ...usuarioSinHash } = usuario;

    return {
      token,
      usuario: usuarioSinHash,
    };
  }
}