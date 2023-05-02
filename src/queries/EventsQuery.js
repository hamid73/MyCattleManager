import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='events'",
      [],
      (tx, res) => {
        console.log('exist events item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS events', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,' +
              ' type TEXT NOT NULL, relationId INTEGER,note TEXT,createdAt TEXT,cattleId INTEGER, ' +
              'FOREIGN KEY (cattleId) REFERENCES cattles (id))',
            [],
          );
        }
        // tx.executeSql(
        //   "ALTER TABLE cattles ADD COLUMN archive BOLEAN DEFAULT false"
        // );
        //tx.executeSql("DROP TABLE cattles");
      },
      error => {
        console.log(error);
      },
    );
  });

  return db;
};
const db = openDB();
export const newEvent = async inputValue => {
  const {type, relationId, note, createdAt, cattleId, plaque, name} =
    inputValue;
  const newEventAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO events (type,relationId,note,createdAt,cattleId,name) values (?,?,?,?,?,?)',
          [type, relationId, note, createdAt, cattleId, name],
          (txObj, resultSet) => {
            resolve({
              id: resultSet.insertId,
              type,
              relationId,
              note,
              createdAt,
              cattleId,
              plaque,
              name,
            });
          },

          (txObj, error) => console.log('Error', error),
        );
      });
    });

  return await newEventAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newEvent Error', error);
    },
  );
};

export const updateEvent = (id, inputValue, setEventsData, toast) => {
  const {note, createdAt} = inputValue;
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE events SET note = ?, createdAt = ? WHERE id = ?',
      [note, createdAt, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setEventsData(state => [
            ...state,
            state.map(row =>
              row.id === id ? (row = {...row, note, createdAt}) : row,
            ),
          ]);
          toast.show('تغییرات اعمال شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const deleteEvent = async id => {
  const deleteEventAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM events WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({action: true});
            }
          },
          (txObj, error) => reject('Error deleteEvent', error),
        );
      });
    });

  return await deleteEventAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteEvent Error', error);
    },
  );
};

export const deleteEventByArchive = async cattleId => {
  const newEventAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM events WHERE cattleId = ? AND type IN ('otherArchive','sold','dead','lost')",
          [cattleId],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve(true);
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });

  return await newEventAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newEvent Error', error);
    },
  );
};

export const getEvents = async () => {
  const getEventsAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT events.*,cattles.plaque,cattles.sex FROM events' +
            ' INNER Join cattles ON cattles.id = events.cattleId where ' +
            "events.type NOT IN ('otherArchive','sold','dead','lost') ORDER BY createdAt DESC",
          null, // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getEventsAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getEvents Error', error);
    },
  );
};

export const getEventsByCattleId = async cattleId => {
  const getEventsAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT events.*,cattles.plaque,cattles.sex FROM events' +
            ' INNER Join cattles ON cattles.id = events.cattleId where cattleId = ? AND ' +
            "events.type NOT IN ('otherArchive','sold','dead','lost') ORDER BY createdAt DESC",
          [cattleId], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            console.log(
              '🚀 ~ file: EventsQuery.js:195 ~ getEventsByCattleId ~ temp',
              temp,
            );
            resolve(temp);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getEventsAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getEvents Error', error);
    },
  );
};

export const getEventsByArchive = async cattleId => {
  const getEventsByArchiveAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT events.*,cattles.plaque,cattles.sex FROM events' +
            ' INNER Join cattles ON cattles.id = events.cattleId where cattleId = ?' +
            " AND type IN ('otherArchive','sold','dead','lost') ORDER BY createdAt DESC",
          [cattleId], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getEventsByArchiveAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getEvents Error', error);
    },
  );
};
