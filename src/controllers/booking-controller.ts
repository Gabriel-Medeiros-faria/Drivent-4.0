import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';
import httpStatus from 'http-status';
import { bookingService } from '@/services/boonking-service';

export async function getBookings(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const bookings = await bookingService.getBookings(userId);
    res.send(bookings).status(200);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const userId = req.userId;

  try {
    await hotelService.getHotels(userId)
    const bookings = await bookingService.createBooking(roomId, userId);
    res.send({BookingId: bookings.id}).status(200);
  } catch (err) {
    if (err.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      if (err.name === 'FORBIDDEN') {
        return res.sendStatus(httpStatus.FORBIDDEN);
      }
  }
}

export async function updatedBooking(req: AuthenticatedRequest, res: Response){
    const {BookingId} = req.params
    const {roomId} = req.body

    try{
        const booking = await bookingService.updatedBooking(Number(BookingId), roomId)
        res.send({bookingId: booking.id}).status(200)
    }catch(err){
        console.log(err)
    }
}
