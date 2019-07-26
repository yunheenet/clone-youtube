import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  deleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.delete(routes.addComment, deleteComment);

export default apiRouter;
