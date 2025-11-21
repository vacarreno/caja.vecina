import * as service from "../services/adminService.js";
import { adminLoginSchema } from "../validators/adminValidator.js";

export async function login(req, res, next) {
  try {
    const { error } = adminLoginSchema.validate(req.body);
    if (error) throw error;

    const data = await service.loginAdmin(req.body);
    res.json(data);

  } catch (e) {
    next(e);
  }
}
