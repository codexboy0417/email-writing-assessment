import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';
import { evaluateEmail } from '../services/evaluator.js';
import { calculateScores, sanitizeFeedback } from '../services/scoring.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Controller to handle email submission, evaluation, and persistence.
 * Endpoint: POST /api/submissions
 */
export async function submitEmail(req, res, next) {
  try {
    const { sessionId, scenarioId, to, subject, body } = req.body || {};

    // 1. Validation
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'sessionId is required and must be a valid string.'
        }
      });
    }

    if (sessionId.length > 100) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'sessionId exceeds maximum allowed length of 100 characters.'
        }
      });
    }

    if (!scenarioId || typeof scenarioId !== 'string' || !ObjectId.isValid(scenarioId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'A valid scenarioId is required.'
        }
      });
    }

    if (!to || typeof to !== 'string' || !EMAIL_REGEX.test(to.trim())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'A valid recipient email address (To) is required.'
        }
      });
    }

    const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
    if (!cleanSubject) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Subject is required.'
        }
      });
    }

    if (cleanSubject.length > 200) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Subject cannot exceed 200 characters.'
        }
      });
    }

    const cleanBody = typeof body === 'string' ? body.trim() : '';
    if (!cleanBody) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Body is required.'
        }
      });
    }

    if (cleanBody.length > 10000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Body cannot exceed 10000 characters.'
        }
      });
    }

    const db = getDB();

    // 2. Find scenario
    const scenarioDoc = await db.collection('scenarios').findOne({ _id: new ObjectId(scenarioId) });
    if (!scenarioDoc) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'SCENARIO_NOT_FOUND',
          message: `Scenario with id ${scenarioId} does not exist.`
        }
      });
    }

    // 3. Evaluate email with AI
    const rawEvaluation = await evaluateEmail({
      scenario: scenarioDoc.scenario,
      context: scenarioDoc.context,
      category: scenarioDoc.category,
      to: to.trim(),
      subject: cleanSubject,
      body: cleanBody
    });

    // 4. Calculate deterministic scores & sanitize feedback on backend
    const { scores, totalScore } = calculateScores(rawEvaluation.scores);
    const feedback = sanitizeFeedback(rawEvaluation);

    // 5. Persist submission
    const submittedAt = new Date();
    const submissionDoc = {
      sessionId: sessionId.trim(),
      scenarioId: scenarioDoc._id,
      scenarioSnapshot: {
        scenario: scenarioDoc.scenario,
        context: scenarioDoc.context,
        category: scenarioDoc.category
      },
      to: to.trim(),
      subject: cleanSubject,
      body: cleanBody,
      scores,
      totalScore,
      feedback,
      submittedAt
    };

    const insertResult = await db.collection('submissions').insertOne(submissionDoc);
    const attemptId = insertResult.insertedId.toString();

    // 6. Calculate total points for session from submissions collection (single source of truth)
    const totalPointsAgg = await db.collection('submissions').aggregate([
      { $match: { sessionId: sessionId.trim() } },
      { $group: { _id: null, totalPoints: { $sum: '$totalScore' } } }
    ]).toArray();

    const totalPoints = totalPointsAgg.length > 0 ? totalPointsAgg[0].totalPoints : totalScore;

    // 7. Return structured result
    return res.status(201).json({
      success: true,
      data: {
        attemptId,
        scores,
        totalScore,
        feedback,
        pointsAdded: totalScore,
        totalPoints,
        submittedAt: submittedAt.toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
}
