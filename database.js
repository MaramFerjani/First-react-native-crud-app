import { Platform } from 'react-native';
import localforage from 'localforage';

let SQLite;
if (Platform.OS !== 'web') {
  SQLite = require('expo-sqlite');
}

const openDatabase = Platform.select({
  web: () => {
    return {
      transaction: (callback) => {
        callback({
          executeSql: async (sql, params, successCallback, errorCallback) => {
            try {
              if (sql.startsWith('CREATE TABLE')) {
                console.log('Table created');
                successCallback();
              } else if (sql.startsWith('INSERT INTO')) {
                const tableName = sql.match(/INSERT INTO (\w+)/)[1];
                let existingData = (await localforage.getItem(tableName)) || [];
                if (!Array.isArray(existingData)) existingData = [];

                const newData = { 
                  id: existingData.length + 1, 
                  title: params[0], 
                  description: params[1], 
                  image: params[2] 
                };

                existingData.push(newData);
                await localforage.setItem(tableName, existingData);
                console.log('Data inserted', newData);
                successCallback(null, { rowsAffected: 1 });
              } else if (sql.startsWith('SELECT')) {
                const tableName = sql.match(/FROM (\w+)/)[1];
                const data = (await localforage.getItem(tableName)) || [];
                console.log('Data fetched:', data);

                const formattedData = Array.isArray(data) ? data : [data];

                successCallback(null, { 
                  rows: { 
                    length: formattedData.length, 
                    item: (i) => formattedData[i] 
                  } 
                });
              } else if (sql.startsWith('DELETE')) {
                const tableName = sql.match(/FROM (\w+)/)[1];
                const id = params[0];
                let existingData = (await localforage.getItem(tableName)) || [];

                existingData = existingData.filter(item => item.id !== id);

                await localforage.setItem(tableName, existingData);
                console.log('Data deleted:', existingData);
                successCallback(null, { rowsAffected: 1 });
              } else if (sql.startsWith('UPDATE')) {
                const tableName = sql.match(/UPDATE (\w+)/)[1];
                const id = params[3];
                let existingData = (await localforage.getItem(tableName)) || [];

                existingData = existingData.map(item => 
                  item.id === id ? { id, title: params[0], description: params[1], image: params[2] } : item
                );

                await localforage.setItem(tableName, existingData);
                console.log('Data updated');
                successCallback(null, { rowsAffected: 1 });
              } else {
                throw new Error('Unknown SQL command');
              }
            } catch (error) {
              console.error('SQL Error:', error);
              errorCallback(null, error);
            }
          },
        });
      },
    };
  },
  default: () => SQLite.openDatabase('BooksDB.db'),
})();

export const createTable = () => {
  openDatabase.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        image TEXT
      )`,
      [],
      () => { console.log('Table created successfully'); },
      (tx, error) => { console.log('Error creating table: ' + error.message); }
    );
  });
};

export const getBooks = (callback) => {
  openDatabase.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Books',
      [],
      (tx, results) => {
        let books = [];
        for (let i = 0; i < results.rows.length; i++) {
          books.push(results.rows.item(i));
        }
        console.log("Books fetched:", books);
        callback(books);
      },
      (tx, error) => { 
        console.log('Error getting books: ' + error.message); 
        callback([]); 
      }
    );
  });
};

export const addBook = (title, description, image, callback) => {
  openDatabase.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Books (title, description, image) VALUES (?, ?, ?)',
      [title, description, image],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          const insertedId = results.insertId;
          callback(true, insertedId);
        } else {
          callback(false, null);
        }
      },
      (tx, error) => { console.log('Error adding book: ' + error.message); }
    );
  });
};

export const deleteBook = (id, callback) => {
  openDatabase.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Books WHERE id = ?',
      [id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (tx, error) => { console.log('Error deleting book: ' + error.message); }
    );
  });
};

export const updateBook = (id, title, description, image, callback) => {
  openDatabase.transaction(tx => {
    tx.executeSql(
      'UPDATE Books SET title = ?, description = ?, image = ? WHERE id = ?',
      [title, description, image, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (tx, error) => { console.log('Error updating book: ' + error.message); }
    );
  });
};
