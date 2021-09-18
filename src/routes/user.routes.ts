import { ensureAuthenticated } from "@middleware/ensureAuthenticated";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { GetUserController } from "@modules/account/useCases/getUser/GetUserController";
import { GetUsersController } from "@modules/account/useCases/getUsers/GetUsersController";
import { CreateMovementController } from "@modules/movement/useCases/createMovement/CreateMovementController";
import { DeleteMovementController } from "@modules/movement/useCases/deleteMovement/DeleteMovementController";
import { EditMovementController } from "@modules/movement/useCases/editMovement/EditMovementController";
import { GetMovementsController } from "@modules/movement/useCases/getMovements/GetMovementsController";
import { Router } from "express";

const userRoutes = Router();
const createUserController = new CreateUserController();
const getUsersController = new GetUsersController();
const getUserController = new GetUserController();
const createMovementController = new CreateMovementController();
const editMovementController = new EditMovementController();
const getMovementsController = new GetMovementsController();
const deleteMovementController = new DeleteMovementController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", ensureAuthenticated, getUsersController.handle);
userRoutes.get("/:id", ensureAuthenticated, getUserController.handle);
userRoutes.post(
  "/:id/movements",
  ensureAuthenticated,
  createMovementController.handle
);
userRoutes.get(
  "/:id/movements",
  ensureAuthenticated,
  getMovementsController.handle
);
userRoutes.put(
  "/:id/movements/:mid",
  ensureAuthenticated,
  editMovementController.handle
);
userRoutes.delete(
  "/:id/movements/:mid",
  ensureAuthenticated,
  deleteMovementController.handle
);

export { userRoutes };
