import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='mates'",
      [],
      (tx, res) => {
        console.log('exist mates item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS mates', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS mates (id INTEGER PRIMARY KEY AUTOINCREMENT, semenId INTEGER, ' +
              'semenName TEXT, technician TEXT NOT NULL, heateDate TEXT NOT NULL)',
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
export const newMates = async inputValue => {
  const {semenName, heateDate, technician} = inputValue;
  const NewMatesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO mates (semenName,heateDate,technician) values (?,?,?)',
          [semenName, heateDate, technician],
          (txObj, resultSet) => {
            resolve({
              id: resultSet.insertId,
              semenName,
              heateDate,
              technician,
            });
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await NewMatesAction().then(result => {
    return result;
  });
};

export const updateMates = (name, id, setmatesesData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE mates SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setmatesesData(state => [
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

export const deleteMates = async id => {
  const deleteMatesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM mates WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({action: true});
            }
          },
          (txObj, error) => reject('Error deleteMates', error),
        );
      });
    });

  return await deleteMatesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteMates Error', error);
    },
  );
};

export const getMatesById = async id => {
  //console.log("🚀 ~ file: matesQuery.js:75 ~ getmatesByCattleId ~ id", id);
  const getMatesByIdAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM mates where id = ?',
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

  return await getMatesByIdAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};
