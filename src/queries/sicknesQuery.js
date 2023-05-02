import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='sicknes'",
      [],
      (tx, res) => {
        console.log('exist sicknes item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS sicknes', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sicknes (id INTEGER PRIMARY KEY AUTOINCREMENT, symptoms TEXT NOT NULL, ' +
              'diagnosis TEXT NOT NULL, technician TEXT NOT NULL)',
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
export const newSicknes = async inputValue => {
  const {symptoms, diagnosis, technician} = inputValue;

  const NewSicknesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO sicknes (symptoms,diagnosis,technician) values (?,?,?)',
          [symptoms, diagnosis, technician],
          (txObj, resultSet) => {
            resolve({
              id: resultSet.insertId,
              symptoms,
              diagnosis,
              technician,
            });
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await NewSicknesAction().then(result => {
    return result;
  });
};

export const updateSicknes = (name, id, setSicknesesData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE sicknes SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setSicknesesData(state => [
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

export const deleteSicknes = async id => {
  const deleteSicknesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM sicknes WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({action: true});
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });

  return await deleteSicknesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteSicknes Error', error);
    },
  );
};

export const getSicknesById = async id => {
  //console.log("🚀 ~ file: SicknesQuery.js:75 ~ getSicknesByCattleId ~ id", id);
  const getSicknesByIdAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM sicknes where id = ?',
          [id], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp[0]);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getSicknesByIdAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};
