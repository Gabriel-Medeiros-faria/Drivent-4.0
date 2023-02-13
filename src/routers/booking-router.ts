import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createBooking, getBookings } from "@/controllers/booking-controller";


const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", createBooking) 
  .put("/:bookingId", createBooking)   
export { bookingRouter };
