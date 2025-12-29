import { Request, Response, NextFunction } from 'express';
import { Analytics } from '../models/Analytics.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;

    let query = Analytics.find();

    if (startDate) query = query.where('createdAt').gte(new Date(startDate as string));
    if (endDate) query = query.where('createdAt').lte(new Date(endDate as string));

    const data = await query.sort({ createdAt: -1 });

    // Aggregate data
    const pageViews = data.filter(d => d.eventType === 'pageview').length;
    const uniqueVisitors = new Set(data.map(d => d.visitorId)).size;
    const topPages = data
      .filter(d => d.eventType === 'pageview')
      .reduce((acc: any, curr) => {
        acc[curr.page!] = (acc[curr.page!] || 0) + 1;
        return acc;
      }, {});

    res.json({
      success: true,
      data: {
        pageViews,
        uniqueVisitors,
        topPages,
        rawData: data
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logPageView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, visitorId, userAgent, referrer } = req.body;

    await Analytics.create({
      eventType: 'pageview',
      page,
      visitorId,
      userAgent,
      referrer,
      ipAddress: req.ip
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const logEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventType, eventData, visitorId } = req.body;

    await Analytics.create({
      eventType,
      eventData,
      visitorId,
      ipAddress: req.ip
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
