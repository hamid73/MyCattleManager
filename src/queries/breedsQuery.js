import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='breeds'",
      [],
      (tx, res) => {
        console.log('exist breeds item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS breeds', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS breeds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
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
export const newBreed = async name => {
  const NewBreedAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO breeds (name) values (?)',
          [name],
          (txObj, resultSet) => {
            resolve({id: resultSet.insertId, name: name});
          },

          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await NewBreedAction().then(result => {
    return result;
  });
};

export const updateBreed = (name, id, setBreedsData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE breeds SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setBreedsData(state => [
            ...state,
            state.map(row => (row.id === id ? (row = {...row, name}) : row)),
          ]);
          toast.show('تغییرات اعمال شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const deleteBreed = (id, setBreedsData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM breeds WHERE id = ? ',
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setBreedsData(state => [
            ...state,
            state.filter(item => item.id !== id),
          ]);
          toast.show('نژاد انتخاب شده حذف شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const getBreeds = async () => {
  const getBreedsAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM breeds',
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

  return await getBreedsAction().then(result => {
    return result;
  });
};
