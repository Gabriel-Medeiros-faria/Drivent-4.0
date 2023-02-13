import { prisma } from '@/config';

async function getBookings(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function verifyRoom(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

export function updatedBooking(bookingId: number, roomId: number){
    return prisma.booking.update({
        where:{
            id: bookingId,
        },
        data:{
            roomId
        }
    })
}

export const bookingRepository = {
  getBookings,
  createBooking,
  verifyRoom,
  updatedBooking
};
