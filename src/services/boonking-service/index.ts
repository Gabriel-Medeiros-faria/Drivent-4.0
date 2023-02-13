import { notFoundError } from '@/errors';
import { bookingRepository } from '@/repositories/booking-repository';
import { FORBIDDEN } from 'http-status';

async function getBookings(userId: number) {
  try {
    const booking = await bookingRepository.getBookings(userId);
    if (!booking) {
      throw notFoundError();
    }
    return booking;
  } catch (err) {
    console.log(err);
  }
}

async function createBooking(roomId: number, userId: number) {
  try {
    const booking = await bookingRepository.createBooking(roomId, userId);
    const room = await bookingRepository.verifyRoom(roomId);
    if (!room) {
      throw notFoundError();
    }
    if(room.capacity === 0){
        throw FORBIDDEN
    }
    return booking;
  } catch (err) {
    console.log(err);
  }
}

async function updatedBooking(bookingId: number, roomId: number){
    try{
        const booking = await bookingRepository.updatedBooking(bookingId, roomId)
        const room = await bookingRepository.verifyRoom(roomId);
        if (!room) {
            throw notFoundError();
        }
        if(room.capacity === 0){
            throw FORBIDDEN
        }

        return booking
    }catch(err){
        console.log(err)
    }
}

export const bookingService = {
  getBookings,
  createBooking,
  updatedBooking
};
