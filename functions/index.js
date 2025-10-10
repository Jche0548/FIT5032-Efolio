/* eslint-env node */
const admin = require('firebase-admin');
admin.initializeApp();

const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const logger = require('firebase-functions/logger');
const cors = require('cors')({ origin: true });

const db = admin.firestore();

setGlobalOptions({
  region: 'australia-southeast1',
  maxInstances: 10,
});

function toUpperAllStringFields(obj = {}) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === 'string' ? v.toUpperCase() : v;
  }
  return out;
}

exports.capitalizeBookOnCreate = onDocumentCreated('books/{bookId}', async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data() || {};
  if (data.normalized === true) return; 

  const upper = toUpperAllStringFields(data);
  upper.normalized = true;
  upper.normalizedAt = admin.firestore.FieldValue.serverTimestamp();

  try {
    await snap.ref.update(upper);
    logger.info(`Normalized book ${event.params.bookId}`);
  } catch (err) {
    logger.error('Failed to normalize book', err);
  }
});

exports.countBooks = onRequest({ invoker: 'public' }, async (req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('books').get();
      const bookCount = snapshot.size;

      logger.info(`Successfully counted books: ${bookCount}`);
      res.status(200).json({
        status: 'success',
        message: 'Book count retrieved successfully.',
        count: bookCount,
      });
    } catch (error) {
      logger.error('Error counting books from Firestore:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to count books due to a server error.',
        details: error.message,
      });
    }
  });
});
