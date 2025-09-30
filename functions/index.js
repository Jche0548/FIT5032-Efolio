/* eslint-env node */
// const admin = require('firebase-admin');
const admin = require('firebase-admin');
admin.initializeApp();

const functions = require('firebase-functions');

const db = admin.firestore();

const cors = require('cors')({ origin: true });

exports.countBooks = functions.https.onRequest(async (req, res) => {

  cors(req, res, async () => {

    try {

      const booksCollectionRef = db.collection('books');

      const snapshot = await booksCollectionRef.get();
      
      const bookCount = snapshot.size;

      functions.logger.info(`Successfully counted books: ${bookCount}`, { structuredData: true });
      res.status(200).json({ 
        status: 'success',
        message: 'Book count retrieved successfully.',
        count: bookCount
      });

    } catch (error) {
      functions.logger.error('Error counting books from Firestore:', error);

      res.status(500).json({ 
        status: 'error', 
        message: 'Failed to count books due to a server error.', 
        details: error.message 
      });
    }
  });
});