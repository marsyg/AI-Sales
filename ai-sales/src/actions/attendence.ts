'use server';

import prisma from '@/lib/prisma';
import { AttendanceData } from '@/lib/type';
import { Attendance, AttendedTypeEnum, CtaTypeEnum } from '@prisma/client';

export const getWebinarAttendance = async (
  webinarId: string,
  options: {
    includeUsers?: boolean;
    userLimit?: number;
  } = { includeUsers: true, userLimit: 100 }
) => {
  try {
    const webinar = await prisma.webinar.findUnique({
      where: { id: webinarId },
      select: {
        id: true,
        ctaType: true,
        tags: true,
        _count: {
          select: {
            attendances: true,
          },
        },
      },
    });
    const attendanceCounts = await prisma.attendance.groupBy({
      by: ['attendedType'],
      where: { webinarId },
      _count: {
        attendedType: true,
      },
    });
    const results: Record<AttendedTypeEnum, AttendanceData> = {} as Record<
      AttendedTypeEnum,
      AttendanceData
    >;

    for (const type of Object.values(AttendedTypeEnum)) {
      if (
        type === AttendedTypeEnum.ADDED_TO_CART &&
        webinar?.ctaType === CtaTypeEnum.BOOK_A_CALL
      )
        continue;

      if (
        type === AttendedTypeEnum.BREAKOUT_ROOM &&
        webinar?.ctaType === CtaTypeEnum.BOOK_A_CALL
      )
        continue;
      const countItem = attendanceCounts.find((item) => {
        if (
          webinar?.ctaType === CtaTypeEnum.BOOK_A_CALL &&
          type === AttendedTypeEnum.BREAKOUT_ROOM &&
          item.attendedType === AttendedTypeEnum.ADDED_TO_CART
        ) {
          return true;
        }
        return item.attendedType === type;
      });
      results[type] = {
        count: countItem?._count.attendedType || 0,
        users: [],
      };
    }

    if (options.includeUsers) {
      for (const type of Object.values(AttendedTypeEnum)) {
        if (
          type === AttendedTypeEnum.ADDED_TO_CART &&
          webinar?.ctaType === CtaTypeEnum.BOOK_A_CALL
        )
          continue;
        if (
          type === AttendedTypeEnum.BREAKOUT_ROOM &&
          webinar?.ctaType !== CtaTypeEnum.BOOK_A_CALL
        )
          continue;
        const queryType =
          webinar?.ctaType === CtaTypeEnum.BOOK_A_CALL &&
          type === AttendedTypeEnum.BREAKOUT_ROOM
            ? AttendedTypeEnum.ADDED_TO_CART
            : type;
        if (results[type]?.count) {
          const attendances = await prisma.attendance.findMany({
            where: {
              webinarId,
              attendedType: queryType,
            },
            include: {
              user: true,
            },
            take: options.userLimit,
            orderBy: {
              joinedAt: 'desc',
            },
          });

          results[type].users = attendances.map((attendance) => ({
            id: attendance.user.id,
            name: attendance.user.name,
            email: attendance.user.email,
            attendedAt: attendance.joinedAt,
            stripeConnectId: null,
            callStatus: attendance.user.callStatus,
          }));
        }
      }
    }
    return {
      success: true,
      data: results,
      ctaType: webinar?.ctaType,
      webinarTag: webinar?.tags || [],
    };
  } catch (error) {
    console.error('unable to get Attendance ', error);
  }
};
