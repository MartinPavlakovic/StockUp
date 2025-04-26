const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require('firebase-admin');

var serviceAccount = require('./stockup-48c4b-firebase-adminsdk-fbsvc-3f04c6e1e2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const usersCollectionRef = db.collection('users');
console.log(usersCollectionRef);

app.get('/users', (request, response) => {
  let res = [];
  if (typeof request.query.id === 'undefined') {
    db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          res.push(document);
        });
        return response.send(res);
      })
      .catch(function (error) {
        return response.send('Error getting docs: ' + error);
      });
  } else {
    var docRef = db.collection('users').doc(request.query.id);
    docRef
      .get()
      .then(doc => {
        if (typeof doc.data() !== 'undefined') {
          console.log('doc', doc.data());
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          return response.send(document);
        } else {
          return response.send(
            'Error getting document ' +
              request.query.id +
              ': The document is undefined'
          );
        }
      })
      .catch(function (error) {
        return response.send(
          'Error getting document ' + request.query.id + ': ' + error
        );
      });
  }
});

app.get('/companies', (request, response) => {
  let res = [];
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('companies').orderBy('name');
    cRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          res.push(document);
        });
        return response.send(res);
      })
      .catch(function (error) {
        return response.send('Error getting documents: ' + error);
      });
  } else {
    var docRef = db.collection('companies').doc(request.query.id);
    docRef
      .get()
      .then(doc => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          return response.send(document);
        } else {
          return response.send(
            'Error getting document ' +
              request.query.id +
              ': The document is undefined'
          );
        }
      })
      .catch(function (error) {
        return response.send(
          'Error getting document ' + request.query.id + ': ' + error
        );
      });
  }
});

app.get('/products', (request, response) => {
  let res = [];
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('products').where('name', '==', 'Mlijeko');
    cRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          res.push(document);
        });
        return response.send(res);
      })
      .catch(function (error) {
        return response.send('Error getting documents: ' + error);
      });
  } else {
    var docRef = db.collection('products').doc(request.query.id);
    docRef
      .get()
      .then(doc => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data(),
          };
          return response.send(document);
        } else {
          return response.send(
            'Error getting document ' +
              request.query.id +
              ': The document is undefined'
          );
        }
      })
      .catch(function (error) {
        return response.send(
          'Error getting document ' + request.query.id + ': ' + error
        );
      });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.post('/users', (request, response) => {
  if (Object.keys(request.body).length) {
    db.collection('users')
      .doc()
      .set(request.body)
      .then(function () {
        return response.send('Document successfully written - created!');
      })
      .catch(function (error) {
        return response.send('Error writing document: ' + error);
      });
  } else {
    return response.send(
      'No post data for new document. ' + 'A new document is not created!'
    );
  }
});

app.put('/update-users', (request, response) => {
  if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
      db.collection('users')
        .doc(request.query.id)
        .update(request.body)
        .then(function () {
          return response.send('Document successfully written - ' + 'updated!');
        })
        .catch(function (error) {
          return response.send('Error writing document: ' + error);
        });
    } else {
      return response.send(
        'A parameter id is not set. ' + 'A document is not updated!'
      );
    }
  } else {
    return response.send(
      'No post data for new document. ' + 'A document is not updated!'
    );
  }
});

app.delete('/users', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('users')
      .doc(request.query.id)
      .delete()
      .then(function () {
        return response.send('Document successfully deleted!');
      })
      .catch(function (error) {
        return response.send('Error removing document: ' + error);
      });
  } else {
    return response.send(
      'A parameter id is not set. ' + 'A document is not deleted!'
    );
  }
});
